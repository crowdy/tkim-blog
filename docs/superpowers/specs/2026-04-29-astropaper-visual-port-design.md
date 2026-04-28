# AstroPaper Visual Port — Design Spec

**Date:** 2026-04-29
**Approach:** Visual port — adopt AstroPaper's look without taking on its full architecture (Tailwind, frontmatter schema, search/tags/archive features).
**Font override:** Pretendard replaces AstroPaper's default IBM Plex / system fonts.

## Goal

Make the site look like AstroPaper (palette, typography weight, post-card hierarchy, header/footer treatment, dual-mode code highlighting) while keeping the existing multilingual structure, sync script, pair toggle, and frontmatter shape.

## Out of Scope

- Tailwind (we stay on vanilla CSS)
- AstroPaper-specific features that need source data we don't have: tags, archive, featured posts, search (Pagefind / Fuse), RSS, OG image generation, breadcrumbs
- Frontmatter schema changes (`pubDate` stays; we don't add `pubDatetime`/`tags`/`featured`)

## Visual Tokens (light / dark)

Adopted from the canonical AstroPaper "AstroPaper" theme palette:

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#fdfdfd` | `#212737` |
| `--fg` | `#282728` | `#eaedf3` |
| `--muted` | `#5b5b5b` | `#a0a8b8` |
| `--accent` | `#006cac` | `#ff6b35` |
| `--card` | `#f5f5f4` | `#1d293b` |
| `--card-muted` | `#e7e5e4` | `#313e51` |
| `--border` | `#ece9e9` | `#2a3140` |

Dark mode applies via `[data-theme='dark']` (explicit) and `prefers-color-scheme: dark` (when no override) — same logic as today.

## Typography

- **Font stack:** `Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- **Font load:** Pretendard Variable from jsDelivr (`https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css`) via `<link>` in `<head>`
- **Body:** 18px / line-height 1.75 (was 16/1.7)
- **Article body:** 19px on the post page (improves long-form readability — AstroPaper hallmark)
- **Headings:** weight 700, tighter line-height
- **Measure:** 70ch (unchanged)

## Layout Updates

- **Header:** AstroPaper-style — brand on the left, nav on the right; bottom border; max-width matches body. Mobile: nav wraps below brand.
- **PostCard:** Larger heading (1.4rem), accent-colored hover, meta beneath in muted color, description in regular weight; spacing 2rem between cards.
- **Article:** Title block followed by date+lang-toggle row, then content. Subheadings get top-margin 2.5rem (h2) / 2rem (h3).
- **Code blocks:** Astro Shiki dual theme — `github-light` for light mode, `github-dark` for dark — selected via CSS variable swap (`--shiki-default`/`--shiki-dark`).
- **Footer:** Subtle muted text, top border, repo link with accent color.

## Theme Toggle

- Replace ☼ / ☾ glyphs with stroke-style SVG icons matching AstroPaper (sun rays / crescent moon).
- Behavior unchanged.

## Files Touched

| File | Change |
|---|---|
| `src/styles/global.css` | Rewrite with AstroPaper tokens + typography |
| `src/layouts/BaseLayout.astro` | Add Pretendard `<link>`, ensure `class="astro-code"` styles work with Shiki dual theme |
| `src/components/ThemeToggle.astro` | Swap glyphs for SVGs |
| `src/components/PostCard.astro` | Adjust class names if needed for new card style (likely no change) |
| `astro.config.mjs` | Configure Shiki dual theme: `markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, wrap: true } }` |

## Validation

- `npm run check` passes
- `npm run build` produces 27 pages, no warnings
- Live site renders with Pretendard (verified via DevTools or `curl` for `<link>`)
- Light/dark mode toggle works; preferred-color-scheme respected
- Code block in a post (e.g. one of the AI tools posts) renders with both themes available

## Risk / Notes

- Pretendard CDN dependency: jsDelivr is reliable; if blocked, system stack still renders. No self-host needed at this scale.
- Shiki dual-theme produces inline styles that toggle via CSS class — Astro 5 supports this natively.
- No content changes, no test changes.
