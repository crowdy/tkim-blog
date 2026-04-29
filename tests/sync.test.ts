import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  mkdtempSync,
  rmSync,
  readFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sync } from '../scripts/sync-posts';

const __dirname = dirname(fileURLToPath(import.meta.url));
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
    await sync({ sourceDir: FIXTURES, outDir, verbose: false });

    expect(existsSync(join(outDir, 'en', 'foo.md'))).toBe(true);
    expect(existsSync(join(outDir, 'ja', 'foo.md'))).toBe(true);
    expect(existsSync(join(outDir, 'en', 'bar.md'))).toBe(true);
    expect(existsSync(join(outDir, 'en', 'baz.md'))).toBe(true);
  });

  it('generates frontmatter with title, description, lang, pairSlug, draft, sourceDir', async () => {
    await sync({ sourceDir: FIXTURES, outDir, verbose: false });

    const foo = readFileSync(join(outDir, 'en', 'foo.md'), 'utf8');
    expect(foo).toMatch(/^---\n/);
    expect(foo).toMatch(/title: 'Foo Title'/);
    expect(foo).toMatch(/description: 'Foo lede\.'/);
    expect(foo).toMatch(/lang: en/);
    expect(foo).toMatch(/pairSlug: 'foo'/);
    expect(foo).toMatch(/draft: false/);
    expect(foo).toMatch(/sourceDir: root/);

    const baz = readFileSync(join(outDir, 'en', 'baz.md'), 'utf8');
    expect(baz).toMatch(/draft: true/);
    expect(baz).toMatch(/sourceDir: draft/);
  });

  it('strips dotfiles and .swp', async () => {
    const dirty = mkdtempSync(join(tmpdir(), 'crowdy-dirty-'));
    writeFileSync(join(dirty, 'real.md'), '# Real\n\nbody');
    writeFileSync(join(dirty, '.hidden.md'), '# Hidden\n\nbody');
    writeFileSync(join(dirty, '.real.md.swp'), 'binary garbage');
    mkdirSync(join(dirty, '.claude'));
    writeFileSync(join(dirty, '.claude', 'note.md'), '# Note');

    await sync({ sourceDir: dirty, outDir, verbose: false });

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

    await expect(sync({ sourceDir: dup, outDir, verbose: false })).rejects.toThrow(
      /collision/i
    );
    rmSync(dup, { recursive: true, force: true });
  });

  it('uses YYYY-MM-DD prefix from filename as pubDate (and strips it from slug)', async () => {
    const dated = mkdtempSync(join(tmpdir(), 'crowdy-dated-'));
    writeFileSync(join(dated, '2026-03-07-ide-decline.md'), '# Title\n\nKorean 한국어 본문 한국어 본문 한국어.\n');
    writeFileSync(
      join(dated, '2026-03-07-ide-decline-ja.md'),
      '# Title\n\n日本語の本文です。日本語の本文です。\n'
    );

    await sync({ sourceDir: dated, outDir, verbose: false });

    const ko = readFileSync(join(outDir, 'ko', 'ide-decline.md'), 'utf8');
    expect(ko).toMatch(/pubDate: 2026-03-07T00:00:00\.000Z/);
    expect(ko).toMatch(/pairSlug: 'ide-decline'/);

    const ja = readFileSync(join(outDir, 'ja', 'ide-decline.md'), 'utf8');
    expect(ja).toMatch(/pubDate: 2026-03-07T00:00:00\.000Z/);
    expect(ja).toMatch(/pairSlug: 'ide-decline'/);

    rmSync(dated, { recursive: true, force: true });
  });

  it('wipes outDir before writing (no orphans)', async () => {
    mkdirSync(join(outDir, 'en'), { recursive: true });
    writeFileSync(join(outDir, 'en', 'orphan.md'), '---\n---\n');

    await sync({ sourceDir: FIXTURES, outDir, verbose: false });

    expect(existsSync(join(outDir, 'en', 'orphan.md'))).toBe(false);
  });
});
