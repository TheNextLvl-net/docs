import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import {
	defineCollections,
	defineConfig,
	defineDocs,
} from "fumadocs-mdx/config";
import { z } from "zod";
import { transformerCommandColor } from "./src/lib/command-transformer";

export const docs = defineDocs({
	docs: {
		schema: pageSchema,
		postprocess: {
			includeProcessedMarkdown: true,
		},
	},
	meta: {
		schema: metaSchema,
	},
});

export const blogPosts = defineCollections({
	type: "doc",
	dir: "content/blog",
	schema: pageSchema.extend({
		author: z.string(),
		category: z.enum(["devlog", "updates", "other"]),
		keywords: z.string().array().optional(),
		date: z.string().transform((val) => new Date(val)),
	}),
});

export default defineConfig({
	mdxOptions: {
		rehypeCodeOptions: {
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
			langAlias: {
				command: "text",
			},
			transformers: [transformerCommandColor()],
		},
		remarkPlugins: [remarkMdxMermaid],
	},
});
