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
  }),
});

export const collections = { posts };
