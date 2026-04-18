import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'motion/react'
import { useStore } from '@nanostores/react'
import { themeStore } from '~/stores/theme'

const iconVariants = {
  visible: {
    rotate: 0,
    scale: 1,
    opacity: 1,
  },
  hidden: {
    scale: 0,
    opacity: 0,
    rotate: 180,
  },
}

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const theme = useStore(themeStore)
  const controlsSun = useAnimation()
  const controlsMoon = useAnimation()

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    themeStore.set(savedTheme === 'light' ? 'light' : 'dark')
  }, [])

  useEffect(() => {
    if (!mounted) return

    controlsSun.start(theme === 'light' ? 'visible' : 'hidden')
    controlsMoon.start(theme === 'dark' ? 'visible' : 'hidden')

    localStorage.setItem('theme', theme)
    applyTheme(theme)
  }, [theme, mounted, controlsSun, controlsMoon])

  const applyTheme = (newTheme: string) => {
    const root = document.documentElement

    root.classList.add('disable-transition')

    const isDark = newTheme === 'dark'
    root.classList.toggle('dark', isDark)

    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#09090b' : '#FFFFFF')
    }

    setTimeout(() => {
      root.classList.remove('disable-transition')
    }, 300)
  }

  const handleClick = () => {
    themeStore.set(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button onClick={handleClick} className="relative size-5 flex items-center justify-center cursor-pointer" aria-label="Toggle theme">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="relative size-5 flex items-center justify-center">
        <motion.div
          className="absolute inset-0"
          variants={iconVariants}
          initial="hidden"
          animate={controlsSun}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <span className="icon-[tabler--sun-filled] size-5"></span>
        </motion.div>
        <motion.div
          className="absolute inset-0"
          variants={iconVariants}
          initial="hidden"
          animate={controlsMoon}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <span className="icon-[tabler--moon-filled] size-5"></span>
        </motion.div>
      </motion.div>
    </button>
  )
}

export default ThemeToggle
