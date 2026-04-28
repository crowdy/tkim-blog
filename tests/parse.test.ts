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
});
