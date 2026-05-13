import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const all = await getCollection('posts');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const items = all
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .map((p) => {
      const slug = p.id.replace(/^[^/]+\//, '').replace(/\.md$/, '');
      return {
        title: `[${p.data.lang}] ${p.data.title}`,
        description: p.data.description,
        pubDate: p.data.pubDate,
        link: `${base}/${p.data.lang}/${slug}/`,
        customData: `<language>${p.data.lang}</language>`,
      };
    });

  return rss({
    title: 'crowdy blog',
    description: 'Tonghyun Kim — multilingual tech blog',
    site: context.site!,
    items,
    customData: `<language>ko</language>`,
  });
}
