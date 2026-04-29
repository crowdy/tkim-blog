# Nesbitt-Style Visual Upgrade — Design Spec

**Date:** 2026-04-29
**Reference:** https://nesbitt.io · https://github.com/andrew/nesbitt.io
**Approach:** Adopt nesbitt.io's layout, palette, header/footer pattern, and post-content typography while keeping Pretendard as the primary font and preserving multilingual structure (ko/ja/en + pair toggle + drafts).

## Goal

Make tkim-blog look and feel like nesbitt.io: wider container, GitHub-flavored color palette, top-of-page accent bar, simple post layout with hr-bordered subheadings, GitHub-style code blocks. Add an RSS feed (small extra value). Keep Pretendard for Korean/Japanese readability.

## Out of Scope

- Avatar / profile image (no asset)
- Sitewide search / tags / archive (content has no tags)
- Comments
- Custom domain
- Tailwind, JS framework dependencies
- Sitemap (`@astrojs/sitemap`) — can be added later

## Source Comparison (concise)

| Property | nesbitt.io | tkim-blog (after) |
|---|---|---|
| Container width | 900px | **900px** |
| Top accent border | 2px solid accent | **adopt** |
| Body font-size | 16px / 1.5 | 16px / 1.5 |
| `.post-content` font-size | 16px / 1.7 | **17px / 1.75** (slightly larger for ko/ja) |
| Primary font | system stack | **Pretendard Variable** |
| H1 | 42px / 600 | 42px / 600 |
| Post-content H2 | bottom-bordered | **adopt** |
| Code block | `#f6f8fa` bg + border + 6px | **adopt** |
| Inline code | tinted bg, 85% size | **adopt** |
| Blockquote | clean 0.25em gray border | **adopt** |
| Anchor links on h2–h5 | hover-fade `#` | **adopt** |
| Header pattern | brand + right-aligned SVG icons | **brand + lang nav + RSS/GitHub/theme** |
| Footer pattern | flex justify-between, "View source" on posts | **adopt** |
| RSS feed | yes | **add** |

## Color Palette

```
:root {
  --color-text:           #1f2328;
  --color-bg:             #ffffff;
  --color-accent:         #006ab2;
  --color-secondary:      #656d76;
  --color-blockquote:     #59636e;
  --color-code-bg:        #f6f8fa;
  --color-code-inline-bg: rgba(175, 184, 193, 0.2);
  --color-border:         #d1d9e0;
  --color-section-border: #eeeeee;
  --color-table-alt:      #f6f8fa;
  --color-footer-source:  #b0b0b0;
}

[data-theme='dark'] (and prefers-color-scheme: dark when no override) {
  --color-text:           #e6edf3;
  --color-bg:             #0d1117;
  --color-accent:         #58a6ff;
  --color-secondary:      #8b949e;
  --color-blockquote:     #8b949e;
  --color-code-bg:        #161b22;
  --color-code-inline-bg: rgba(110, 118, 129, 0.4);
  --color-border:         #30363d;
  --color-section-border: #21262d;
  --color-table-alt:      #161b22;
  --color-footer-source:  #484f58;
}
```

The legacy `--bg` / `--fg` / `--accent` / `--card` / `--border` tokens are removed; all components migrate to the new `--color-*` names.

## Typography

- Font stack: `'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- Body: 16px / 1.5
- `.post-content`: 17px / 1.75 (1px above nesbitt to keep Korean/Japanese comfortable)
- H1 (post-title): 42px / 600 / 1.2 / margin `0 0 20px`
- Mobile breakpoint @600px: H1 24px, post-content 16px

## Layout

### Container
```css
.container { max-width: 900px; padding: 10px 15px; margin: 0 auto; }
body { border-top: 2px solid var(--color-accent); }
```

### Header
```html
<nav class="navbar">
  <a class="brand" href="/">crowdy</a>
  <ul class="nav-icons">
    <li class="lang-nav">
      <a href="/ko/">KO</a> · <a href="/ja/">JA</a> · <a href="/en/">EN</a>
    </li>
    <li><a href="/rss.xml" aria-label="RSS"><svg…/></a></li>
    <li><a href="https://github.com/crowdy/tkim-blog" aria-label="GitHub"><svg…/></a></li>
    <li><button class="theme-toggle"><svg…/></button></li>
  </ul>
</nav>
```

- SVG icons reuse Bootstrap-icons paths from nesbitt.io's `default.html` (RSS, GitHub, sun, moon).
- Lang nav remains a text triple `KO · JA · EN`. Active language is bold + non-clickable.
- Mobile: `flex-wrap: wrap`, brand on first line, icons on second.

### Footer
```html
<footer class="site-footer">
  <span class="footer-nav">
    <a href="https://github.com/crowdy/tkim-blog">GitHub</a> ·
    <a href="/rss.xml">RSS</a>
  </span>
  {#if isPost}
    <span class="footer-source"><a href="…GitHub blame URL…">View source</a></span>
  {/if}
</footer>
```

- `display: flex; justify-content: space-between`
- All links default to `--color-secondary`; hover → `--color-accent`
- "View source" link opens the post's source markdown on GitHub (`https://github.com/crowdy/tkim-blog/blob/main/src/content/posts/<lang>/<slug>.md`)

## Post Layout

```html
<article class="post">
  <header class="post-header">
    <h1 class="post-title">{title}</h1>
    <p class="post-meta">{YYYY-MM-DD}{ · draft if draft}</p>
    <LangToggle />
  </header>
  <div class="post-content">
    <slot />
  </div>
</article>
```

CSS rules for `.post-content`:
- h2: `font-size: 1.5em; padding-bottom: .3em; border-bottom: 1px solid var(--color-border); margin: 40px 0 20px`
- h3: `font-size: 1.25em; margin: 40px 0 20px`
- h4: `font-size: 1em`
- p: `margin: 0 0 20px`
- ul/ol: `padding-left: 2em; margin-bottom: 20px`
- li + li: `margin-top: .25em`
- blockquote: `padding: 0 1em; border-left: .25em solid var(--color-border); color: var(--color-blockquote)`
- code: `padding: .2em .4em; font-size: 85%; background: var(--color-code-inline-bg); border-radius: 6px; font-family: ui-monospace, …`
- pre: `padding: 16px; font-size: 85%; background: var(--color-code-bg); border: 1px solid var(--color-border); border-radius: 6px; line-height: 1.45`
- pre code: reset (transparent bg, no padding)
- table: GitHub-style with alternating row bg
- hr: 1px line, `margin: 40px 0`

The first h1 inside `.post-content` stays hidden (current behavior preserved).

## Post Card (Lang Index)

```html
<li>
  <h4><a href="/{lang}/{slug}/">{title}</a></h4>
  <p class="post-meta">{YYYY-MM-DD}{ · draft if draft}{ · 翻訳あり if pair exists}</p>
  <p class="post-description">{description}</p>
</li>
```

- Plain list (`section.posts ul { list-style: none; padding: 0 }`)
- No card border or background — flat
- 20px between items, no separator (matches nesbitt)

## Lang Index Page

```astro
<BaseLayout>
  <p>{intro paragraph for this lang}</p>  <!-- short, optional -->
  <hr>
  <section class="posts">
    <h3>{posts heading per lang}</h3>
    <ul>{posts}</ul>
  </section>
</BaseLayout>
```

Intro paragraph (per language, 1 sentence):
- ko: "Tonghyun Kim의 기술 블로그 — 한국어 글 모음"
- ja: "Tonghyun Kim の技術ブログ — 日本語の記事"
- en: "Tonghyun Kim's tech blog — English posts"

## Anchor Links

Inline script, run after DOMContentLoaded, identical to nesbitt.io's:

```js
document.querySelectorAll('h2[id], h3[id], h4[id], h5[id]').forEach(h => {
  const a = document.createElement('a');
  a.className = 'anchor-link';
  a.href = '#' + h.id;
  a.textContent = '#';
  h.appendChild(a);
});
```

Astro generates `id` for headings via Markdown remark slug plugin — already on by default.

CSS:
```css
h2[id]:hover .anchor-link, h3[id]:hover .anchor-link, … { opacity: 1 }
.anchor-link { margin-left: .3em; color: var(--color-secondary); opacity: 0; transition: opacity .15s }
```

## RSS Feed

- Add `@astrojs/rss` dep
- Endpoint: `src/pages/rss.xml.ts`
- Output: all non-draft posts across all languages, newest first, with title-suffix indicating lang `[ko]`, `[ja]`, `[en]`
- Item schema: `title`, `description`, `pubDate`, `link` (absolute), `customData` lang
- Site config provides absolute URL via `import.meta.env.SITE` + base

## Theme Toggle

- Same logic as today (data-theme + localStorage + system pref)
- Icon swap: copy nesbitt.io's exact moon/sun SVG paths
- Style: `background: none; border: none; color: var(--color-accent)`
- Bootstrap-icons size 16px

## Files Touched

- `package.json` — add `@astrojs/rss`
- `src/styles/global.css` — full rewrite
- `src/layouts/BaseLayout.astro` — header/footer markup, anchor-link script, container wrapper
- `src/layouts/PostLayout.astro` — `<header class="post-header">` + post-content wrapper, View source link
- `src/components/PostCard.astro` — flat list item
- `src/components/LangToggle.astro` — minor style adjustment to fit new palette
- `src/components/ThemeToggle.astro` — icon swap to Bootstrap-icons SVG
- `src/pages/[lang]/index.astro` — intro + `section.posts` structure
- `src/pages/rss.xml.ts` — new
- `astro.config.mjs` — no change

## Tests

Existing tests (parsers, sync) are unaffected — only presentation layer changes. No new unit tests required.

Verification:
- `npm run check` clean
- `npm run build` produces 28 pages (27 + RSS)
- `curl /tkim-blog/rss.xml` returns valid XML 200
- Spot-check a post renders with `<header class="post-header">`, post-content, View source link
- LangToggle still renders for paired posts

## Risks

- Removing `--bg`/`--fg` token names breaks any inline `style` references — none in current code (verified: only `global.css` uses them).
- Anchor-link script runs at end of document; since it's static markup, no SSR conflict.
- RSS endpoint requires `import.meta.env.SITE` which is `https://crowdy.github.io`; rss-pkg helper expands automatically.

## Rollback

Single revert commit restores the AstroPaper-port styling. All changes are layout/CSS/templates — no data migration.
