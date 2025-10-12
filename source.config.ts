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

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
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
    date: z.iso.date().or(z.date()),
    category: z.enum(["devlog", "updates", "other"]),
  }),
})

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
})
