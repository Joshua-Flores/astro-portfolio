import { visit } from 'unist-util-visit'
import path from 'node:path'
import { existsSync, readdirSync } from 'node:fs'
import sharp from 'sharp'

function packColor11bit(c) {
  const r = Math.round((c.r / 0xff) * 0b1111)
  const g = Math.round((c.g / 0xff) * 0b1111)
  const b = Math.round((c.b / 0xff) * 0b111)
  return (r << 7) | (g << 3) | b
}

function packColor10bit(c) {
  const r = Math.round((c.r / 0xff) * 0b111)
  const g = Math.round((c.g / 0xff) * 0b1111)
  const b = Math.round((c.b / 0xff) * 0b111)
  return (r << 7) | (g << 3) | b
}

/**
 * Pure CSS-based LQIP implementation
 * Reference: https://frzi.medium.com/lqip-css-73dc6dda2529
 * Packs 3 colors into a single RGBA hex value, unpacked in CSS to generate a grid gradient
 */

/**
 * Extract 3 colors from specific positions in an image using Sharp
 */
async function extractColors(imagePath) {
  try {
    // Use sharp to resize image to 3x3 and get raw pixel data
    const { data, info } = await sharp(imagePath)
      .resize(3, 3, {
        fit: 'fill',
        kernel: 'lanczos3', // High quality scaling
      })
      .raw()
      .toBuffer({ resolveWithObject: true })

    const pixels = []

    // Extract RGB values from raw pixel data
    for (let a = 0; a < data.length; a += info.channels) {
      pixels.push({
        r: data[a],
        g: data[a + 1],
        b: data[a + 2],
      })
    }

    // Select 3 colors at specific positions: top-left(0), center(4), bottom-right(8)
    // 3x3 grid index layout:
    // 0 1 2
    // 3 4 5
    // 6 7 8
    const [c0, c1, c2] = [pixels[0], pixels[4], pixels[8]]

    return [c0, c1, c2]
  } catch (error) {
    console.warn(`Color extraction failed: ${imagePath}`, error.message)
    return null
  }
}

/**
 * Pack 3 colors into a single RGBA hex value
 * Using bit-packing methods from color.ts:
 * - Color 1: uses packColor11bit (R:4bit, G:4bit, B:3bit)
 * - Color 2: uses packColor11bit (R:4bit, G:4bit, B:3bit)
 * - Color 3: uses packColor10bit (R:3bit, G:4bit, B:3bit)
 * Total 32 bits = RGBA
 */
function packColorsToHex(colors) {
  const [c0, c1, c2] = colors

  // Use bit-packing functions from color.ts
  const pc0 = packColor11bit(c0) // 11 bits
  const pc1 = packColor11bit(c1) // 11 bits
  const pc2 = packColor10bit(c2) // 10 bits

  // Pack into 32 bits: 11 + 11 + 10 = 32 bits
  const combined = (BigInt(pc0) << 21n) | (BigInt(pc1) << 10n) | BigInt(pc2)

  // Convert to 8-char hex string
  const hex = '#' + combined.toString(16).padStart(8, '0')
  return hex
}

/**
 * Analyze image and generate LQIP hex value
 */
async function analyzeImageForLQIP(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata()
    const { width, height } = metadata

    // Check if image is opaque
    const stats = await sharp(imagePath).stats()
    if (!stats.isOpaque) {
      return null // Skip transparent images
    }

    // Extract 3 primary colors
    const colors = await extractColors(imagePath)
    if (!colors) {
      return null
    }

    // Pack colors into hex value
    const lqipHex = packColorsToHex(colors)

    return {
      width,
      height,
      lqipHex,
      colors, // For debugging
    }
  } catch (error) {
    console.warn(`LQIP analysis failed: ${imagePath}`, error.message)
    return null
  }
}

/**
 * Resolve image path
 */
function resolveImagePath(imageUrl, filePath) {
  if (path.isAbsolute(imageUrl)) {
    return imageUrl
  }

  // Handle Astro's ~ path alias
  if (imageUrl.startsWith('~/')) {
    const contentDir = path.dirname(filePath)
    const srcDir = path.dirname(path.dirname(contentDir))
    return path.resolve(srcDir, imageUrl.slice(2))
  }

  const fileDir = path.dirname(filePath || '')
  return path.resolve(fileDir, imageUrl)
}

/**
 * Process a single image node
 */
async function processImageNode(node, filePath) {
  const imagePath = resolveImagePath(node.url, filePath)

  if (!existsSync(imagePath)) {
    return
  }

  const lqipData = await analyzeImageForLQIP(imagePath)
  if (!lqipData) {
    return
  }

  // Add data attributes for CSS processing
  node.data = node.data || {}
  node.data.hProperties = node.data.hProperties || {}

  // Set dimension attributes
  if (lqipData.width && lqipData.height) {
    node.data.hProperties.width = lqipData.width
    node.data.hProperties.height = lqipData.height
  }

  // Set LQIP style variable
  const style = node.data.hProperties.style || ''
  const lqipStyle = `--lqip:${lqipData.lqipHex}`

  node.data.hProperties.style = style ? `${style};${lqipStyle}` : lqipStyle
}

/**
 * Remark plugin main function
 */
function remarkLQIP() {
  return async (tree, file) => {
    const imagesToProcess = []

    // Collect all image nodes
    visit(tree, 'image', (node) => {
      if (node.url && !node.url.match('^([a-z]+:)?//')) {
        imagesToProcess.push(node)
      }
    })

    // Process all images in parallel
    await Promise.all(
      imagesToProcess.map(async (node) => {
        try {
          await processImageNode(node, file.path)
        } catch (error) {
          console.warn(`LQIP processing failed: ${node.url}`, error.message)
        }
      })
    )
  }
}

export default remarkLQIP

// In build environment, we can get caller context via stack trace
function getCallerContext() {
  const stack = new Error().stack
  if (!stack) return null

  // Find file path containing /content/ (Windows and Linux compatible)
  const contentMatch = stack.match(/([^:\s]+[\/\\]content[\/\\][^:\s)]+)/i)
  if (contentMatch) {
    return contentMatch[1].replace(/\\/g, '/')
  }

  return null
}

export async function generateLQIPFromPath(src) {
  try {
    let imagePath

    if (typeof src === 'string') {
      imagePath = resolveImagePath(src, '')
    } else if (src && typeof src === 'object') {
      // Handle Astro ImageMetadata object

      // Try multiple ways to get the original file path
      if (src.fsPath) {
        imagePath = src.fsPath
      } else if (src.pathname) {
        imagePath = src.pathname
      } else if (src.src) {
        let cleanSrc = src.src

        // Remove Astro's special prefix and query params
        if (cleanSrc.includes('/@fs/')) {
          // Extract real file path: /@fs/D:/Code/dnzzk2.icu/src/content/...
          cleanSrc = cleanSrc.split('/@fs/')[1]
          if (cleanSrc) {
            // Remove query params and normalize path separators
            imagePath = cleanSrc.split('?')[0].replace(/\\/g, '/')
          }
        } else if (cleanSrc.startsWith('/_astro/')) {
          // For /_astro/ paths, this is an Astro-optimized path
          // Try to infer original path from caller context
          const callerContext = getCallerContext()

          if (callerContext) {
            // Search for possible image files in the caller's directory
            const contextDir = path.dirname(callerContext)
            const assetsDir = path.join(contextDir, 'assets')

            // Try to match file extension
            const srcFileName = path.basename(cleanSrc)
            const fileExtension = path.extname(srcFileName)

            if (existsSync(assetsDir)) {
              // Find files of the same type in assets directory
              const files = readdirSync(assetsDir)
              const matchingFile = files.find(
                (file) => path.extname(file) === fileExtension || file.includes(path.parse(srcFileName).name.split('.')[0])
              )

              if (matchingFile) {
                imagePath = path.join(assetsDir, matchingFile)
              }
            }
          }

          if (!imagePath) {
            console.log('Cannot infer original path, skipping LQIP generation:', cleanSrc)
            return null
          }
        } else {
          // Handle regular path
          imagePath = resolveImagePath(cleanSrc.split('?')[0], '')
        }
      } else {
        console.warn('ImageMetadata object missing usable path property:', Object.keys(src))
        return null
      }
    } else {
      console.warn('Invalid image source:', src)
      return null
    }

    if (!imagePath) {
      console.warn('Cannot resolve image path:', src)
      return null
    }

    // Check if file exists
    if (!existsSync(imagePath)) {
      console.warn(`Image file not found: ${imagePath}`)
      return null
    }

    // Analyze image and generate LQIP
    const result = await analyzeImageForLQIP(imagePath)
    return result ? result.lqipHex : null
  } catch (error) {
    console.warn('LQIP generation failed:', error.message)
    return null
  }
}
