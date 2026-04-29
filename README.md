# tkim-blog

Tonghyun Kim's multilingual (ko / ja / en) tech blog.

- **Live:** https://crowdy.github.io/tkim-blog/
- **RSS:** https://crowdy.github.io/tkim-blog/rss.xml
- **Stack:** Astro 5, vanilla CSS, Pretendard, GitHub Pages, GitHub Actions

Posts live in this repo under `src/content/posts/`. There is no external authoring source and no sync step — write the file, commit, push.

## Daily workflow

```bash
# 1. Author a post (date hierarchy under <lang>/)
mkdir -p src/content/posts/ko/2026/05/01
$EDITOR src/content/posts/ko/2026/05/01/my-new-post.md
# (optional Japanese sibling — share pairSlug to link them)
mkdir -p src/content/posts/ja/2026/05/01
$EDITOR src/content/posts/ja/2026/05/01/my-new-post.md

# 2. Preview locally — drafts visible
npm run dev

# 3. Validate, then push
npm run check
npm run build
git add src/content/posts
git commit -m "post: my-new-post"
git push
```

A push to `main` triggers `.github/workflows/deploy.yml` → `npm ci && npm run check && npm run build` → GitHub Pages.

## Authoring conventions

- File path is `src/content/posts/<lang>/YYYY/MM/DD/<slug>.md` and produces the URL `/<lang>/YYYY/MM/DD/<slug>`.
- Body **must** start with `# Title`. That line is duplicated by the layout's rendered post title; the body H1 is hidden via CSS, so keep the markdown clean.
- An optional `> blockquote` immediately after the title is conventional but not required (`description` lives in frontmatter — see below).
- Translations of the same post share `pairSlug`. `LangToggle` on a post page finds siblings via this field.

### Frontmatter shape

```yaml
---
title: 'Post title'
description: 'One-paragraph hook used in lang-index cards, <meta name="description">, and RSS.'
pubDate: 2026-04-21T00:00:00.000Z
lang: ko                       # ko | ja | en — must match the directory
pairSlug: 'ghost-in-the-skill' # shared across translations
draft: false                   # true hides from production build and RSS
---
```

The schema is enforced by `src/content/config.ts`. Bad frontmatter fails `npm run check`.

## Project layout

```
.
├── astro.config.mjs              # site, base, Shiki dual theme
├── src/
│   ├── content/
│   │   ├── config.ts             # zod schema for posts
│   │   └── posts/{ko,ja,en}/YYYY/MM/DD/<slug>.md   # the posts
│   ├── layouts/
│   │   ├── BaseLayout.astro      # nav, footer, theme + anchor scripts
│   │   └── PostLayout.astro      # post-header, View source link
│   ├── components/
│   │   ├── PostCard.astro        # flat li for lang index
│   │   ├── LangToggle.astro      # sibling-language switcher
│   │   └── ThemeToggle.astro     # legacy; toggle is now inline in BaseLayout
│   ├── pages/
│   │   ├── index.astro           # redirect → /ko/
│   │   ├── [lang]/index.astro    # ko/ja/en list
│   │   ├── [lang]/[...slug].astro # post detail (catch-all on date+slug)
│   │   ├── 404.astro
│   │   └── rss.xml.ts            # RSS feed across all langs
│   ├── styles/global.css         # nesbitt-style tokens + typography
│   └── utils/pairs.ts            # pair lookup
├── docs/superpowers/             # design specs and implementation plans
└── .github/workflows/deploy.yml  # build + deploy to Pages
```

## Commands

```bash
npm run dev        # Astro dev server (drafts visible)
npm run check      # astro check (TypeScript + content schema)
npm run build      # production build → dist/
npm run preview    # serve dist/
```

## Theming

Two color modes (light / dark) driven by:

1. `localStorage.theme` if set (toggle button in header writes here)
2. otherwise `prefers-color-scheme`

Code blocks use Shiki dual theme (`github-light` / `github-dark`) and switch via the same logic.

## RSS

`src/pages/rss.xml.ts` emits all non-draft posts across all languages, newest first. Each item title is prefixed with the language code (`[ko]`, `[ja]`, `[en]`).

## Notes

- See `docs/superpowers/specs/` for the design history (initial blog spec, AstroPaper port, nesbitt-style upgrade).
