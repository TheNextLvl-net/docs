import { docs, blogPosts } from "@/.source"
import { loader } from "fumadocs-core/source"
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons"
import { createMDXSource } from "fumadocs-mdx/runtime/next"
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
})

export const blog = loader(createMDXSource(blogPosts), {
  baseUrl: "/blog",
})
