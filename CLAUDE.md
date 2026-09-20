# CLAUDE.md

## Project

Personal portfolio site for Joshua Flores (https://joshuaflores.rocks), built with **Astro 5** on the **Litos** theme. Deployed to **Netlify** (`netlify.toml`, Node 20).

The directory name `hugo-portfolio` is historical — this is an Astro project, not Hugo.

## Stack

- **Astro 5** + **React 19** (islands for interactive bits)
- **Tailwind CSS 4** via `@tailwindcss/vite`
- **TypeScript**, with `~/*` aliased to `./src/*`
- **pnpm** — use `pnpm`, not npm/yarn
- **Pagefind** for static search (runs in `postbuild`)
- **Expressive Code** for code blocks (`ec.config.ts`)
- **nanostores** for client-side state
- **Plausible** for analytics — the only analytics provider

## Scripts

- `pnpm dev` — local dev server
- `pnpm build` — `astro check` + `astro build` + Pagefind index
- `pnpm preview` — preview the built site
- `pnpm format:write` — Prettier

## Layout

- `src/config.ts` — site-wide config (title, nav, socials, posts/projects/tags, analytics). Edit here rather than scattering settings across components.
- `src/content.config.ts` — content collection schemas for `posts` and `projects`.
- `src/content/posts/<slug>/index.md` — blog posts, each in its own folder with its images.
- `src/content/projects/<slug>/index.md` — portfolio entries.
- `src/pages/` — routes: home, about, posts, projects, tags, 404.
- `plugins/` — custom remark/rehype plugins, wired up in `astro.config.ts`.
- `public/` — static assets served at root (favicon, og-image, fonts).

## Content authoring

Write posts as plain `.md`. Frontmatter is defined by the schemas in `src/content.config.ts` — check there for the current fields rather than copying an older post.

Posts: `title`, `description`, `pubDate` required; `tags`, `cover`, `draft`, `pinned` and others optional.
Projects: `name`, `description`, `pubDate`, `type` required; `tags`, `githubUrl`, `website`, `cover`, `draft` optional.

## Conventions

- Import with the `~/` alias (`import { SITE } from '~/config'`), not relative paths into `src`.
- Edit existing theme components rather than cloning them.
- RSS feed and the old photos page were removed on purpose — don't re-add without asking.
- Keep content English-only.
