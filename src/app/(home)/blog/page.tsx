"use server"

import { blog } from "@/lib/source"
import { PathUtils } from "fumadocs-core/source"
import { BlogSidebar } from "@/components/blog/blog-sidebar"

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path))
}

export default async function Blog() {
  const posts = [...blog.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? getName(b.path)).getTime() -
      new Date(a.data.date ?? getName(a.path)).getTime(),
  )

  const serializablePosts = posts.map((p) => ({
    path: p.path,
    data: {
      title: p.data.title,
      description: p.data.description,
      category: p.data.category,
      url: p.url,
      date:
        (typeof p.data.date === "string" ? p.data.date : p.data.date?.toISOString()) ?? undefined,
    },
  }))

  return (
    <>
      <BlogSidebar posts={serializablePosts} />
    </>
  )
}
