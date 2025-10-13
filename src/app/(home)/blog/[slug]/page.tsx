import { lastEdit } from "@/lib/api"
import { blog } from "@/lib/source"
import { getMDXComponents } from "@/mdx-components"
import { PathUtils } from "fumadocs-core/source"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function Page(props: PageProps<"/blog/[slug]">) {
  const params = await props.params
  const page = blog.getPage([params.slug])
  if (!page) notFound()
  const { body: Mdx, toc } = page.data
  return (
    <>
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="max-w-3xl">
                <nav className="mb-6 text-sm text-neutral-500">
                  <Link className="hover:text-white" href="/blog">
                    Blog
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-neutral-400">{page?.data.title}</span>
                </nav>
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                  {page?.data.title}
                </h1>
                {page?.data.description && (
                  <p className="mt-4 text-lg leading-relaxed text-neutral-400">
                    {page?.data.description}
                  </p>
                )}
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-400">
                  {page.data.author && (
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500">By</span>
                      <span className="font-medium text-white">{page.data.author}</span>
                    </div>
                  )}
                  <div className="h-4 w-px bg-white/10" />
                  <time>
                    {new Date(
                      (await lastEdit(page)) ??
                        PathUtils.basename(page.path, PathUtils.extname(page.path)),
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article className="prose prose-invert max-w-3xl">
              <Mdx components={getMDXComponents()} />
            </article>
            {toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 rounded-lg border border-white/10 p-4">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    On This Page
                  </h3>
                  <nav className="space-y-1">
                    {toc.map((item) => (
                      <Link
                        key={item.url}
                        href={item.url}
                        className="block rounded-md py-1.5 text-sm text-neutral-400 hover:text-white"
                        style={{ paddingLeft: `${(item.depth - 1) * 12}px` }}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
