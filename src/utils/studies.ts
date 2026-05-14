import type { CollectionEntry } from 'astro:content';

export type Lang = 'ko' | 'ja' | 'en';
export type Book = CollectionEntry<'books'>;
export type Chapter = CollectionEntry<'studies'>;

export interface BookPairMap {
  ko?: Book;
  ja?: Book;
  en?: Book;
}

export interface ChapterPairMap {
  ko?: Chapter;
  ja?: Chapter;
  en?: Chapter;
}

export function bookSlugFromId(book: Book): string {
  // book.id looks like "ko/turbulence-fundamentals/_book"
  // Return "turbulence-fundamentals"
  const parts = book.id.split('/');
  return parts[1];
}

export function chapterSlug(chapter: Chapter): string {
  // chapter.id looks like "ko/turbulence-fundamentals/03-reynolds-averaging.md"
  // Return "03-reynolds-averaging"
  return chapter.id.replace(/^[^/]+\/[^/]+\//, '').replace(/\.md$/, '');
}

export function chapterBookSlug(chapter: Chapter): string {
  return chapter.id.split('/')[1];
}

export function getBookPairs(allBooks: Book[], current: Book): BookPairMap {
  const map: BookPairMap = {};
  for (const b of allBooks) {
    if (b.data.pairSlug !== current.data.pairSlug) continue;
    if (b.id === current.id) continue;
    map[b.data.lang] = b;
  }
  return map;
}

export function getChapterPairs(allChapters: Chapter[], current: Chapter): ChapterPairMap {
  const map: ChapterPairMap = {};
  for (const c of allChapters) {
    if (c.data.pairSlug !== current.data.pairSlug) continue;
    if (c.id === current.id) continue;
    map[c.data.lang] = c;
  }
  return map;
}

export function bookOf(allBooks: Book[], lang: Lang, bookSlug: string): Book | undefined {
  return allBooks.find((b) => b.data.lang === lang && bookSlugFromId(b) === bookSlug);
}

export function chaptersOfBook(
  allChapters: Chapter[],
  lang: Lang,
  bookSlug: string,
  opts: { includeDrafts?: boolean } = {}
): Chapter[] {
  const includeDrafts = opts.includeDrafts ?? false;
  return allChapters
    .filter((c) => c.data.lang === lang && chapterBookSlug(c) === bookSlug)
    .filter((c) => includeDrafts || !c.data.draft)
    .sort((a, b) => a.data.chapter - b.data.chapter);
}

export function booksForLang(
  allBooks: Book[],
  lang: Lang,
  opts: { includeDrafts?: boolean } = {}
): Book[] {
  const includeDrafts = opts.includeDrafts ?? false;
  return allBooks
    .filter((b) => b.data.lang === lang)
    .filter((b) => includeDrafts || !b.data.draft);
}

export function progressFor(
  book: Book,
  allChapters: Chapter[],
  opts: { includeDrafts?: boolean } = {}
): { done: number; total: number } {
  const present = chaptersOfBook(allChapters, book.data.lang, bookSlugFromId(book), opts).length;
  return { done: present, total: book.data.totalChapters };
}

export function latestUpdate(book: Book, allChapters: Chapter[]): Date | null {
  const chs = chaptersOfBook(allChapters, book.data.lang, bookSlugFromId(book));
  let latest: Date | null = book.data.updated ?? null;
  for (const c of chs) {
    if (!c.data.updated) continue;
    if (!latest || c.data.updated.getTime() > latest.getTime()) {
      latest = c.data.updated;
    }
  }
  return latest;
}
