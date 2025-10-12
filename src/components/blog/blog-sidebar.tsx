"use client"

import Link from "next/link"
import { useState } from "react"
import { BookOpen, Code, RotateCcw, FileText, File } from "lucide-react"

type BlogPost = {
  path: string
  data: {
    title: string
    description?: string
    category?: "devlog" | "updates" | "other"
    date?: string | Date
    url: string
  }
}

type BlogSidebarProps = {
  posts: BlogPost[]
}

export function BlogSidebar({ posts }: BlogSidebarProps) {
  const categories = [
    "All Posts",
    ...[...new Set(posts.map((post) => post.data.category))].filter(
      (category): category is "devlog" | "updates" | "other" => Boolean(category),
    ),
  ]

  const [selectedCategory, setSelectedCategory] = useState("All Posts")

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "All Posts":
        return <BookOpen className="w-4 h-4" />
      case "devlog":
        return <Code className="w-4 h-4" />
      case "updates":
        return <RotateCcw className="w-4 h-4" />
      case "other":
        return <FileText className="w-4 h-4" />
      default:
        return <File className="w-4 h-4" />
    }
  }

  const filteredPosts =
    selectedCategory === "All Posts"
      ? posts
      : posts.filter((post) => post.data.category === selectedCategory)

  return (
    <main className="container mx-auto my-12 space-y-10">
      <div className="mx-auto flex w-full  gap-16 px-8">
        <aside className="w-48 flex-shrink-0">
          <h1 className="text-5xl font-semibold tracking-tight">Blog</h1>
          <nav className="mt-12 flex flex-col space-y-4 text-sm uppercase text-neutral-500">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 text-left transition-colors hover:text-white uppercase text-md ${
                  selectedCategory === category ? "text-white" : ""
                }`}
              >
                {getCategoryIcon(category)}
                {category}
              </button>
            ))}
          </nav>
        </aside>
        <div className="flex flex-1 flex-col space-y-6 mt-22">
          {filteredPosts.map((post) => (
            <Link href={post.data.url} key={post.path} className="border border-white/20 p-4">
              <article className="group">
                <div className="flex flex-col space-y-3 p-6 transition-colors group-hover:border-white/20">
                  <h2 className="text-2xl font-semibold text-white group-hover:text-white/90">
                    {post.data.title}
                  </h2>
                  <p className="text-sm text-neutral-400">{post.data.description}</p>
                  <p className="text-xs uppercase tracking-wide text-neutral-500 flex items-center gap-2">
                    {getCategoryIcon(post.data.category ?? "All Posts")} {post.data.category} ·{" "}
                    {new Date(
                      (typeof post.data.date === "string"
                        ? post.data.date
                        : post.data.date?.toISOString()) ??
                        post.path.split("/").pop()?.replace(".mdx", "") ??
                        "",
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
