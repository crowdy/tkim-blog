import { readdir, readFile, writeFile, mkdir, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';
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

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    if (IGNORE_DIRS.has(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(full);
    } else if (e.isFile() && e.name.endsWith('.md')) {
      yield full;
    }
  }
}

function classifySourceDir(rel: string): 'root' | 'posted' | 'draft' {
  const top = rel.split(sep)[0];
  if (top === 'posted') return 'posted';
  if (top === 'draft') return 'draft';
  return 'root';
}

function humanize(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
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

export async function sync(
  opts: SyncOptions
): Promise<{ synced: number; skipped: number; warnings: number }> {
  if (existsSync(opts.outDir)) {
    await rm(opts.outDir, { recursive: true, force: true });
  }
  await mkdir(opts.outDir, { recursive: true });

  const collected: PostMeta[] = [];
  let skipped = 0;
  let warnings = 0;

  for await (const filepath of walk(opts.sourceDir)) {
    const rel = relative(opts.sourceDir, filepath);
    const filename = rel.split(sep).pop()!;
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
    let title: string;
    if (titleRaw === null) {
      fileWarnings.push(`no H1 in ${rel}; using filename`);
      title = humanize(baseSlug);
    } else {
      title = titleRaw;
    }
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
    const lines = collisions.map(
      ([out, posts]) =>
        `  ${out}\n${posts.map((p) => `    ← ${p.sourceDir}/${p.pairSlug}`).join('\n')}`
    );
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
const isDirectRun = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;
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
