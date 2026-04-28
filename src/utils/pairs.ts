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
  const parts = post.id.split('/');
  return parts[parts.length - 1].replace(/\.md$/, '');
}
