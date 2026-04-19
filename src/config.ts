import type {
  AnalyticsConfig,
  GithubConfig,
  Link,
  PostConfig,
  ProjectConfig,
  Site,
  SkillsShowcaseConfig,
  SocialLink,
  TagsConfig,
} from '~/types'

//--- Home Page Config ---
export const SITE: Site = {
  title: 'joshuaflores.rocks',
  description: 'User Experience Designer and Web Developer',
  website: 'https://joshuaflores.rocks/',
  lang: 'en',
  base: '/',
  author: 'Joshua Flores',
  ogImage: '/og-image.png',
  transition: false,
}

export const HEADER_LINKS: Link[] = [
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Tags',
    url: '/tags',
  },
  {
    name: 'About',
    url: '/about',
  },
]

export const FOOTER_LINKS: Link[] = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Tags',
    url: '/tags',
  },
  {
    name: 'About',
    url: '/about',
  },
]

// get icon https://icon-sets.iconify.design/
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'github',
    url: 'https://github.com/joshua-flores',
    icon: 'icon-[ri--github-fill]',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/joshua-flores-18b90516b/',
    icon: 'icon-[ri--linkedin-box-fill]',
  },
  {
    name: 'youtube',
    url: 'https://www.youtube.com/@joshlearnspiano2928',
    icon: 'icon-[ri--youtube-fill]',
  },
  {
    name: 'email',
    url: 'mailto:joshuapflores.design@gmail.com',
    icon: 'icon-[ri--mail-fill]',
  },
]

export const SKILLSSHOWCASE_CONFIG: SkillsShowcaseConfig = {
  SKILLS_ENABLED: true,
  SKILLS_DATA: [
    {
      direction: 'left',
      skills: [
        {
          name: 'HTML',
          icon: 'icon-[skill-icons--html]',
          url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        },
        {
          name: 'CSS',
          icon: 'icon-[skill-icons--css]',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        },
        {
          name: 'TypeScript',
          icon: 'icon-[skill-icons--typescript]',
          url: 'https://www.typescriptlang.org/',
        },
        {
          name: 'React',
          icon: 'icon-[skill-icons--react-dark]',
          url: 'https://react.dev/',
        },
        {
          name: 'Vue',
          icon: 'icon-[skill-icons--vuejs-dark]',
          url: 'https://vuejs.org',
        },
        {
          name: 'Claude',
          icon: 'icon-[logos--claude-icon]',
          url: 'https://claude.com/',
        },
      ],
    },
    {
      direction: 'right',
      skills: [
        {
          name: 'Astro',
          icon: 'icon-[skill-icons--astro]',
          url: 'https://astro.build/',
        },
        {
          name: 'FastAPI',
          icon: 'icon-[skill-icons--fastapi]',
          url: 'https://fastapi.tiangolo.com/',
        },
        {
          name: 'Tailwind CSS',
          icon: 'icon-[skill-icons--tailwindcss-dark]',
          url: 'https://tailwindcss.com/',
        },
        {
          name: 'Material-UI',
          icon: 'icon-[logos--material-ui]',
          url: 'https://mui.com/material-ui/',
        },
        {
          name: 'PrimeVue',
          icon: 'icon-[simple-icons--primevue]',
          url: 'https://primevue.org/',
        },
      ],
    },
    {
      direction: 'left',
      skills: [
        {
          name: 'Vitest',
          icon: 'icon-[logos--vitest]',
          url: 'https://vitest.dev/',
        },
        {
          name: 'Playwright',
          icon: 'icon-[logos--playwright]',
          url: 'https://playwright.dev/',
        },
        {
          name: 'Figma',
          icon: 'icon-[skill-icons--figma-dark]',
          url: 'https://www.figma.com/',
        },
        {
          name: 'WordPress',
          icon: 'icon-[skill-icons--wordpress]',
          url: 'https://wordpress.org/',
        },
        {
          name: 'Netlify',
          icon: 'icon-[skill-icons--netlify-dark]',
          url: 'https://www.netlify.com/',
        },
      ],
    },
  ],
}

export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  GITHUB_USERNAME: 'joshua-flores',
  TOOLTIP_ENABLED: true,
}

//--- Posts Page Config ---
export const POSTS_CONFIG: PostConfig = {
  title: 'Posts',
  description: 'Posts by Joshua Flores',
  introduce: 'Thoughts, tutorials, and project writeups.',
  author: 'Joshua Flores',
  homePageConfig: {
    size: 3,
    type: 'image',
  },
  postPageConfig: {
    size: 10,
    type: 'image',
    coverLayout: 'right',
  },
  tagsPageConfig: {
    size: 10,
    type: 'time-line',
  },
  ogImageUseCover: false,
  postType: 'metaOnly',
  imageDarkenInDark: true,
  readMoreText: 'Read more',
  prevPageText: 'Previous',
  nextPageText: 'Next',
  tocText: 'On this page',
  backToPostsText: 'Back to Posts',
  nextPostText: 'Next Post',
  prevPostText: 'Previous Post',
  recommendText: 'REC',
  wordCountView: true,
}

export const TAGS_CONFIG: TagsConfig = {
  title: 'Tags',
  description: 'All tags of Posts',
  introduce: 'All the tags for posts are here, you can click to filter them.',
}

export const PROJECTS_CONFIG: ProjectConfig = {
  title: 'Projects',
  description: 'A collection of my projects.',
  introduce: 'Here are some of the projects I have worked on.',
}

export const ANALYTICS_CONFIG: AnalyticsConfig = {
  vercount: {
    enabled: false,
  },
  umami: {
    enabled: false,
    websiteId: '',
    serverUrl: '',
  },
}
