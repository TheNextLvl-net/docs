"use server"

import { blog } from "@/lib/source"
import { PathUtils } from "fumadocs-core/source"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { lastEdit } from "@/lib/api"

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path))
}

export default async function Blog() {
  const pages = blog.getPages()

  const postsWithDates = await Promise.all(
    pages.map(async (page) => ({
      page,
      lastEditDate: await lastEdit(page),
    })),
  )

  const posts = postsWithDates.sort(
    (a, b) =>
      new Date(b.lastEditDate ?? getName(b.page.path)).getTime() -
      new Date(a.lastEditDate ?? getName(a.page.path)).getTime(),
  )

  const serializablePosts = await Promise.all(
    posts.map(async (p) => ({
      path: p.page.path,
      data: {
        title: p.page.data.title,
        description: p.page.data.description,
        category: p.page.data.category,
        url: p.page.url,
        date: p.lastEditDate,
      },
    })),
  )

  return (
    <>
      <BlogSidebar posts={serializablePosts} />
    </>
  )
}
