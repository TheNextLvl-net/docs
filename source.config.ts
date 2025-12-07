import {
  defineConfig,
  defineDocs,
  defineCollections,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config"
import { transformerCommandColor } from "./src/lib/command-transformer"
import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins"
import { z } from "zod"
import lastModified from "fumadocs-mdx/plugins/last-modified"

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
})

export const blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    author: z.string(),
    category: z.enum(["devlog", "updates", "other"]),
    keywords: z.string().array().optional(),
  }),
})

export default defineConfig({
  plugins: [lastModified()],
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
})
