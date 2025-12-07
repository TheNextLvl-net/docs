import { notFound } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { blog } from "@/lib/source"

export const getBlogPosts = createServerFn({
  method: "GET",
}).handler(async () => {
  const posts = blog.getPages().sort((a, b) => {
    const dateA = new Date(a.data.lastModified ?? 0)
    const dateB = new Date(b.data.lastModified ?? 0)
    return dateB.getTime() - dateA.getTime()
  })

  return posts.map((post) => ({
    url: post.url,
    path: post.path,
    data: {
      title: post.data.title,
      description: post.data.description,
      lastModified: post.data.lastModified,
      author: post.data.author,
      category: (post.data as { category?: string }).category,
    },
  }))
})

export const getBlogPost = createServerFn({
  method: "GET",
})
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const page = blog.getPage([slug])
    if (!page) throw notFound()

    return {
      path: page.path,
      data: {
        title: page.data.title,
        description: page.data.description,
        lastModified: page.data.lastModified,
        author: page.data.author,
      },
    }
  })
