import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
	// Loader moderno para Astro 5+
	loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/articles" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tag: z.string(),
		readingTime: z.string(),
		language: z.enum(['PT', 'EN']),
		isPublished: z.boolean().default(false),
	}),
});

export const collections = {
	articles,
};
