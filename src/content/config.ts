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

const books = defineCollection({
  type: 'data',
  schema: z.object({
    book: z.string(),
    bookTitle: z.string(),
    bookAuthor: z.string().optional(),
    isbn: z.string().optional(),
    description: z.string(),
    lang: z.enum(['ko', 'ja', 'en']),
    pairSlug: z.string(),
    totalChapters: z.number().int().positive(),
    draft: z.boolean().default(false),
    updated: z.coerce.date().optional(),
  }),
});

const studies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    book: z.string(),
    bookTitle: z.string(),
    chapter: z.number(),
    lang: z.enum(['ko', 'ja', 'en']),
    pairSlug: z.string(),
    prerequisites: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { posts, books, studies };
