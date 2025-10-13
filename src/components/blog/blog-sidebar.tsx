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
    <>
      <header className="border-b border-fd-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              Blog
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-fd-muted-foreground">
              Updates, devlogs, and notes from the team.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <section className="space-y-4">
              {filteredPosts.map((post) => (
                <Link
                  href={post.data.url}
                  key={post.path}
                  className="group block rounded-lg border border-fd-border transition-colors hover:bg-fd-accent/10"
                >
                  <article className="p-6">
                    <h2 className="text-2xl font-semibold text-fd-foreground group-hover:text-fd-foreground/90">
                      {post.data.title}
                    </h2>
                    {post.data.description && (
                      <p className="mt-2 text-sm text-fd-muted-foreground">
                        {post.data.description}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-fd-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        {getCategoryIcon(post.data.category ?? "All Posts")}{" "}
                        {post.data.category ?? "other"}
                      </span>
                      <div className="h-3 w-px bg-fd-border" />
                      <time>
                        {new Date(
                          (typeof post.data.date === "string"
                            ? post.data.date
                            : post.data.date?.toISOString()) ??
                            post.path.split("/").pop()?.replace(".mdx", "") ??
                            "",
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </article>
                </Link>
              ))}
            </section>

            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-lg border border-fd-border p-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-fd-secondary-foreground">
                  Filter
                </h3>
                <nav className="space-y-4 text-sm uppercase text-fd-muted-foreground">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center gap-2 text-left transition-colors hover:text-fd-foreground uppercase text-md ${
                        selectedCategory === category ? "text-fd-foreground" : ""
                      }`}
                    >
                      {getCategoryIcon(category)}
                      {category}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
