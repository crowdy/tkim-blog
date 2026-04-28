# crowdy-blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an Astro static blog deployed to GitHub Pages at `https://crowdy.github.io/crowdy-blog/`, ingesting markdown posts from `~/dev/crowdy/blog/` with multilingual (ko/ja/en) routing, language toggle for paired translations, dark mode, and auto-generated frontmatter via a local sync script.

**Architecture:** Local sync script reads markdown from `~/dev/crowdy/blog/{root,posted,draft/}`, parses title/description/lang, writes to `src/content/posts/<lang>/<slug>.md` with generated frontmatter. The synced content is committed. GitHub Actions builds Astro from committed content and deploys to Pages. Drafts are dev-only; pairs are matched by `pairSlug` (filename with `-ja` removed).

**Tech Stack:** Astro 5, TypeScript, Vitest, tsx, GitHub Actions, GitHub Pages, Shiki (code highlighting via Astro defaults), zod (Astro content collections schema).

**Spec:** `docs/superpowers/specs/2026-04-28-crowdy-blog-design.md`

---

## File Structure

Files created/modified across all tasks:

| File | Responsibility |
|---|---|
| `package.json` | npm scripts, dependencies |
| `tsconfig.json` | TypeScript config |
| `astro.config.mjs` | Astro site/base/output config |
| `.gitignore` | Exclude `node_modules`, `dist`, `.astro` |
| `.github/workflows/deploy.yml` | Build + deploy to GitHub Pages |
| `src/content/config.ts` | Zod schema for posts collection |
| `src/utils/pairs.ts` | Pair lookup helper |
| `src/layouts/BaseLayout.astro` | HTML shell, head, theme bootstrap |
| `src/layouts/PostLayout.astro` | Post page wrapper |
| `src/components/LangToggle.astro` | Language switcher |
| `src/components/PostCard.astro` | List item |
| `src/components/ThemeToggle.astro` | Dark mode toggle |
| `src/styles/global.css` | Minimal styles + theme tokens |
| `src/pages/index.astro` | Redirect to `/ko/` |
| `src/pages/[lang]/index.astro` | Per-lang index |
| `src/pages/[lang]/[slug].astro` | Post detail |
| `src/pages/404.astro` | 404 page |
| `scripts/sync-posts.ts` | Sync source markdown to content collection |
| `scripts/lib/parse.ts` | Pure functions for parsing (testable) |
| `tests/parse.test.ts` | Unit tests for parsers |
| `tests/sync.test.ts` | Integration test for sync |
| `tests/fixtures/*.md` | Sample markdown for tests |
| `README.md` | Quick start, sync flow, deploy |

---

## Task 1: Initialize Astro project skeleton

**Files:**
- Create: `package.json`, `tsconfig.json`, `astro.config.mjs`, `.gitignore`, `src/env.d.ts`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "crowdy-blog",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "sync": "tsx scripts/sync-posts.ts",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "astro": "^5.0.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "@types/node": "^22.0.0",
    "tsx": "^4.19.0",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": ["src", "scripts", "tests", ".astro/types.d.ts"],
  "exclude": ["dist"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "~/*": ["src/*"] }
  }
}
```

- [ ] **Step 3: Write `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://crowdy.github.io',
  base: '/crowdy-blog',
  output: 'static',
  trailingSlash: 'ignore',
});
```

- [ ] **Step 4: Write `.gitignore`**

```
node_modules
dist
.astro
.DS_Store
*.log
.env
.env.*
!.env.example
```

- [ ] **Step 5: Write `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />
```

- [ ] **Step 6: Install dependencies and verify**

Run: `npm install`
Expected: installs successfully, creates `package-lock.json`.

Run: `npx astro --version`
Expected: prints Astro version.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json tsconfig.json astro.config.mjs .gitignore src/env.d.ts
git commit -m "chore: initialize Astro project skeleton"
```

---

## Task 2: Pure parser functions with unit tests (TDD)

These are the pure functions used by the sync script. They are written first, test-driven, in a separate module so the test surface is clean.

**Files:**
- Create: `scripts/lib/parse.ts`
- Create: `tests/parse.test.ts`
- Create: `tests/fixtures/sample-ko.md`, `sample-ja.md`, `sample-en.md`, `no-title.md`, `with-blockquote.md`

- [ ] **Step 1: Create test fixtures**

`tests/fixtures/sample-ko.md`:
```markdown
# 한국어 제목입니다

> 짧은 인용 설명입니다.

본문 내용은 여기서 시작됩니다.
```

`tests/fixtures/sample-ja.md`:
```markdown
# 日本語のタイトル

> 短い引用文の説明です。

本文の内容はここから始まります。
```

`tests/fixtures/sample-en.md`:
```markdown
# An English Title

> A short blockquote serving as the lede.

Body content begins here in English prose.
```

`tests/fixtures/no-title.md`:
```markdown
This file has no heading at the top.
Just paragraphs.
```

`tests/fixtures/with-blockquote.md`:
```markdown
# Title Here

> First line of blockquote.
> Second line continues.

Body paragraph follows.
```

- [ ] **Step 2: Write failing tests for `parseFilename`**

`tests/parse.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { parseFilename } from '../scripts/lib/parse';

describe('parseFilename', () => {
  it('returns base slug and ja for -ja suffix', () => {
    expect(parseFilename('korea-ai-policy-review-ja.md')).toEqual({
      baseSlug: 'korea-ai-policy-review',
      explicitLang: 'ja',
    });
  });

  it('returns base slug with no explicit lang when no suffix', () => {
    expect(parseFilename('korea-ai-policy-review.md')).toEqual({
      baseSlug: 'korea-ai-policy-review',
      explicitLang: null,
    });
  });

  it('strips multiple dots and only .md extension', () => {
    expect(parseFilename('multimedia-search-ai-system-2.md')).toEqual({
      baseSlug: 'multimedia-search-ai-system-2',
      explicitLang: null,
    });
  });

  it('handles -ja with numeric tail correctly', () => {
    expect(parseFilename('multimedia-search-ai-system-ja-2.md')).toEqual({
      baseSlug: 'multimedia-search-ai-system-2',
      explicitLang: 'ja',
    });
  });
});
```

- [ ] **Step 3: Run tests, verify they fail**

Run: `npm test`
Expected: FAIL — `parseFilename` not exported.

- [ ] **Step 4: Implement `parseFilename`**

`scripts/lib/parse.ts`:
```ts
export type Lang = 'ko' | 'ja' | 'en';

export interface ParsedFilename {
  baseSlug: string;
  explicitLang: 'ja' | null;
}

export function parseFilename(filename: string): ParsedFilename {
  const stem = filename.replace(/\.md$/i, '');
  const jaMatch = stem.match(/^(.*)-ja(-\d+)?$/);
  if (jaMatch) {
    const [, head, tail] = jaMatch;
    return {
      baseSlug: tail ? `${head}${tail}` : head,
      explicitLang: 'ja',
    };
  }
  return { baseSlug: stem, explicitLang: null };
}
```

- [ ] **Step 5: Run tests, verify pass**

Run: `npm test -- parseFilename`
Expected: 4 tests pass.

- [ ] **Step 6: Write failing tests for `extractTitle`**

Append to `tests/parse.test.ts`:
```ts
import { extractTitle } from '../scripts/lib/parse';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const FIXTURES = join(__dirname, 'fixtures');
const read = (name: string) => readFileSync(join(FIXTURES, name), 'utf8');

describe('extractTitle', () => {
  it('returns first H1 line', () => {
    expect(extractTitle(read('sample-ko.md'))).toBe('한국어 제목입니다');
  });

  it('returns null when no H1 present', () => {
    expect(extractTitle(read('no-title.md'))).toBeNull();
  });

  it('ignores leading whitespace before H1', () => {
    expect(extractTitle('\n\n# Hello\n\nbody')).toBe('Hello');
  });

  it('does not match H2 or deeper', () => {
    expect(extractTitle('## Subheading\n\nbody')).toBeNull();
  });
});
```

- [ ] **Step 7: Run, fail, implement `extractTitle`**

Run: `npm test -- extractTitle` → fail.

Append to `scripts/lib/parse.ts`:
```ts
export function extractTitle(markdown: string): string | null {
  const lines = markdown.split('\n');
  for (const line of lines) {
    const match = line.match(/^#\s+(.+?)\s*$/);
    if (match) return match[1].trim();
    if (/^#{2,}\s/.test(line)) return null;
  }
  return null;
}
```

Run: `npm test -- extractTitle` → pass.

- [ ] **Step 8: Write failing tests for `extractDescription`**

Append:
```ts
import { extractDescription } from '../scripts/lib/parse';

describe('extractDescription', () => {
  it('uses first blockquote when present', () => {
    expect(extractDescription(read('sample-ko.md'))).toBe('짧은 인용 설명입니다.');
  });

  it('joins multi-line blockquote with space', () => {
    expect(extractDescription(read('with-blockquote.md'))).toBe(
      'First line of blockquote. Second line continues.'
    );
  });

  it('falls back to first paragraph when no blockquote', () => {
    expect(extractDescription(read('no-title.md'))).toMatch(/^This file has no heading/);
  });

  it('truncates to 200 chars with ellipsis', () => {
    const long = '# T\n\n' + 'a'.repeat(500);
    const result = extractDescription(long);
    expect(result.length).toBeLessThanOrEqual(201);
    expect(result.endsWith('…')).toBe(true);
  });
});
```

- [ ] **Step 9: Run, fail, implement `extractDescription`**

Run: `npm test -- extractDescription` → fail.

Append to `scripts/lib/parse.ts`:
```ts
export function extractDescription(markdown: string): string {
  const lines = markdown.split('\n');
  let i = 0;
  while (i < lines.length && (lines[i].trim() === '' || /^#\s/.test(lines[i]))) i++;

  if (i < lines.length && lines[i].startsWith('>')) {
    const quoteLines: string[] = [];
    while (i < lines.length && lines[i].startsWith('>')) {
      quoteLines.push(lines[i].replace(/^>\s?/, '').trim());
      i++;
    }
    return truncate(quoteLines.filter(Boolean).join(' '));
  }

  const paraLines: string[] = [];
  while (i < lines.length && lines[i].trim() !== '') {
    paraLines.push(lines[i].trim());
    i++;
  }
  return truncate(paraLines.join(' '));
}

function truncate(s: string, max = 200): string {
  if (s.length <= max) return s;
  return s.slice(0, max).trimEnd() + '…';
}
```

Run: `npm test -- extractDescription` → pass.

- [ ] **Step 10: Write failing tests for `detectLanguage`**

Append:
```ts
import { detectLanguage } from '../scripts/lib/parse';

describe('detectLanguage', () => {
  it('detects ko when Hangul ratio >= 30%', () => {
    expect(detectLanguage(read('sample-ko.md'))).toBe('ko');
  });

  it('detects ja when Kana ratio >= 30%', () => {
    expect(detectLanguage(read('sample-ja.md'))).toBe('ja');
  });

  it('detects en for ASCII-only content', () => {
    expect(detectLanguage(read('sample-en.md'))).toBe('en');
  });

  it('returns en when content is empty or unclassifiable', () => {
    expect(detectLanguage('')).toBe('en');
    expect(detectLanguage('123 456 789')).toBe('en');
  });
});
```

- [ ] **Step 11: Run, fail, implement `detectLanguage`**

Run: `npm test -- detectLanguage` → fail.

Append to `scripts/lib/parse.ts`:
```ts
export function detectLanguage(content: string): Lang {
  const stripped = content.replace(/\s+/g, '');
  if (stripped.length === 0) return 'en';

  let hangul = 0;
  let kana = 0;
  for (const ch of stripped) {
    const cp = ch.codePointAt(0)!;
    if ((cp >= 0xac00 && cp <= 0xd7a3) || (cp >= 0x1100 && cp <= 0x11ff) || (cp >= 0x3130 && cp <= 0x318f)) {
      hangul++;
    } else if ((cp >= 0x3040 && cp <= 0x309f) || (cp >= 0x30a0 && cp <= 0x30ff)) {
      kana++;
    }
  }

  const total = stripped.length;
  if (hangul / total >= 0.3) return 'ko';
  if (kana / total >= 0.3) return 'ja';
  return 'en';
}
```

Run: `npm test -- detectLanguage` → pass.

- [ ] **Step 12: Run full test suite to confirm no regressions**

Run: `npm test`
Expected: all tests pass (parseFilename × 4, extractTitle × 4, extractDescription × 4, detectLanguage × 4).

- [ ] **Step 13: Commit**

```bash
git add scripts/lib/parse.ts tests/parse.test.ts tests/fixtures/
git commit -m "feat: add tested parser utilities for sync script"
```

---

## Task 3: Sync script — discovery, transformation, write

Builds on parsers from Task 2.

**Files:**
- Create: `scripts/sync-posts.ts`
- Create: `tests/sync.test.ts`
- Create: more fixtures under `tests/fixtures/source-tree/`

- [ ] **Step 1: Create source-tree fixture**

```bash
mkdir -p tests/fixtures/source-tree/posted tests/fixtures/source-tree/draft
```

Write `tests/fixtures/source-tree/foo.md`:
```markdown
# Foo Title

> Foo lede.

Foo body.
```

Write `tests/fixtures/source-tree/foo-ja.md`:
```markdown
# Fooの日本語タイトル

> Fooの日本語の引用です。

本文。
```

Write `tests/fixtures/source-tree/posted/bar.md`:
```markdown
# Bar Title

Bar body, no blockquote.
```

Write `tests/fixtures/source-tree/draft/baz.md`:
```markdown
# Baz Title

Draft body.
```

- [ ] **Step 2: Write failing integration test for `sync()`**

`tests/sync.test.ts`:
```ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { sync } from '../scripts/sync-posts';

const FIXTURES = join(__dirname, 'fixtures', 'source-tree');

describe('sync', () => {
  let outDir: string;

  beforeEach(() => {
    outDir = mkdtempSync(join(tmpdir(), 'crowdy-sync-'));
  });

  afterEach(() => {
    rmSync(outDir, { recursive: true, force: true });
  });

  it('writes posts under correct lang directories', async () => {
    await sync({ sourceDir: FIXTURES, outDir });

    expect(existsSync(join(outDir, 'en', 'foo.md'))).toBe(true);
    expect(existsSync(join(outDir, 'ja', 'foo.md'))).toBe(true);
    expect(existsSync(join(outDir, 'en', 'bar.md'))).toBe(true);
    expect(existsSync(join(outDir, 'en', 'baz.md'))).toBe(true);
  });

  it('generates frontmatter with title, description, lang, pairSlug, draft, sourceDir', async () => {
    await sync({ sourceDir: FIXTURES, outDir });

    const foo = readFileSync(join(outDir, 'en', 'foo.md'), 'utf8');
    expect(foo).toMatch(/^---\n/);
    expect(foo).toMatch(/title: ['"]Foo Title['"]/);
    expect(foo).toMatch(/description: ['"]Foo lede\.['"]/);
    expect(foo).toMatch(/lang: ['"]?en['"]?/);
    expect(foo).toMatch(/pairSlug: ['"]foo['"]/);
    expect(foo).toMatch(/draft: false/);
    expect(foo).toMatch(/sourceDir: ['"]?root['"]?/);

    const baz = readFileSync(join(outDir, 'en', 'baz.md'), 'utf8');
    expect(baz).toMatch(/draft: true/);
    expect(baz).toMatch(/sourceDir: ['"]?draft['"]?/);
  });

  it('strips dotfiles and .swp', async () => {
    const dirty = mkdtempSync(join(tmpdir(), 'crowdy-dirty-'));
    writeFileSync(join(dirty, 'real.md'), '# Real\n\nbody');
    writeFileSync(join(dirty, '.hidden.md'), '# Hidden\n\nbody');
    writeFileSync(join(dirty, '.real.md.swp'), 'binary garbage');
    mkdirSync(join(dirty, '.claude'));
    writeFileSync(join(dirty, '.claude', 'note.md'), '# Note');

    await sync({ sourceDir: dirty, outDir });

    expect(existsSync(join(outDir, 'en', 'real.md'))).toBe(true);
    expect(existsSync(join(outDir, 'en', 'hidden.md'))).toBe(false);
    expect(existsSync(join(outDir, 'en', 'note.md'))).toBe(false);

    rmSync(dirty, { recursive: true, force: true });
  });

  it('exits with error on slug collision in same lang', async () => {
    const dup = mkdtempSync(join(tmpdir(), 'crowdy-dup-'));
    writeFileSync(join(dup, 'x.md'), '# X1\n\nbody');
    mkdirSync(join(dup, 'posted'));
    writeFileSync(join(dup, 'posted', 'x.md'), '# X2\n\nbody');

    await expect(sync({ sourceDir: dup, outDir })).rejects.toThrow(/collision/i);
    rmSync(dup, { recursive: true, force: true });
  });

  it('wipes outDir before writing (no orphans)', async () => {
    mkdirSync(join(outDir, 'en'), { recursive: true });
    writeFileSync(join(outDir, 'en', 'orphan.md'), '---\n---\n');

    await sync({ sourceDir: FIXTURES, outDir });

    expect(existsSync(join(outDir, 'en', 'orphan.md'))).toBe(false);
  });
});
```

- [ ] **Step 3: Run, verify fail**

Run: `npm test -- sync`
Expected: FAIL — `sync` not exported.

- [ ] **Step 4: Implement `sync`**

`scripts/sync-posts.ts`:
```ts
import { readdir, readFile, writeFile, mkdir, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseFilename,
  extractTitle,
  extractDescription,
  detectLanguage,
  type Lang,
} from './lib/parse.js';

interface SyncOptions {
  sourceDir: string;
  outDir: string;
  verbose?: boolean;
}

interface PostMeta {
  outPath: string;
  body: string;
  title: string;
  description: string;
  lang: Lang;
  pairSlug: string;
  draft: boolean;
  sourceDir: 'root' | 'posted' | 'draft';
  pubDate: Date;
  warnings: string[];
}

const IGNORE_DIRS = new Set(['.claude', 'node_modules', '.git']);

async function* walk(dir: string, root: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    if (IGNORE_DIRS.has(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(full, root);
    } else if (e.isFile() && e.name.endsWith('.md')) {
      yield full;
    }
  }
}

function classifySourceDir(rel: string): 'root' | 'posted' | 'draft' {
  const top = rel.split('/')[0];
  if (top === 'posted') return 'posted';
  if (top === 'draft') return 'draft';
  return 'root';
}

function humanize(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function escapeYaml(s: string): string {
  return `'${s.replace(/'/g, "''")}'`;
}

function buildFrontmatter(meta: PostMeta): string {
  return [
    '---',
    `title: ${escapeYaml(meta.title)}`,
    `description: ${escapeYaml(meta.description)}`,
    `pubDate: ${meta.pubDate.toISOString()}`,
    `lang: ${meta.lang}`,
    `pairSlug: ${escapeYaml(meta.pairSlug)}`,
    `draft: ${meta.draft}`,
    `sourceDir: ${meta.sourceDir}`,
    '---',
    '',
  ].join('\n');
}

export async function sync(opts: SyncOptions): Promise<{ synced: number; skipped: number; warnings: number }> {
  if (existsSync(opts.outDir)) {
    await rm(opts.outDir, { recursive: true, force: true });
  }
  await mkdir(opts.outDir, { recursive: true });

  const collected: PostMeta[] = [];
  let skipped = 0;
  let warnings = 0;

  for await (const filepath of walk(opts.sourceDir, opts.sourceDir)) {
    const rel = relative(opts.sourceDir, filepath);
    const filename = rel.split('/').pop()!;
    const content = await readFile(filepath, 'utf8');

    if (content.trim() === '') {
      console.warn(`skip: empty file ${rel}`);
      skipped++;
      continue;
    }

    const { baseSlug, explicitLang } = parseFilename(filename);
    const lang: Lang = explicitLang ?? detectLanguage(content);
    const titleRaw = extractTitle(content);
    const fileWarnings: string[] = [];
    const title = titleRaw ?? (() => {
      fileWarnings.push(`no H1 in ${rel}; using filename`);
      return humanize(baseSlug);
    })();
    const description = extractDescription(content) || title;
    const sourceDir = classifySourceDir(rel);
    const stats = await stat(filepath);

    collected.push({
      outPath: join(opts.outDir, lang, `${baseSlug}.md`),
      body: content,
      title,
      description,
      lang,
      pairSlug: baseSlug,
      draft: sourceDir === 'draft',
      sourceDir,
      pubDate: stats.mtime,
      warnings: fileWarnings,
    });
    warnings += fileWarnings.length;
  }

  // Collision detection
  const byPath = new Map<string, PostMeta[]>();
  for (const post of collected) {
    const arr = byPath.get(post.outPath) ?? [];
    arr.push(post);
    byPath.set(post.outPath, arr);
  }
  const collisions = [...byPath.entries()].filter(([, posts]) => posts.length > 1);
  if (collisions.length > 0) {
    const lines = collisions.map(([out, posts]) => `  ${out}\n${posts.map(p => `    ← ${p.sourceDir}/${p.pairSlug}`).join('\n')}`);
    throw new Error(`Slug collision detected:\n${lines.join('\n')}`);
  }

  // Write all
  for (const post of collected) {
    await mkdir(dirname(post.outPath), { recursive: true });
    await writeFile(post.outPath, buildFrontmatter(post) + post.body);
    for (const w of post.warnings) console.warn(`warn: ${w}`);
  }

  if (opts.verbose !== false) {
    console.log(`synced: ${collected.length} | skipped: ${skipped} | warnings: ${warnings}`);
  }
  return { synced: collected.length, skipped, warnings };
}

// CLI entry
const isDirectRun = import.meta.url === `file://${process.argv[1]}`;
if (isDirectRun) {
  const HOME = process.env.HOME ?? '';
  const sourceDir = process.env.CROWDY_BLOG_SOURCE ?? join(HOME, 'dev/crowdy/blog');
  const here = dirname(fileURLToPath(import.meta.url));
  const outDir = join(here, '..', 'src', 'content', 'posts');
  sync({ sourceDir, outDir }).catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
```

- [ ] **Step 5: Run sync tests**

Run: `npm test -- sync`
Expected: all 5 sync tests pass.

- [ ] **Step 6: Run full test suite**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
git add scripts/sync-posts.ts tests/sync.test.ts tests/fixtures/source-tree
git commit -m "feat: implement sync-posts script with TDD"
```

---

## Task 4: Astro content collection schema

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 1: Write `src/content/config.ts`**

```ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    lang: z.enum(['ko', 'ja', 'en']),
    pairSlug: z.string(),
    draft: z.boolean().default(false),
    sourceDir: z.enum(['root', 'posted', 'draft']),
  }),
});

export const collections = { posts };
```

- [ ] **Step 2: Run sync against real source to populate content**

Run: `npm run sync`
Expected: prints `synced: <N> | skipped: <M> | warnings: <K>`. Creates files under `src/content/posts/{ko,ja,en}/`.

- [ ] **Step 3: Verify Astro picks up the schema**

Run: `npm run check`
Expected: no errors. (Astro generates `.astro/types.d.ts` for the collection.)

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts src/content/posts
git commit -m "feat: define posts collection schema and sync content"
```

---

## Task 5: Pair lookup utility

**Files:**
- Create: `src/utils/pairs.ts`

- [ ] **Step 1: Write `src/utils/pairs.ts`**

```ts
import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'posts'>;
type Lang = 'ko' | 'ja' | 'en';

export interface PairMap {
  ko?: Post;
  ja?: Post;
  en?: Post;
}

export function getPairs(allPosts: Post[], current: Post): PairMap {
  const map: PairMap = {};
  for (const p of allPosts) {
    if (p.data.pairSlug !== current.data.pairSlug) continue;
    if (p.id === current.id) continue;
    map[p.data.lang as Lang] = p;
  }
  return map;
}

export function postSlug(post: Post): string {
  // src/content/posts/<lang>/<slug>.md → <slug>
  const parts = post.id.split('/');
  return parts[parts.length - 1].replace(/\.md$/, '');
}
```

- [ ] **Step 2: Type-check**

Run: `npm run check`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/utils/pairs.ts
git commit -m "feat: add pair lookup utility"
```

---

## Task 6: Global styles + base layout + theme toggle

**Files:**
- Create: `src/styles/global.css`
- Create: `src/components/ThemeToggle.astro`
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write `src/styles/global.css`**

```css
:root {
  --bg: #ffffff;
  --fg: #1a1a1a;
  --muted: #666;
  --accent: #2563eb;
  --border: #e5e5e5;
  --code-bg: #f5f5f5;
  color-scheme: light;
}

:root[data-theme='dark'] {
  --bg: #0f1115;
  --fg: #e8e8e8;
  --muted: #999;
  --accent: #6ea8fe;
  --border: #2a2d33;
  --code-bg: #1a1d22;
  color-scheme: dark;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --bg: #0f1115;
    --fg: #e8e8e8;
    --muted: #999;
    --accent: #6ea8fe;
    --border: #2a2d33;
    --code-bg: #1a1d22;
    color-scheme: dark;
  }
}

* { box-sizing: border-box; }

html, body {
  background: var(--bg);
  color: var(--fg);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  line-height: 1.7;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

body {
  max-width: 70ch;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

header.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

header.site-header a.brand {
  font-weight: 700;
  color: var(--fg);
}

footer.site-footer {
  margin-top: 4rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.9rem;
}

article h1 { font-size: 2rem; line-height: 1.3; margin: 0 0 0.5rem; }
article h2 { margin-top: 2.5rem; }
article h3 { margin-top: 2rem; }

article time { color: var(--muted); font-size: 0.9rem; }

article pre {
  background: var(--code-bg);
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.9rem;
}

article code {
  background: var(--code-bg);
  padding: 0.1em 0.35em;
  border-radius: 4px;
  font-size: 0.92em;
}

article pre code { background: none; padding: 0; }

article blockquote {
  border-left: 3px solid var(--border);
  margin-left: 0;
  padding-left: 1rem;
  color: var(--muted);
}

button.theme-toggle, .lang-toggle button {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--fg);
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.lang-toggle { display: inline-flex; gap: 0.4rem; }
.lang-toggle button[aria-current='true'] {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
  cursor: default;
}

ul.post-list { list-style: none; padding: 0; }
ul.post-list li { margin-bottom: 1.5rem; }
ul.post-list h2 { font-size: 1.2rem; margin: 0 0 0.25rem; }
ul.post-list .post-card-meta { color: var(--muted); font-size: 0.85rem; }
```

- [ ] **Step 2: Write `src/components/ThemeToggle.astro`**

```astro
---
---
<button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
  <span class="theme-toggle-light">☼</span>
  <span class="theme-toggle-dark">☾</span>
</button>

<style>
  .theme-toggle-dark { display: none; }
  :global(:root[data-theme='dark']) .theme-toggle-light { display: none; }
  :global(:root[data-theme='dark']) .theme-toggle-dark { display: inline; }
  @media (prefers-color-scheme: dark) {
    :global(:root:not([data-theme='light'])) .theme-toggle-light { display: none; }
    :global(:root:not([data-theme='light'])) .theme-toggle-dark { display: inline; }
  }
</style>

<script is:inline>
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = current === 'dark' || (current === null && systemDark);
    const next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
</script>
```

- [ ] **Step 3: Write `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';
import ThemeToggle from '../components/ThemeToggle.astro';

interface Props {
  title: string;
  description?: string;
  lang?: string;
}

const { title, description = 'crowdy blog', lang = 'ko' } = Astro.props;
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
---

<!DOCTYPE html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title}</title>
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
    <header class="site-header">
      <a class="brand" href={`${base}/`}>crowdy</a>
      <nav>
        <a href={`${base}/ko/`}>KO</a> ·
        <a href={`${base}/ja/`}>JA</a> ·
        <a href={`${base}/en/`}>EN</a>
        &nbsp;<ThemeToggle />
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer class="site-footer">
      <p>© crowdy · <a href="https://github.com/crowdy/crowdy-blog">source</a></p>
    </footer>
  </body>
</html>
```

- [ ] **Step 4: Build to confirm no syntax errors**

Run: `npm run check`
Expected: passes (note: pages don't exist yet, but layout/component should type-check).

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css src/components/ThemeToggle.astro src/layouts/BaseLayout.astro
git commit -m "feat: add base layout, global styles, theme toggle"
```

---

## Task 7: LangToggle, PostCard, PostLayout

**Files:**
- Create: `src/components/LangToggle.astro`
- Create: `src/components/PostCard.astro`
- Create: `src/layouts/PostLayout.astro`

- [ ] **Step 1: Write `src/components/LangToggle.astro`**

```astro
---
import type { PairMap } from '../utils/pairs';
import { postSlug } from '../utils/pairs';
import type { CollectionEntry } from 'astro:content';

interface Props {
  current: CollectionEntry<'posts'>;
  pairs: PairMap;
}

const { current, pairs } = Astro.props;
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const langs: Array<'ko' | 'ja' | 'en'> = ['ko', 'ja', 'en'];
const available = langs.filter((l) => l === current.data.lang || pairs[l]);
const showToggle = available.length > 1;
---

{showToggle && (
  <nav class="lang-toggle" aria-label="Language">
    {langs.map((l) => {
      if (l === current.data.lang) {
        return <button aria-current="true">{l.toUpperCase()}</button>;
      }
      const sib = pairs[l];
      if (!sib) return null;
      const slug = postSlug(sib);
      return <a href={`${base}/${l}/${slug}/`}><button>{l.toUpperCase()}</button></a>;
    })}
  </nav>
)}
```

- [ ] **Step 2: Write `src/components/PostCard.astro`**

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
  <h2><a href={`${base}/${post.data.lang}/${slug}/`}>{post.data.title}</a></h2>
  <p class="post-card-meta">
    <time datetime={post.data.pubDate.toISOString()}>{dateStr}</time>
    {post.data.draft && <span> · draft</span>}
    {hasTranslation && <span> · 翻訳あり</span>}
  </p>
  <p>{post.data.description}</p>
</li>
```

- [ ] **Step 3: Write `src/layouts/PostLayout.astro`**

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
---

<BaseLayout title={post.data.title} description={post.data.description} lang={post.data.lang}>
  <article>
    <h1>{post.data.title}</h1>
    <p>
      <time datetime={post.data.pubDate.toISOString()}>{dateStr}</time>
      {post.data.draft && <span> · draft</span>}
    </p>
    <LangToggle current={post} pairs={pairs} />
    <slot />
  </article>
</BaseLayout>
```

- [ ] **Step 4: Type-check**

Run: `npm run check`
Expected: passes.

- [ ] **Step 5: Commit**

```bash
git add src/components/LangToggle.astro src/components/PostCard.astro src/layouts/PostLayout.astro
git commit -m "feat: add LangToggle, PostCard, PostLayout"
```

---

## Task 8: Pages — index, language list, post detail, 404

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/[lang]/index.astro`
- Create: `src/pages/[lang]/[slug].astro`
- Create: `src/pages/404.astro`

- [ ] **Step 1: Write `src/pages/index.astro`**

```astro
---
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
---
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content={`0; url=${base}/ko/`} />
    <link rel="canonical" href={`${base}/ko/`} />
    <title>crowdy</title>
  </head>
  <body>
    <p>Redirecting to <a href={`${base}/ko/`}>/ko/</a>…</p>
  </body>
</html>
```

- [ ] **Step 2: Write `src/pages/[lang]/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  return (['ko', 'ja', 'en'] as const).map((lang) => ({ params: { lang } }));
}

const { lang } = Astro.params;
const all = await getCollection('posts');
const isProd = !import.meta.env.DEV;
const posts = all
  .filter((p: CollectionEntry<'posts'>) => p.data.lang === lang)
  .filter((p: CollectionEntry<'posts'>) => !(isProd && p.data.draft))
  .sort((a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) =>
    b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

const pairSlugsWithOtherLangs = new Set(
  all
    .filter((p: CollectionEntry<'posts'>) => p.data.lang !== lang)
    .map((p: CollectionEntry<'posts'>) => p.data.pairSlug)
);
---

<BaseLayout title={`crowdy — ${lang}`} lang={lang}>
  <h1>posts ({lang})</h1>
  {posts.length === 0 ? (
    <p>No posts yet.</p>
  ) : (
    <ul class="post-list">
      {posts.map((p) => (
        <PostCard post={p} hasTranslation={pairSlugsWithOtherLangs.has(p.data.pairSlug)} />
      ))}
    </ul>
  )}
</BaseLayout>
```

- [ ] **Step 3: Write `src/pages/[lang]/[slug].astro`**

```astro
---
import PostLayout from '../../layouts/PostLayout.astro';
import { getCollection } from 'astro:content';
import { postSlug } from '../../utils/pairs';
import type { CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  const all = await getCollection('posts');
  const isProd = !import.meta.env.DEV;
  return all
    .filter((p: CollectionEntry<'posts'>) => !(isProd && p.data.draft))
    .map((post: CollectionEntry<'posts'>) => ({
      params: { lang: post.data.lang, slug: postSlug(post) },
      props: { post },
    }));
}

const { post } = Astro.props as { post: CollectionEntry<'posts'> };
const { Content } = await post.render();
---

<PostLayout post={post}>
  <Content />
</PostLayout>
```

- [ ] **Step 4: Write `src/pages/404.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
---
<BaseLayout title="404 — not found">
  <h1>404</h1>
  <p>That page does not exist. <a href={`${base}/ko/`}>Go home</a>.</p>
</BaseLayout>
```

- [ ] **Step 5: Type-check + build**

Run: `npm run check && npm run build`
Expected: build succeeds; `dist/` contains `ko/`, `ja/`, `en/` directories with HTML files.

- [ ] **Step 6: Smoke-test locally**

Run: `npm run preview &` (or run interactively)
Open: `http://localhost:4321/crowdy-blog/`
Expected: redirects to `/ko/`, shows post list. Click a post — content renders. Lang toggle visible if pair exists. Theme toggle works.

Stop preview after verification.

- [ ] **Step 7: Commit**

```bash
git add src/pages
git commit -m "feat: add index, lang index, post detail, 404 pages"
```

---

## Task 9: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write workflow**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run check
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deploy workflow"
```

---

## Task 10: README + final wiring

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write `README.md`**

````markdown
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

## Override source dir

```bash
CROWDY_BLOG_SOURCE=/some/path npm run sync
```

## Tests

```bash
npm test
```
````

- [ ] **Step 2: Final full pipeline check**

Run: `npm run sync && npm run check && npm run build && npm test`
Expected: all green.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add README"
```

---

## Task 11: Initial sync of real content + final commit

- [ ] **Step 1: Sync real source**

Run: `npm run sync`
Expected: prints synced count (~35 posts based on current source).

- [ ] **Step 2: Build with real content**

Run: `npm run build`
Expected: build succeeds. Look at `dist/` — should contain `ko/`, `ja/`, `en/` index pages and post pages.

- [ ] **Step 3: Spot-check a few rendered files**

Run: `ls dist/ko/ dist/ja/ dist/en/ | head -20`
Run: `grep -l "Korea AI" dist/en/*/index.html dist/ko/*/index.html 2>/dev/null | head -3`

Inspect one post HTML to confirm title, body, lang toggle render correctly.

- [ ] **Step 4: Commit synced content**

```bash
git add src/content/posts
git commit -m "content: initial sync from ~/dev/crowdy/blog/"
```

- [ ] **Step 5: Set main branch + push (manual user action)**

User instructions in README and verbally:
1. Create the GitHub repo `crowdy/crowdy-blog` (empty, no README/license).
2. `git remote add origin git@github.com:crowdy/crowdy-blog.git`
3. `git push -u origin main`
4. In repo Settings → Pages → Source: GitHub Actions.
5. Wait for the deploy workflow to finish; visit `https://crowdy.github.io/crowdy-blog/`.

(These steps are not automated by the agent — they require GitHub credentials and repo creation.)

---

## Self-Review Notes

**Spec coverage:**
- ✅ Astro + GitHub Pages + Actions: Tasks 1, 9
- ✅ Three-language structure with toggle: Tasks 5, 7, 8
- ✅ Sync script with auto frontmatter: Tasks 2, 3
- ✅ Drafts dev-only: Task 8 (`isProd` filter)
- ✅ Dark mode + minimal design: Task 6
- ✅ Zod schema: Task 4
- ✅ Tests for parsers + sync: Tasks 2, 3
- ✅ Deploy workflow: Task 9
- ✅ Pair lookup: Task 5
- ✅ Slug collision fail-fast: Task 3 (collision detection block)
- ✅ Initial real-content sync: Task 11

**Type consistency:**
- `Lang` type defined in `parse.ts`, re-used in `pairs.ts` (locally) and in collection schema enum.
- `PairMap` defined in `pairs.ts` and consumed by `LangToggle`.
- `postSlug()` is the single source of truth for URL slug derivation; used by `PostCard`, `LangToggle`, post detail page.

**No placeholders:** every code-bearing step contains complete code.
