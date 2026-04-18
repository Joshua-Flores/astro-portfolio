# CLAUDE.md

## Project

Personal portfolio site for Joshua Flores (https://joshuaflores.rocks). Built with **Astro 5** using the **Litos** theme. Migrated from Hugo (Blowfish theme) — the directory name `hugo-portfolio` is historical; this is now an Astro project.

Deployed to **Netlify** (see `netlify.toml`).

## Stack

- **Astro 5** + **React 19** (islands for interactive bits)
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **TypeScript** with `~/*` alias → `./src/*`
- **pnpm** (see `pnpm-lock.yaml`) — use `pnpm`, not npm/yarn
- **Pagefind** for static search (runs in `postbuild`)
- **Expressive Code** + Shiki for code blocks
- **nanostores** for client-side state
- Markdown pipeline: remark/rehype plugins in `./plugins/`, plus `rehype-katex`, `rehype-callouts`, `remark-math`, `remark-directive-sugar`, `remark-imgattr`, etc.

## Scripts

- `pnpm dev` — local dev server
- `pnpm build` — `astro check` + `astro build` + Pagefind index
- `pnpm preview` — preview built site
- `pnpm format:write` — Prettier (with `prettier-plugin-astro`)

## Layout

- `src/config.ts` — **site-wide config** (title, nav links, socials, post/project/tags/analytics settings). Edit here, not scattered across components.
- `src/content.config.ts` — Astro content collection schemas for `posts` and `projects`.
- `src/content/posts/<slug>/index.md` — blog posts (each in its own folder, co-located with images).
- `src/content/projects/<slug>/index.md` — portfolio project entries.
- `src/pages/` — routes: `index.astro`, `about.astro`, `posts/`, `projects/`, `tags/`, `404.astro`.
- `src/layouts/`, `src/components/`, `src/styles/`, `src/assets/`, `src/stores/`, `src/lib/`, `src/types.ts`.
- `plugins/` — custom remark/rehype plugins wired into `astro.config.ts`.
- `public/` — static assets served at root (favicon, og-image, etc.).
- `ec.config.mjs` — Expressive Code config (line numbers, collapsible sections).

## Content authoring

Posts frontmatter (see schema in `src/content.config.ts`): `title`, `description`, `pubDate` (Date), `tags?`, `updatedDate?`, `author?`, `cover?`, `ogImage?`, `recommend?`, `postType?`, `coverLayout?`, `pinned?`, `draft?`, `license?`. If `POSTS_CONFIG.ogImageUseCover` is set, `cover` is used as `ogImage` automatically.

Projects frontmatter: `name`, `description`, `pubDate`, `type`, `tags?`, `githubUrl?`, `website?`, `cover?`, `draft?`.

Posts were recently converted to markdown (previously MDX/other). Prefer plain `.md` with the remark-directive-sugar syntax already enabled.

## Conventions

- Import with the `~/` alias (e.g. `import { SITE } from '~/config'`), not relative paths into `src`.
- Edit existing theme components rather than cloning them; Litos config lives in `src/config.ts`.
- RSS feed and the old photos page were intentionally removed — don't re-add without asking.
- Non-English references from the upstream Litos theme have been stripped; keep new content English-only.
- No Firebase, no Hugo shortcodes.
