# tkim-blog — Agent Guide

This file orients Claude (and other AI agents) working on this repo. Read it before making changes.

## What this is

A multilingual (ko / ja / en) personal blog built with Astro and deployed to GitHub Pages.

- **Live:** https://crowdy.dev/
- **Source of truth:** `src/content/posts/{ko,ja,en}/YYYY/MM/DD/<slug>.md` — markdown with frontmatter, committed to this repo
- **Tech:** Astro 5, vanilla CSS, Pretendard via jsDelivr CDN, Shiki dual theme

Posts live directly in the repo. There is no external authoring source and no sync step.

## Where to edit

| You want to... | Edit... |
|---|---|
| Add or change a post | `src/content/posts/<lang>/YYYY/MM/DD/<slug>.md` |
| Change site styling | `src/styles/global.css` |
| Change layout / nav / footer | `src/layouts/BaseLayout.astro` |
| Change post page structure | `src/layouts/PostLayout.astro` |
| Change post-list cards | `src/components/PostCard.astro` |
| Change lang-index pages | `src/pages/[lang]/index.astro` |
| Change content schema | `src/content/config.ts` |
| Change deploy pipeline | `.github/workflows/deploy.yml` |

## Daily commands

```bash
npm run dev      # Astro dev server (drafts visible)
npm run check    # TypeScript + content schema validation
npm run build    # Production build → dist/
```

CI runs `npm ci && npm run check && npm run build`.

## Conventions to preserve

### Authoring

Each post is a markdown file with frontmatter. Layout:

```
src/content/posts/
  ko/2026/04/21/ghost-in-the-skill.md
  ja/2026/04/21/ghost-in-the-skill.md
```

The directory hierarchy `<lang>/YYYY/MM/DD/<slug>.md` becomes the URL `/<lang>/YYYY/MM/DD/<slug>`.

**Required frontmatter fields:**

```yaml
---
title: 'Post title (matches the H1 below)'
description: 'One-paragraph hook used in lists and RSS.'
pubDate: 2026-04-21T00:00:00.000Z
lang: ko          # ko | ja | en — must match the directory
pairSlug: 'ghost-in-the-skill'   # shared across translations to link them
draft: false      # true hides from production build
---

# Post title

> Optional opening blockquote — already used as `description` source above; can keep or omit in body.

Body markdown...
```

- The body's first `# H1` is hidden via CSS (`.post-content > h1:first-child { display: none }`) so it doesn't duplicate the rendered title.
- `pairSlug` is the contract that links translations. ko and ja siblings of the same post share `pairSlug`. They can live under different dates if needed, but conventionally share one.
- `draft: true` keeps a post visible in `npm run dev` but excludes it from the production build and RSS.

### Adding a new post

```bash
mkdir -p src/content/posts/ko/2026/05/01
$EDITOR src/content/posts/ko/2026/05/01/my-new-post.md
# (optional Japanese sibling)
mkdir -p src/content/posts/ja/2026/05/01
$EDITOR src/content/posts/ja/2026/05/01/my-new-post.md

npm run dev          # verify locally
npm run check
npm run build
git add src/content/posts
git commit -m "post: my-new-post"
git push             # deploys via Actions
```

### Styling

The site mirrors nesbitt.io's visual language (GitHub-flavored palette, 900px container, top-of-body 2px accent border, post-content with bordered h2). See:

- `docs/superpowers/specs/2026-04-29-nesbitt-style-design.md` — the spec
- `src/styles/global.css` — token definitions; only `--color-*` tokens are used

When changing styles, add tokens, don't hardcode colors. Pretendard is the primary font — keep it in the CDN preconnect/stylesheet pair in `BaseLayout.astro`.

### Theme & dark mode

- `data-theme` attribute on `<html>` (set by toggle, persisted in `localStorage`)
- Falls back to `prefers-color-scheme` when no override
- The inline `<script is:inline>` in `<head>` applies stored theme before paint to avoid flash. Do not move that script.

### Anchor links

`BaseLayout.astro` includes a small inline script that adds `<a class="anchor-link">#</a>` to every `h2[id]/h3[id]/h4[id]/h5[id]` inside `.post-content`. CSS shows the `#` on hover. Don't duplicate this logic in components.

## Pull requests

Work happens on `main`. There is no staging branch. CI deploys on push to main, so:

- Verify `npm run check && npm run build` pass before pushing.
- If the build is broken, the previous deploy stays live (Pages does not roll back, but new artifact is not deployed).

For non-trivial changes, write a spec under `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` and a plan under `docs/superpowers/plans/YYYY-MM-DD-<topic>.md`. Follow the superpowers workflow (brainstorming → writing-plans → executing-plans).

## Watch out

- The site is served from the apex domain `crowdy.dev` (custom domain on the GitHub Pages project repo), so `base` is `/`. All internal hrefs still go through `import.meta.env.BASE_URL` so the site can be re-pathed without code changes. Don't hardcode the bare domain.
- `public/CNAME` contains `crowdy.dev` and is copied to `dist/` on build — GitHub Pages reads it to bind the custom domain. Do not delete it.
- The URL slug is the path inside `<lang>/`, including the date hierarchy. `postSlug(post)` in `src/utils/pairs.ts` derives this from `post.id`.
- The CDN-loaded Pretendard stylesheet is pinned to `v1.3.9`. Bumping the version is fine, but verify the path matches jsDelivr's current layout.
- GitHub Actions uses Node 22.

## Useful files at a glance

| Path | Purpose |
|---|---|
| `astro.config.mjs` | site, base path, Shiki dual theme |
| `src/content/config.ts` | posts collection schema (zod) |
| `src/utils/pairs.ts` | `getPairs(allPosts, current)` and `postSlug(post)` |
| `src/pages/[lang]/[...slug].astro` | per-post route (catch-all on the date+slug path) |
| `src/pages/[lang]/index.astro` | language index page |
| `src/pages/rss.xml.ts` | RSS feed builder |
