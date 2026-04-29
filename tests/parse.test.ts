import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseFilename,
  extractTitle,
  extractDescription,
  detectLanguage,
} from '../scripts/lib/parse';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES = join(__dirname, 'fixtures');
const read = (name: string) => readFileSync(join(FIXTURES, name), 'utf8');

describe('parseFilename', () => {
  it('returns base slug and ja for -ja suffix', () => {
    expect(parseFilename('korea-ai-policy-review-ja.md')).toEqual({
      baseSlug: 'korea-ai-policy-review',
      explicitLang: 'ja',
      pubDate: null,
    });
  });

  it('returns base slug with no explicit lang when no suffix', () => {
    expect(parseFilename('korea-ai-policy-review.md')).toEqual({
      baseSlug: 'korea-ai-policy-review',
      explicitLang: null,
      pubDate: null,
    });
  });

  it('strips multiple dots and only .md extension', () => {
    expect(parseFilename('multimedia-search-ai-system-2.md')).toEqual({
      baseSlug: 'multimedia-search-ai-system-2',
      explicitLang: null,
      pubDate: null,
    });
  });

  it('handles -ja with numeric tail correctly', () => {
    expect(parseFilename('multimedia-search-ai-system-ja-2.md')).toEqual({
      baseSlug: 'multimedia-search-ai-system-2',
      explicitLang: 'ja',
      pubDate: null,
    });
  });

  it('extracts YYYY-MM-DD prefix into pubDate and strips it from baseSlug', () => {
    expect(parseFilename('2026-03-07-ide-decline-ai-coding-era.md')).toEqual({
      baseSlug: 'ide-decline-ai-coding-era',
      explicitLang: null,
      pubDate: new Date('2026-03-07T00:00:00.000Z'),
    });
  });

  it('extracts date prefix together with -ja suffix', () => {
    expect(parseFilename('2026-03-07-ide-decline-ai-coding-era-ja.md')).toEqual({
      baseSlug: 'ide-decline-ai-coding-era',
      explicitLang: 'ja',
      pubDate: new Date('2026-03-07T00:00:00.000Z'),
    });
  });

  it('extracts date prefix with -ja and numeric tail', () => {
    expect(parseFilename('2026-03-07-multimedia-search-ai-system-ja-2.md')).toEqual({
      baseSlug: 'multimedia-search-ai-system-2',
      explicitLang: 'ja',
      pubDate: new Date('2026-03-07T00:00:00.000Z'),
    });
  });

  it('leaves invalid date-shaped prefixes intact in the slug', () => {
    expect(parseFilename('2026-13-40-bad-date-slug.md')).toEqual({
      baseSlug: '2026-13-40-bad-date-slug',
      explicitLang: null,
      pubDate: null,
    });
  });
});

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

  it('skips horizontal rules and subheadings before description', () => {
    const md = '# Title\n\n## Subtitle line\n\n---\n\nReal first paragraph here.';
    expect(extractDescription(md)).toBe('Real first paragraph here.');
  });

  it('skips empty blockquotes and falls back to next paragraph', () => {
    const md = '# T\n\n> \n\nBody paragraph.';
    expect(extractDescription(md)).toBe('Body paragraph.');
  });
});

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

  it('classifies as ko even with heavy code blocks (code is stripped first)', () => {
    const md = `# 한국어 제목

이 글은 한국어로 작성된 본문입니다. 한국어 문장이 충분히 들어갑니다.

\`\`\`python
def some_long_function_with_many_english_words(argument_name, another_one):
    return some_long_english_identifier + another_long_english_identifier
\`\`\`

추가적인 한국어 본문이 더 있습니다.`;
    expect(detectLanguage(md)).toBe('ko');
  });
});
