import { blog } from "@/lib/source"
import { getMDXComponents } from "@/mdx-components"
import { PathUtils } from "fumadocs-core/source"
import { InlineTOC } from "fumadocs-ui/components/inline-toc"
import { notFound } from "next/navigation"

export default async function Page(props: PageProps<"/blog/[slug]">) {
  const params = await props.params
  const page = blog.getPage([params.slug])
  if (!page) notFound()
  const { body: Mdx, toc } = page.data

  return (
    <>
      <div className="container mx-auto mt-12 space-y-10">
        <div className="mx-auto flex w-full flex-col gap-4 px-8">
          <h1 className="text-5xl font-semibold tracking-tight text-white">{page?.data.title}</h1>
          <p className="text-xl text-neutral-500">{page?.data.description}</p>

          <div className="flex flex-row gap-8 mt-4 border border-white/20 p-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-wide text-neutral-500">Author</p>
              <p className="font-medium">{page.data.author}</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-wide text-neutral-500">Published</p>
              <p className="font-medium">
                {new Date(
                  page.data.date ?? PathUtils.basename(page.path, PathUtils.extname(page.path)),
                ).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <article className="flex flex-col mx-auto w-full container gap-16 px-8 py-8 lg:flex-row">
        <div className="prose min-w-0 flex-1 p-4">
          <InlineTOC items={toc} className="rounded-none mb-8" />

          <Mdx components={getMDXComponents()} />
        </div>
      </article>
    </>
  )
}
