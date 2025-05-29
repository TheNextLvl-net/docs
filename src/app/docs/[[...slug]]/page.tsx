import { source } from "@/lib/source"
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page"
import { notFound } from "next/navigation"
import { createRelativeLink } from "fumadocs-ui/mdx"
import { getMDXComponents } from "@/mdx-components"
import { lastEdit } from "@/lib/api"
import { SiGithub } from "@icons-pack/react-simple-icons"

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDXContent = page.data.body

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      lastUpdate={await lastEdit(page)}
      tableOfContent={{
        style: "clerk",
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>

      <a
        href={`https://github.com/TheNextLvl-net/docs/blob/main/content/docs/${page.file.path}`}
        rel="noreferrer noopener"
        target="_blank"
        className="mb-8 w-fit border flex items-center gap-2 rounded-md p-2 font-medium text-xs text-fd-secondary-foreground hover:text-fd-accent-foreground hover:bg-fd-accent"
      >
        <SiGithub className="size-4" /> Edit on GitHub
      </a>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
