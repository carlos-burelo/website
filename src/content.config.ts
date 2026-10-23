import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
})

const workCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    preview: z.string(),
    repository: z.string(),
    tags: z.array(z.string()),
    stack: z.record(z.string(), z.number()),
    createdAt: z.date(),
  }),
})

const snippetCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/snippets' }),
  schema: z.object({
    title: z.string(),
    lang: z.string(),
  }),
})

export const collections = {
  blog: blogCollection,
  works: workCollection,
  snippets: snippetCollection,
}