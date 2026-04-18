import { visit } from 'unist-util-visit'
import remarkSmartypants from 'remark-smartypants'
import remarkReadingTime from './remark-reading-time'
import remarkLQIP from './remark-lqip'
import remarkGithubCard from './remark-github-card'

import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'

import type { RemarkPlugin, RehypePlugin } from '@astrojs/markdown-remark'
import { type CreateProperties } from 'rehype-external-links'

export const remarkPlugins = [
  remarkSmartypants,
  remarkReadingTime,
  remarkLQIP,
  remarkGithubCard,
] as RemarkPlugin[]

export const rehypePlugins = [
  rehypeSlug,
  rehypeUnwrapImages,
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'append',
      properties: (el: Parameters<CreateProperties>[0]) => {
        let text = ''
        visit(el, 'text', (textNode) => {
          text += textNode.value
        })
        return {
          'class': 'header-anchor',
          'aria-hidden': 'false',
          'aria-label': text ? `Link to ${text}` : undefined,
        }
      },
      content: (heading: any) => {
        const level = heading.tagName[1]
        return {
          type: 'text',
          value: 'h' + level,
        }
      },
    },
  ],
  [
    rehypeExternalLinks,
    {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
    },
  ],
] as RehypePlugin[]
