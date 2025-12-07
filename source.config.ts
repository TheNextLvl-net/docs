import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
import {
	defineCollections,
	defineConfig,
	defineDocs,
	frontmatterSchema,
	metaSchema,
} from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import { z } from "zod";
import { lastEditFromPath } from "@/lib/api";
import { transformerCommandColor } from "./src/lib/command-transformer";

export const docs = defineDocs({
	docs: {
		schema: frontmatterSchema,
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
	schema: frontmatterSchema.extend({
		author: z.string(),
		category: z.enum(["devlog", "updates", "other"]),
		keywords: z.string().array().optional(),
	}),
});

export default defineConfig({
	plugins: [
		lastModified({
			versionControl: import.meta.env.DEV ? "git" : lastEditFromPath,
		}),
	],
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
