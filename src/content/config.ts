import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // 記事冒頭の「結論・要点ボックス」（答え先出し）
    conclusion: z.string().optional(),
    keyPoints: z.array(z.string()).default([]),
    affiliates: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          price: z.string(),
          url: z.string(),
          image: z.string().optional(),
          icon: z.string().optional(),
          badge: z.string().optional(),
          rating: z.number().min(0).max(5.0).optional(),
          stat: z.string().optional(),
        })
      )
      .default([]),
  }),
});

export const collections = { posts };
