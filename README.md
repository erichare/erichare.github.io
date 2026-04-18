# erichare.me

My personal site, rebuilt for 2026. Astro + Tailwind CSS v4 + MDX, deployed to GitHub Pages.

[![Deploy to GitHub Pages](https://github.com/erichare/erichare.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/erichare/erichare.github.io/actions/workflows/deploy.yml)
[![Lighthouse](https://github.com/erichare/erichare.github.io/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/erichare/erichare.github.io/actions/workflows/lighthouse.yml)

## Stack

- **[Astro 5](https://astro.build)** — static-first, content collections, view transitions.
- **[Tailwind CSS v4](https://tailwindcss.com)** — via the Vite plugin, with a custom `@theme` block in `src/styles/global.css`.
- **MDX** for long-form content (projects, blog posts).
- **[Satori](https://github.com/vercel/satori) + Sharp** for dynamic OG image generation at `/og-default.png`.
- **Icons**: Lucide + Simple Icons via `astro-icon`.
- **Fonts**: Inter (sans), Newsreader (serif), JetBrains Mono (mono).
- **Hosted on GitHub Pages** (custom domain: `erichare.me`). Deploys on push to `main` via Actions.

## Repository layout

```
.
├── cv.md                         # Single source of truth for the CV (rendered at /cv)
├── scripts/
│   └── generate-cv-pdf.mjs       # Regenerate public/cv.pdf from /cv (via Chrome headless)
├── public/
│   ├── CNAME                     # erichare.me
│   ├── cv.pdf                    # PDF export of the CV
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── site.webmanifest
│   ├── img/personal/…            # headshot + derived sizes
│   ├── llms.txt                  # machine-readable site index for agents
│   ├── humans.txt
│   └── robots.txt
├── src/
│   ├── components/               # SEO, Header, Footer, ProjectCard, ThemeToggle, …
│   ├── content/
│   │   ├── blog/                 # MDX posts
│   │   ├── projects/             # MDX project pages
│   │   └── publications/         # MDX publication entries
│   ├── content.config.ts         # Zod schemas for all content collections
│   ├── layouts/BaseLayout.astro
│   ├── lib/site.ts               # Site metadata + navigation
│   ├── pages/                    # Routes (home, about, projects, publications, blog, cv, now, 404)
│   │   ├── og-default.png.ts     # Dynamic OG image (Satori)
│   │   └── rss.xml.ts            # Writing feed
│   └── styles/
│       ├── global.css            # @theme + base + component styles
│       └── print.css             # Print/PDF stylesheet used by /cv
└── .github/workflows/
    ├── deploy.yml                # Build + deploy to GitHub Pages on push to main
    └── lighthouse.yml            # Lighthouse CI on pull requests
```

## Developing locally

Requires Node 22+ (see `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static output → ./dist
npm run preview      # preview the built site
npm run check        # astro + TypeScript check
npm run cv:pdf       # regenerate public/cv.pdf from /cv via Chrome headless
```

## Content authoring

### Updating the CV

Edit `cv.md` at the repo root. The `/cv` page renders it automatically. Then regenerate the PDF:

```bash
npm run cv:pdf
```

The script builds the site, spins up `astro preview`, and uses headless Chrome to print `/cv` into
`public/cv.pdf`. The `/cv` page has a dedicated print stylesheet (`src/styles/print.css`) that strips
site chrome and formats the document for letter-size paper, so the resulting PDF matches the
on-screen CV.

Override the Chrome binary with `CHROME=/path/to/chrome npm run cv:pdf` if needed.

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
featured: false      # true puts it in the first row of the home-page grid
order: 10            # lower = higher in the listing
links:
  - label: "Repo"
    href: "https://github.com/..."
---
```

### Adding a blog post

`src/content/blog/<slug>.mdx`:

```yaml
---
title: "Post title"
description: "Meta description."
pubDate: 2026-04-17
tags: ["tag1"]
draft: false
---
```

Drafts are excluded from `/blog`, the RSS feed, and the home-page recent-posts list, but are still
pre-rendered so you can preview the URL.

### Adding a publication

`src/content/publications/<slug>.mdx` with `title`, `authors`, `venue`, `year`,
`kind` (`journal` | `conference` | `workshop` | `poster` | `talk` | `preprint`), and optional
`doi`, `url`, `abstract`, `award`.

## Deploy

`main` → GitHub Pages. The workflow is in `.github/workflows/deploy.yml`.

GitHub Pages must be configured with **Build and deployment → Source: GitHub Actions**
(Settings → Pages). This repo is already set that way.

## License

Site code: MIT. Content (prose, CV, publications metadata): © Eric Hare, all rights reserved.
