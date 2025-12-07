import { createFileRoute, notFound } from "@tanstack/react-router"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { createServerFn } from "@tanstack/react-start"
import { source } from "@/lib/source"
import browserCollections from "fumadocs-mdx:collections/browser"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  PageLastUpdate,
} from "fumadocs-ui/layouts/docs/page"
import defaultMdxComponents from "fumadocs-ui/mdx"
import { baseOptions } from "@/lib/layout.shared"
import { useFumadocsLoader } from "fumadocs-core/source/client"
import { Mermaid } from "@/components/mdx/mermaid"
import { SiGithub } from "@icons-pack/react-simple-icons"

export const Route = createFileRoute("/docs/$")({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/") ?? []
    const data = await serverLoader({ data: slugs })
    await clientLoader.preload(data.path)
    return data
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const ogImageUrl = `/docs-og/${loaderData.slugs.join("/")}/image.png`

    return {
      meta: [
        {
          title: loaderData.title,
        },
        {
          name: "description",
          content: loaderData.description,
        },
        {
          property: "og:title",
          content: loaderData.title,
        },
        {
          property: "og:description",
          content: loaderData.description,
        },
        {
          property: "og:image",
          content: ogImageUrl,
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: loaderData.title,
        },
        {
          name: "twitter:description",
          content: loaderData.description,
        },
        {
          name: "twitter:image",
          content: ogImageUrl,
        },
      ],
    }
  },
})

const serverLoader = createServerFn({
  method: "GET",
})
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs)
    if (!page) throw notFound()

    return {
      path: page.path,
      slugs,
      title: page.data.title,
      description: page.data.description,
      pageTree: await source.serializePageTree(source.getPageTree()),
    }
  })

const clientLoader = browserCollections.docs.createClientLoader({
  component({ toc, frontmatter, lastModified, default: MDX }) {
    const data = Route.useLoaderData()
    return (
      <DocsPage toc={toc}>
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription className="mb-0">{frontmatter.description}</DocsDescription>

        <a
          href={`https://github.com/TheNextLvl-net/docs/blob/main/content/docs/${data.path}`}
          rel="noreferrer noopener"
          target="_blank"
          className="mb-8 w-fit border flex items-center gap-2 rounded-md p-2 font-medium text-xs text-fd-secondary-foreground hover:text-fd-accent-foreground hover:bg-fd-accent"
        >
          <SiGithub className="size-4" /> Edit on GitHub
        </a>
        <DocsBody>
          <MDX
            components={{
              ...defaultMdxComponents,
              Mermaid,
            }}
          />
        </DocsBody>
        <PageLastUpdate date={new Date(lastModified ?? 0)} />
      </DocsPage>
    )
  },
})

function Page() {
  const data = Route.useLoaderData()
  const { pageTree } = useFumadocsLoader(data)
  const Content = clientLoader.getComponent(data.path)

  return (
    <DocsLayout {...baseOptions} tree={pageTree}>
      <Content />
    </DocsLayout>
  )
}
