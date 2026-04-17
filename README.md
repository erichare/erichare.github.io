# erichare.me

My personal site, rebuilt for 2026. Astro + Tailwind CSS v4 + MDX, deployed to GitHub Pages.

[![Deploy to GitHub Pages](https://github.com/erichare/erichare.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/erichare/erichare.github.io/actions/workflows/deploy.yml)

## Stack

- **[Astro 5](https://astro.build)** — static-first, content collections, view transitions.
- **[Tailwind CSS v4](https://tailwindcss.com)** — via the Vite plugin, with a custom `@theme` block in `src/styles/global.css`.
- **MDX** for long-form content (projects, blog posts).
- **[Satori](https://github.com/vercel/satori) + Sharp** for dynamic OG image generation.
- **Icons**: Lucide + Simple Icons via `astro-icon`.
- **Fonts**: Inter (sans), Newsreader (serif), JetBrains Mono (mono).
- **Hosted on GitHub Pages** (custom domain: `erichare.me`). Deploys on push to `main` via Actions.

## Repository layout

```
.
├── cv.md                     # Single source of truth for the CV (rendered at /cv)
├── public/
│   ├── CNAME                 # erichare.me
│   ├── cv.pdf                # PDF export of the CV
│   ├── favicon.svg
│   ├── img/personal/…        # headshots
│   ├── llms.txt              # machine-readable site index for agents
│   ├── humans.txt
│   └── robots.txt
├── src/
│   ├── components/           # SEO, Header, Footer, ProjectCard, etc.
│   ├── content/
│   │   ├── blog/             # MDX posts
│   │   ├── projects/         # MDX project pages
│   │   └── publications/     # MDX publication entries
│   ├── content.config.ts     # Zod schemas for all collections
│   ├── layouts/BaseLayout.astro
│   ├── lib/site.ts           # Site metadata + navigation
│   ├── pages/                # Routes (home, about, projects, publications, blog, cv, now, 404)
│   └── styles/global.css
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── .github/workflows/
    ├── deploy.yml            # Build + deploy to GitHub Pages
    └── lighthouse.yml        # Lighthouse CI on PRs
```

## Developing locally

Requires Node 22+.

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static output → ./dist
npm run preview      # preview the built site
npm run check        # astro + TypeScript check
```

## Content authoring

### Adding a project

Drop a file in `src/content/projects/<slug>.mdx` with frontmatter:

```yaml
---
title: "Project name"
tagline: "One-line pitch."
summary: "Short description for SEO."
role: "Your role"
period: "2024 — Present"
stack: ["Python", "React"]
featured: false
order: 10
links:
  - label: "Repo"
    href: "https://github.com/..."
---
```

### Adding a blog post

`src/content/blog/<slug>.mdx` — frontmatter schema:

```yaml
---
title: "Post title"
description: "Meta description."
pubDate: 2026-04-17
tags: ["tag1"]
draft: false
---
```

Drafts are excluded from the index and RSS but still pre-rendered so you can preview the URL.

### Adding a publication

`src/content/publications/<slug>.mdx` with `title`, `authors`, `venue`, `year`, `kind`, optional
`doi`, `url`, `abstract`, `award`.

### Updating the CV

Edit `cv.md` at the repo root. The `/cv` page renders it automatically. Regenerate the PDF with
your tool of choice (pandoc, Typst, or just print-to-PDF from the web page).

## Deploy

`main` → GitHub Pages. The workflow is in `.github/workflows/deploy.yml`.

GitHub Pages must be configured with **Build and deployment → Source: GitHub Actions**
(Settings → Pages).

## License

Site code: MIT. Content (prose, CV, publications metadata): © Eric Hare, all rights reserved.
