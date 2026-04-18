import type { ImageMetadata } from 'astro'

/**
 * Site basic information type
 * @description Contains site title and description
 * @property {string} title - Site title
 * @property {string} base - Site base path
 * @property {string} description - Site description
 * @property {string} author - Author name
 * @property {string} website - Website address
 * @property {string} ogImage - OGP image address
 * @property {boolean} transition - Whether to enable transition animation
 */
export type Site = {
  title: string
  base: string
  description: string
  lang: string
  author: string
  website: string
  ogImage: string
  transition: boolean
}

/**
 * Cover image layout type
 * @description Possible values: 'left' and 'right'
 */
export type CoverLayout = 'left' | 'right'

/**
 * PostCardType
 * @description Possible values: 'compact', 'image' and 'timeLine'
 */
export type PostCardType = 'compact' | 'image' | 'time-line' | 'minimal' | 'cover'

/**
 * Post card page configuration interface
 * @description Used to configure how post cards are displayed on pages
 * @property {PostCardType} type - Card display type
 * @property {number} size - Number of items per page
 * @property {CoverLayout} coverLayout - Cover image layout position
 */
export interface PostCardPageConfig {
  type: PostCardType
  size: number
  coverLayout?: CoverLayout
}

export type PostType = 'metaOnly' | 'coverSplit' | 'coverTop'

/**
 * Post configuration interface
 * @description Used to configure global settings for blog posts
 * @property {string} title - Post title
 * @property {string} description - Post description
 * @property {string} introduce - Post introduce
 * @property {string} author - Author name
 * @property {PostCardPageConfig} homePageConfig - Home page posts display configuration
 * @property {PostCardPageConfig} postPageConfig - Posts list page display configuration
 * @property {PostCardPageConfig} tagsPageConfig - Post display configuration for tags page
 * @property {boolean} ogImageUseCover - Whether to use the article cover image as the OGP image
 * @property {boolean} imageDarkenInDark - Whether to darken images in dark mode
 * @property {string} readMoreText - "Read more" button text
 * @property {string} prevPageText - Previous page button text
 * @property {string} nextPageText - Next page button text
 * @property {string} tocText - Table of contents text
 * @property {string} backToPostsText - Back to posts list button text
 * @property {string} nextPostText - Next post button text
 * @property {string} prevPostText - Previous post button text
 */
export interface PostConfig {
  title: string
  description: string
  introduce: string
  author: string
  homePageConfig: PostCardPageConfig
  postPageConfig: PostCardPageConfig
  tagsPageConfig: PostCardPageConfig
  postType: PostType
  ogImageUseCover: boolean
  imageDarkenInDark: boolean
  readMoreText: string
  prevPageText: string
  nextPageText: string
  tocText: string
  backToPostsText: string
  nextPostText: string
  prevPostText: string
  recommendText: string
  wordCountView: boolean
}

/**
 * Tags configuration interface
 * @property {string} title - Tags page title
 * @property {string} description - Tags page description
 * @property {string} introduce - Tags page introduce
 */
export interface TagsConfig {
  title: string
  description: string
  introduce: string
}

export interface Skill {
  icon: string
  name: string
  url?: string
}

export interface SkillData {
  direction: 'left' | 'right'
  skills: Skill[]
}

/**
 * SkillsShowcase configuration type
 * @property {boolean} SKILLS_ENABLED  - Whether to enable SkillsShowcase features
 * @property {Object} SKILLS_DATA - Skills showcase data
 * @property {string} SKILLS_DATA.direction - Skills showcase direction
 * @property {Object} SKILLS_DATA.skills - Skills showcase data
 * @property {string} SKILLS_DATA.skills.icon - Skills icon
 * @property {string} SKILLS_DATA.skills.name - Skills name
 */
export interface SkillsShowcaseConfig {
  SKILLS_ENABLED: boolean
  SKILLS_DATA: SkillData[]
}

/**
 * GitHub configuration type
 * @property {boolean} ENABLED - Whether to enable GitHub features
 * @property {string} GITHUB_USERNAME - GitHub username
 * @property {boolean} TOOLTIP_ENABLED - Whether to enable Github Tooltip features
 */
export type GithubConfig = {
  ENABLED: boolean
  GITHUB_USERNAME: string
  TOOLTIP_ENABLED: boolean
}

/**
 * Link type
 * @property {string} name - Link display name
 * @property {string} url - Link URL
 */
export type Link = {
  name: string
  url: string
}

/**
 * Social media link type
 * @property {string} name - Platform name
 * @property {string} url - Profile URL
 * @property {string} icon - Icon class name
 * @property {number} [count] - Optional count
 */
export type SocialLink = {
  name: string
  url: string
  icon: string
  count?: number
}

/**
 * Project configuration interface
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string} introduce - Project introduce
 */
export interface ProjectConfig {
  title: string
  description: string
  introduce: string
}

// Project icon type
export type IconType = 'icon' | 'image'

export interface AnalyticsConfig {
  vercount?: {
    enabled: boolean
  }
  umami?: {
    enabled: boolean
    websiteId: string
    serverUrl: string
  }
  google?: {
    enabled: boolean
    id: string
  }
}

