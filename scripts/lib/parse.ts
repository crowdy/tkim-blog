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

export function extractTitle(markdown: string): string | null {
  const lines = markdown.split('\n');
  for (const line of lines) {
    if (line.trim() === '') continue;
    const match = line.match(/^#\s+(.+?)\s*$/);
    if (match) return match[1].trim();
    if (/^#{2,}\s/.test(line)) return null;
    return null;
  }
  return null;
}

function isSkippableLine(line: string): boolean {
  const t = line.trim();
  if (t === '') return true;
  if (/^#{1,6}\s/.test(t)) return true; // any heading
  if (/^[-*_]{3,}$/.test(t)) return true; // hr
  return false;
}

export function extractDescription(markdown: string): string {
  const lines = markdown.split('\n');
  let i = 0;

  while (i < lines.length) {
    while (i < lines.length && isSkippableLine(lines[i])) i++;
    if (i >= lines.length) break;

    if (lines[i].startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s?/, '').trim());
        i++;
      }
      const joined = quoteLines.filter(Boolean).join(' ').trim();
      if (joined) return truncate(joined);
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== '') {
      paraLines.push(lines[i].trim());
      i++;
    }
    const joined = paraLines.join(' ').trim();
    if (joined) return truncate(joined);
  }
  return '';
}

function truncate(s: string, max = 200): string {
  if (s.length <= max) return s;
  return s.slice(0, max).trimEnd() + '…';
}

export function detectLanguage(content: string): Lang {
  // Strip code fences and inline code so prose is what gets classified.
  const prose = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]*`/g, '');
  const stripped = prose.replace(/\s+/g, '');
  if (stripped.length === 0) return 'en';

  let hangul = 0;
  let kana = 0;
  for (const ch of stripped) {
    const cp = ch.codePointAt(0)!;
    if (
      (cp >= 0xac00 && cp <= 0xd7a3) ||
      (cp >= 0x1100 && cp <= 0x11ff) ||
      (cp >= 0x3130 && cp <= 0x318f)
    ) {
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
