# Nesbitt-Style Visual Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle tkim-blog to match nesbitt.io's layout, palette, and post-content typography while preserving Pretendard, multilingual structure, pair toggle, drafts, and the sync workflow. Add an RSS feed.

**Architecture:** Rewrite `global.css` with GitHub-flavored color tokens (`--color-*`) and 900px container; restructure header (brand + lang nav + RSS/GitHub/theme SVG icons) and footer (flex justify-between with optional "View source"); flatten post-card list; add anchor-link script and a single RSS endpoint. No data layer or sync changes.

**Tech Stack:** Astro 5, Pretendard Variable (CDN), `@astrojs/rss`, vanilla CSS, Bootstrap-icons SVG paths copied from nesbitt.io.

**Spec:** `docs/superpowers/specs/2026-04-29-nesbitt-style-design.md`

---

## File Structure

| File | Change |
|---|---|
| `package.json`, `package-lock.json` | Add `@astrojs/rss` |
| `src/styles/global.css` | Full rewrite: new tokens + container + nesbitt typography |
| `src/layouts/BaseLayout.astro` | Brand + lang nav + RSS/GitHub/theme SVG icons; flex footer; anchor-link inline script |
| `src/layouts/PostLayout.astro` | `<header class="post-header">`, post-content wrapper, "View source" footer slot |
| `src/components/PostCard.astro` | Flat `<li>` (no card border) |
| `src/components/LangToggle.astro` | Restyle for new tokens |
| `src/components/ThemeToggle.astro` | Replace SVGs with Bootstrap-icons sun/moon |
| `src/pages/[lang]/index.astro` | Intro paragraph + `<section class="posts">` structure |
| `src/pages/rss.xml.ts` | New RSS endpoint |

Pages `index.astro`, `[lang]/[slug].astro`, `404.astro` and `astro.config.mjs` unchanged.

---

## Task 1: Add RSS dependency and endpoint

**Files:**
- Modify: `package.json`, `package-lock.json`
- Create: `src/pages/rss.xml.ts`

- [ ] **Step 1: Install `@astrojs/rss`**

Run: `npm install @astrojs/rss`
Expected: dependency added under `dependencies`.

- [ ] **Step 2: Create RSS endpoint**

`src/pages/rss.xml.ts`:
```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const all = await getCollection('posts');
  const items = all
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .map((p) => {
      const slug = p.id.split('/').pop()!.replace(/\.md$/, '');
      return {
        title: `[${p.data.lang}] ${p.data.title}`,
        description: p.data.description,
        pubDate: p.data.pubDate,
        link: `/${p.data.lang}/${slug}/`,
        customData: `<language>${p.data.lang}</language>`,
      };
    });

  return rss({
    title: 'crowdy blog',
    description: 'Tonghyun Kim — multilingual tech blog',
    site: context.site!,
    items,
    customData: `<language>ko</language>`,
  });
}
```

- [ ] **Step 3: Build to verify endpoint works**

Run: `npm run build`
Expected: includes `dist/rss.xml`. Page count up to 28.

Run: `head -20 dist/rss.xml`
Expected: starts with `<?xml version="1.0" encoding="UTF-8"?>` and contains `<channel>` and at least one `<item>`.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/pages/rss.xml.ts
git commit -m "feat: add RSS feed endpoint"
```

---

## Task 2: Replace global.css with nesbitt-style tokens, container, and base typography

**Files:**
- Modify: `src/styles/global.css` (full rewrite)

- [ ] **Step 1: Rewrite `src/styles/global.css`**

```css
/* ===== Tokens (GitHub-flavored, mirroring nesbitt.io) ===== */

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
  color-scheme: light;
}

[data-theme='dark'] {
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
  color-scheme: dark;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
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
    color-scheme: dark;
  }
}

/* ===== Reset & base ===== */

*, *::before, *::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont,
    'Segoe UI', system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-bg);
  border-top: 2px solid var(--color-accent);
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--color-accent);
  text-decoration: none;
}
a:hover { text-decoration: underline; }

::selection { background: var(--color-accent); color: var(--color-bg); }

/* ===== Container ===== */

.container {
  max-width: 900px;
  padding: 10px 15px;
  margin: 0 auto;
}

/* ===== Header / navbar ===== */

.navbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0 16px;
  gap: 1rem;
}

.navbar .brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.navbar .brand:hover { text-decoration: none; color: var(--color-accent); }

.nav-icons {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
}

.nav-icons > li { display: inline-flex; align-items: center; }

.lang-nav { font-size: 0.95rem; font-weight: 600; color: var(--color-secondary); }
.lang-nav a { color: var(--color-text); }
.lang-nav a:hover { color: var(--color-accent); text-decoration: none; }
.lang-nav a[aria-current='page'] {
  color: var(--color-accent);
  pointer-events: none;
}
.lang-nav .sep { color: var(--color-border); margin: 0 0.15rem; }

.nav-icons a, .nav-icons button.theme-toggle {
  color: var(--color-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}

.nav-icons a:hover, .nav-icons button.theme-toggle:hover {
  color: var(--color-accent);
  text-decoration: none;
}

button.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.nav-icons svg { width: 16px; height: 16px; }

/* ===== Footer ===== */

.site-footer {
  margin-top: 40px;
  padding: 20px 0;
  border-top: 1px solid var(--color-section-border);
  font-size: 14px;
  color: var(--color-secondary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.site-footer a { color: var(--color-secondary); }
.site-footer a:hover { color: var(--color-accent); }

.footer-source a { color: var(--color-footer-source); }
.footer-source a:hover { color: var(--color-secondary); }

/* ===== Post header ===== */

.post-header { margin-bottom: 1rem; }

.post-title {
  font-size: 42px;
  margin: 0 0 20px 0;
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-text);
}

.post-meta {
  font-size: 14px;
  color: var(--color-secondary);
  margin: 5px 0 20px 0;
}

.post-description {
  font-size: 14px;
  color: var(--color-secondary);
  margin: 5px 0 0 0;
}

/* ===== Lang toggle ===== */

.lang-toggle {
  display: inline-flex;
  gap: 0.4rem;
  margin: 0.5rem 0 1.5rem;
}

.lang-toggle button {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: inherit;
  font-weight: 600;
}

.lang-toggle a { text-decoration: none; }
.lang-toggle a button:hover { color: var(--color-accent); border-color: var(--color-accent); }

.lang-toggle button[aria-current='true'] {
  background: var(--color-accent);
  color: var(--color-bg);
  border-color: var(--color-accent);
  cursor: default;
}

/* ===== Post content (GitHub README style) ===== */

.post-content {
  font-size: 17px;
  line-height: 1.75;
}

.post-content > h1:first-child { display: none; }

.post-content p { margin: 0 0 20px 0; }

.post-content h2,
.post-content h3,
.post-content h4 {
  margin-top: 40px;
  margin-bottom: 20px;
  font-weight: 600;
  line-height: 1.25;
}

.post-content h2 {
  font-size: 1.5em;
  padding-bottom: .3em;
  border-bottom: 1px solid var(--color-border);
}

.post-content h3 { font-size: 1.25em; }
.post-content h4 { font-size: 1em; }

.post-content code {
  padding: .2em .4em;
  margin: 0;
  font-size: 85%;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
  white-space: break-spaces;
  background-color: var(--color-code-inline-bg);
  border-radius: 6px;
}

.post-content pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  color: var(--color-text);
  background-color: var(--color-code-bg);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  margin: 0 0 20px 0;
}

.post-content pre code {
  display: inline;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background: transparent;
  border: 0;
  font-size: 100%;
  white-space: pre;
  border-radius: 0;
}

.post-content blockquote {
  margin: 0 0 16px 0;
  padding: 0 1em;
  color: var(--color-blockquote);
  border-left: .25em solid var(--color-border);
}

.post-content blockquote p:last-child { margin-bottom: 0; }

.post-content ul,
.post-content ol {
  margin: 0 0 20px 0;
  padding-left: 2em;
}
.post-content li { margin: 0; padding: 0; }
.post-content li + li { margin-top: .25em; }
.post-content li > p { margin-top: 16px; }

.post-content hr {
  height: 1px;
  padding: 0;
  margin: 40px 0;
  background-color: var(--color-border);
  border: 0;
}

.post-content table {
  border-spacing: 0;
  border-collapse: collapse;
  display: block;
  width: max-content;
  max-width: 100%;
  overflow: auto;
  margin-bottom: 16px;
  font-size: 14px;
}
.post-content table th { font-weight: 600; }
.post-content table th,
.post-content table td {
  padding: 6px 13px;
  border: 1px solid var(--color-border);
}
.post-content table tr {
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-border);
}
.post-content table tr:nth-child(2n) { background-color: var(--color-table-alt); }

.post-content strong { font-weight: 600; }

.post-content img { max-width: 100%; height: auto; }

/* ===== Anchor links on headings ===== */

.post-content h2[id] a.anchor-link,
.post-content h3[id] a.anchor-link,
.post-content h4[id] a.anchor-link,
.post-content h5[id] a.anchor-link {
  margin-left: .3em;
  color: var(--color-secondary);
  text-decoration: none;
  opacity: 0;
  transition: opacity 0.15s;
}

.post-content h2[id]:hover a.anchor-link,
.post-content h3[id]:hover a.anchor-link,
.post-content h4[id]:hover a.anchor-link,
.post-content h5[id]:hover a.anchor-link {
  opacity: 1;
}

/* ===== Index page sections ===== */

section.posts {
  margin: 0 0 30px;
}

section.posts h3 { margin: 30px 0 5px 0; font-size: 1.25rem; }

section.posts ul {
  list-style: none;
  margin: 15px 0 0 0;
  padding: 0;
}

section.posts li {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
}

section.posts li h4 { margin: 0; font-size: 1rem; }
section.posts li h4 a { color: var(--color-text); }
section.posts li h4 a:hover { color: var(--color-accent); }

/* ===== Mobile ===== */

@media only screen and (max-width: 600px) {
  .post-title { font-size: 28px; margin-top: 10px; margin-bottom: 5px; }
  .post-content { font-size: 16px; }
  .post-content h2 { font-size: 1.3em; }
  .navbar { gap: 0.5rem; }
}
```

- [ ] **Step 2: Type-check (sanity)**

Run: `npm run check`
Expected: 0 errors. (Build will fail later until BaseLayout/PostLayout are updated to match new class names — that's Task 3 onward. CSS rewrite by itself doesn't break check.)

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(style): rewrite global.css with nesbitt.io tokens and typography"
```

---

## Task 3: Rewrite BaseLayout — container, brand+nav header, flex footer, anchor-link script

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (full rewrite)

- [ ] **Step 1: Replace `src/layouts/BaseLayout.astro` entirely**

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
  lang?: string;
  /** When set to a known language, that nav link is marked aria-current. */
  activeLang?: 'ko' | 'ja' | 'en' | null;
  /** Footer source path relative to repo root, used on post pages. */
  sourcePath?: string | null;
}

const {
  title,
  description = 'crowdy blog',
  lang = 'ko',
  activeLang = null,
  sourcePath = null,
} = Astro.props;
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const repoUrl = 'https://github.com/crowdy/tkim-blog';
const sourceUrl = sourcePath ? `${repoUrl}/blob/main/${sourcePath}` : null;

const ariaForLang = (l: 'ko' | 'ja' | 'en') => (activeLang === l ? 'page' : undefined);
---

<!DOCTYPE html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
    />
    <link rel="alternate" type="application/rss+xml" title="crowdy blog" href={`${base}/rss.xml`} />
    <script is:inline>
      (() => {
        const stored = localStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') {
          document.documentElement.setAttribute('data-theme', stored);
        }
      })();
    </script>
  </head>
  <body>
    <div class="container">
      <nav class="navbar" aria-label="Site">
        <a class="brand" href={`${base}/`}>crowdy</a>
        <ul class="nav-icons">
          <li class="lang-nav">
            <a href={`${base}/ko/`} aria-current={ariaForLang('ko')}>KO</a>
            <span class="sep">·</span>
            <a href={`${base}/ja/`} aria-current={ariaForLang('ja')}>JA</a>
            <span class="sep">·</span>
            <a href={`${base}/en/`} aria-current={ariaForLang('en')}>EN</a>
          </li>
          <li>
            <a href={`${base}/rss.xml`} aria-label="RSS feed">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm1.5 2.5c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1 0-2m0 4a6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1 0-2m.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/></svg>
            </a>
          </li>
          <li>
            <a href={repoUrl} aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>
            </a>
          </li>
          <li>
            <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>
            </button>
          </li>
        </ul>
      </nav>

      <main aria-label="Content">
        <slot />
      </main>

      <footer class="site-footer">
        <span class="footer-nav">
          <a href={repoUrl}>GitHub</a> ·
          <a href={`${base}/rss.xml`}>RSS</a>
        </span>
        {sourceUrl && (
          <span class="footer-source">
            <a href={sourceUrl}>View source</a>
          </span>
        )}
      </footer>
    </div>

    <script is:inline>
      (function () {
        const btn = document.getElementById('theme-toggle');
        const moon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>';
        const sun = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M3.757 4.464a.5.5 0 0 1-.707 0L1.636 3.05a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707"/></svg>';
        function isDark() {
          const t = document.documentElement.getAttribute('data-theme');
          if (t) return t === 'dark';
          return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        function updateIcon() { if (btn) btn.innerHTML = isDark() ? sun : moon; }
        updateIcon();
        if (btn) {
          btn.addEventListener('click', function () {
            const next = isDark() ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateIcon();
          });
        }
        document.querySelectorAll('.post-content h2[id], .post-content h3[id], .post-content h4[id], .post-content h5[id]').forEach(function (h) {
          const a = document.createElement('a');
          a.className = 'anchor-link';
          a.href = '#' + h.id;
          a.textContent = '#';
          h.appendChild(a);
        });
      })();
    </script>
  </body>
</html>
```

- [ ] **Step 2: Type-check**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 3: Commit (don't build yet — PostLayout still uses old shape)**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat(layout): nesbitt-style header, footer, and anchor-link script"
```

---

## Task 4: Update PostLayout for new structure + sourcePath

**Files:**
- Modify: `src/layouts/PostLayout.astro`

- [ ] **Step 1: Replace `src/layouts/PostLayout.astro`**

```astro
---
import BaseLayout from './BaseLayout.astro';
import LangToggle from '../components/LangToggle.astro';
import { getCollection } from 'astro:content';
import { getPairs } from '../utils/pairs';
import type { CollectionEntry } from 'astro:content';

interface Props {
  post: CollectionEntry<'posts'>;
}

const { post } = Astro.props;
const all = await getCollection('posts');
const pairs = getPairs(all, post);
const dateStr = post.data.pubDate.toISOString().slice(0, 10);
const sourcePath = `src/content/posts/${post.id}`;
---

<BaseLayout
  title={post.data.title}
  description={post.data.description}
  lang={post.data.lang}
  activeLang={post.data.lang}
  sourcePath={sourcePath}
>
  <article class="post">
    <header class="post-header">
      <h1 class="post-title">{post.data.title}</h1>
      <p class="post-meta">
        <time datetime={post.data.pubDate.toISOString()}>{dateStr}</time>
        {post.data.draft && <span> · draft</span>}
      </p>
      <LangToggle current={post} pairs={pairs} />
    </header>
    <div class="post-content">
      <slot />
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 2: Type-check**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/PostLayout.astro
git commit -m "feat(layout): post-header structure with View source"
```

---

## Task 5: Flatten PostCard

**Files:**
- Modify: `src/components/PostCard.astro`

- [ ] **Step 1: Replace `src/components/PostCard.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';
import { postSlug } from '../utils/pairs';

interface Props {
  post: CollectionEntry<'posts'>;
  hasTranslation?: boolean;
}

const { post, hasTranslation = false } = Astro.props;
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const slug = postSlug(post);
const dateStr = post.data.pubDate.toISOString().slice(0, 10);
---

<li>
  <h4><a href={`${base}/${post.data.lang}/${slug}/`}>{post.data.title}</a></h4>
  <p class="post-meta">
    <time datetime={post.data.pubDate.toISOString()}>{dateStr}</time>
    {post.data.draft && <span> · draft</span>}
    {hasTranslation && <span> · 翻訳あり</span>}
  </p>
  <p class="post-description">{post.data.description}</p>
</li>
```

- [ ] **Step 2: Type-check**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/PostCard.astro
git commit -m "feat(component): flatten PostCard for nesbitt-style list"
```

---

## Task 6: LangToggle — pass through, no markup change

LangToggle's existing markup (button + active state) already works with the new `.lang-toggle` CSS rules. No code change needed; just verify.

**Files:**
- Read-only: `src/components/LangToggle.astro`

- [ ] **Step 1: Confirm existing component still uses `lang-toggle` class**

Run: `grep -n 'lang-toggle' src/components/LangToggle.astro`
Expected: matches `class="lang-toggle"`. (No change needed.)

- [ ] **Step 2: Skip — no commit**

---

## Task 7: Lang index pages — intro + section.posts

**Files:**
- Modify: `src/pages/[lang]/index.astro`

- [ ] **Step 1: Replace `src/pages/[lang]/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  return (['ko', 'ja', 'en'] as const).map((lang) => ({ params: { lang } }));
}

const { lang } = Astro.params as { lang: 'ko' | 'ja' | 'en' };

const intros: Record<'ko' | 'ja' | 'en', string> = {
  ko: 'Tonghyun Kim의 기술 블로그 — 한국어 글 모음',
  ja: 'Tonghyun Kim の技術ブログ — 日本語の記事',
  en: "Tonghyun Kim's tech blog — English posts",
};

const headings: Record<'ko' | 'ja' | 'en', string> = {
  ko: '글 목록',
  ja: '記事一覧',
  en: 'Posts',
};

const all = await getCollection('posts');
const isProd = !import.meta.env.DEV;
const posts = all
  .filter((p: CollectionEntry<'posts'>) => p.data.lang === lang)
  .filter((p: CollectionEntry<'posts'>) => !(isProd && p.data.draft))
  .sort(
    (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) =>
      b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

const pairSlugsWithOtherLangs = new Set(
  all
    .filter((p: CollectionEntry<'posts'>) => p.data.lang !== lang)
    .map((p: CollectionEntry<'posts'>) => p.data.pairSlug)
);
---

<BaseLayout title={`crowdy — ${lang}`} lang={lang} activeLang={lang}>
  <p>{intros[lang]}</p>
  <hr />
  <section class="posts">
    <h3>{headings[lang]}</h3>
    {posts.length === 0 ? (
      <p>No posts yet.</p>
    ) : (
      <ul>
        {posts.map((p) => (
          <PostCard post={p} hasTranslation={pairSlugsWithOtherLangs.has(p.data.pairSlug)} />
        ))}
      </ul>
    )}
  </section>
</BaseLayout>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: 28 pages. No errors.

- [ ] **Step 3: Spot-check ko index HTML**

Run: `grep -o 'class="post-meta"\|class="post-description"\|<section class="posts">\|<hr>' dist/ko/index.html | sort -u`
Expected: all four selectors present.

- [ ] **Step 4: Commit**

```bash
git add src/pages/[lang]/index.astro
git commit -m "feat(pages): nesbitt-style lang index with intro and section.posts"
```

---

## Task 8: Final smoke + tests + push

- [ ] **Step 1: Run unit tests**

Run: `npm test`
Expected: 24 tests pass (parsers + sync). (No new tests added; presentation only.)

- [ ] **Step 2: Type-check + build**

Run: `npm run check && npm run build`
Expected: 0 errors. 28 pages.

- [ ] **Step 3: Verify RSS**

Run: `head -30 dist/rss.xml`
Expected: valid `<rss>` document with channel + items.

- [ ] **Step 4: Verify post HTML structure**

Run: `grep -o 'class="post-header"\|class="post-content"\|class="navbar"\|class="site-footer"\|class="footer-source"\|border-top:2px' dist/ko/korea-ai-policy-review/index.html | sort -u`
Expected: at least `class="navbar"`, `class="site-footer"`, `class="post-header"`, `class="post-content"` (border-top inline applies via CSS, not necessarily in HTML).

- [ ] **Step 5: Verify View source link**

Run: `grep -o 'href="https://github.com/crowdy/tkim-blog/blob/main/src/content/posts/ko/[^"]*"' dist/ko/korea-ai-policy-review/index.html | head -1`
Expected: matches that URL.

- [ ] **Step 6: Push**

Run: `git push`
Expected: pushes 6+ new commits.

- [ ] **Step 7: Watch deploy and confirm live**

Run: `sleep 8 && RUN=$(gh run list --repo crowdy/tkim-blog --limit 1 --json databaseId --jq '.[0].databaseId') && gh run watch $RUN --repo crowdy/tkim-blog --exit-status | tail -5`
Expected: workflow concludes successfully.

Run: `curl -s -o /dev/null -w "%{http_code}\n" https://crowdy.github.io/tkim-blog/rss.xml`
Expected: 200.

Run: `curl -s https://crowdy.github.io/tkim-blog/ko/ | grep -c 'class="navbar"'`
Expected: 1 (header rendered).

---

## Self-Review Notes

**Spec coverage:**
- ✅ 900px container + accent top border: Task 2
- ✅ GitHub-style palette tokens: Task 2
- ✅ Pretendard preserved: Task 2 / Task 3 (BaseLayout link)
- ✅ Header pattern (brand + lang nav + RSS/GitHub/theme): Task 3
- ✅ Footer flex with View source: Task 3 + Task 4
- ✅ Post layout simplified: Task 4
- ✅ Post-content typography (h2 underline, GitHub code, blockquote, etc.): Task 2
- ✅ Anchor links: Task 2 (CSS) + Task 3 (script)
- ✅ Flat PostCard: Task 5
- ✅ Lang index intro + section.posts: Task 7
- ✅ RSS feed: Task 1
- ✅ First H1 inside post-content hidden: Task 2 CSS rule

**Type consistency:**
- `activeLang: 'ko' | 'ja' | 'en' | null` defined in BaseLayout Props, passed from PostLayout and `[lang]/index.astro`.
- `sourcePath: string | null` defined in BaseLayout Props, passed from PostLayout only.
- `postSlug` already imported by PostCard from `../utils/pairs` — same as before.

**No placeholders:** all CSS, markup, and TS shown in full.
