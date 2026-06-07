import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writing = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/writing",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        coverImage: z.string().optional(),
        coverAlt: z.string().optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
    }),
});

export const collections = {
    writing,
};