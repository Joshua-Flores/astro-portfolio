---
title: "UI Best Practices for Backend Developers"
description: "A practical guide for backend developers who find themselves building frontends — covering layout, typography, spacing, and common pitfalls."
pubDate: 2025-02-20
tags: ["Frontend", "UI Design", "Best Practices"]
---

## The Backend Developer's UI Problem

If you're a backend developer who's been asked to build a frontend (or you're building a side project and need it to not look terrible), this post is for you. I've worked with a lot of backend engineers who are brilliant at system design but struggle when it comes to making something look good on screen. The good news is that you don't need to become a designer — you just need a few principles.

## Start With Spacing

The single biggest thing that separates a professional-looking UI from an amateur one is spacing. Consistent spacing makes everything look intentional, even if your design skills are limited.

Here's the rule: **pick a base unit and stick to it**. I use 4px as my base. All spacing values should be multiples of that base:

- `4px` — tight spacing between related elements
- `8px` — default gap between elements
- `16px` — section padding
- `24px` or `32px` — major section breaks

If you're using Tailwind, this is built in with the spacing scale (`p-1`, `p-2`, `p-4`, `p-6`, `p-8`).

## Typography Hierarchy

You need exactly three levels of visual hierarchy for most UIs:

1. **Headings** — large, bold, used sparingly
2. **Body text** — your default readable size (16px is a safe bet)
3. **Secondary text** — smaller, lighter color, for metadata and labels

Don't use more than two fonts. Honestly, one font with different weights is usually enough. System fonts are fine — no one is judging your side project for not using a custom typeface.

## Color: Less is More

Pick one accent color and use it consistently for interactive elements (buttons, links, hover states). Everything else should be neutrals. A simple palette:

- **Background** — white or very light gray
- **Text** — near-black (not pure `#000`)
- **Accent** — one brand color for CTAs and links
- **Muted** — gray for secondary text and borders

Dark mode? Don't worry about it until version 2.

## Common Pitfalls

### Too Many Borders

Backend developers love borders. I get it — they clearly define where things are. But too many borders make a UI feel cluttered. Try using spacing and background color differences instead.

### Inconsistent Alignment

Pick left-aligned or centered and stick with it within a section. Mixing alignment makes everything feel chaotic.

### Walls of Text

Break things up. Use bullet points, short paragraphs, and headings. If a section is longer than 3-4 lines, see if you can restructure it.

### Ignoring Mobile

Test on a phone. Seriously. Flexbox with `flex-wrap` and a single-column mobile layout will get you 80% of the way there.

## Recommended Tools

- **Tailwind CSS** — constraints-based styling that makes it hard to make bad choices
- **Shadcn/ui** — pre-built components that look professional out of the box
- **Figma** — even a rough wireframe before coding saves time

## The Bottom Line

You don't need to be a designer to build a good UI. Consistent spacing, clear hierarchy, restrained color usage, and testing on mobile will put you ahead of most developer-built interfaces. Start simple, get feedback, and iterate.
