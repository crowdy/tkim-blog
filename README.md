# crowdy-blog

Personal blog at https://crowdy.github.io/crowdy-blog/

Built with Astro. Source markdown lives at `~/dev/crowdy/blog/` and is synced into `src/content/posts/<lang>/` by a local script.

## Workflow

```bash
# 1. Edit/add markdown in ~/dev/crowdy/blog/
# 2. Sync into the repo
npm run sync

# 3. Preview locally
npm run dev

# 4. Commit + push to deploy
git add src/content/posts
git commit -m "post: <slug>"
git push
```

GitHub Actions builds and deploys on push to `main`.

## Conventions

- Filename: `<slug>.md` for the primary version, `<slug>-ja.md` for Japanese pair.
- Body must start with `# Title`.
- Optional `> blockquote` after title is used as the description.
- Files under `~/dev/crowdy/blog/draft/` produce `draft: true` posts (visible in `npm run dev`, hidden in production).

## Languages

- ko, ja, en
- Heuristic: `-ja` suffix → ja; otherwise Hangul ratio ≥ 30% → ko, Kana ratio ≥ 30% → ja, else en.
- Code fences are stripped before language detection so prose-mostly-Korean posts with heavy code blocks still classify as `ko`.

## Override source dir

```bash
CROWDY_BLOG_SOURCE=/some/path npm run sync
```

## Tests

```bash
npm test
```

## First-time GitHub setup

1. Create the GitHub repo `crowdy/crowdy-blog` (empty, no README/license).
2. `git remote add origin git@github.com:crowdy/crowdy-blog.git`
3. `git push -u origin main`
4. In repo Settings → Pages → Source: GitHub Actions.
5. Wait for the deploy workflow to finish; visit `https://crowdy.github.io/crowdy-blog/`.
