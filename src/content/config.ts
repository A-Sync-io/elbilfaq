import { z, defineCollection } from 'astro:content';

// FAQ collection schema
const faqCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(100, 'Title must be 100 characters or less'),
    description: z.string().max(200, 'Description must be 200 characters or less'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    author: z.string().optional(),
    order: z.number().default(0),
    // SEO
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
    // FAQ structured data (for FAQPage schema)
    faqSchema: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })).optional()
  })
});

// Categories collection (optional)
const categoriesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    slug: z.string(),
    color: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().default(0)
  })
});

export const collections = {
  faq: faqCollection,
  categories: categoriesCollection
};
