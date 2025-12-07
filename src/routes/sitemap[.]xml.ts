import { createFileRoute } from "@tanstack/react-router"
import { source } from "@/lib/source"

export async function getSitemap() {
  const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL
  const url = (path: string): string => new URL(path, baseUrl).toString()

  const staticPages: Array<{
    loc: string
    lastmod?: string
    changefreq: string
    priority: string
  }> = [
    { loc: url("/"), changefreq: "monthly", priority: "1.0" },
    { loc: url("/docs"), changefreq: "monthly", priority: "0.8" },
  ]

  const docPages = source.getPages().map((page) => ({
    loc: url(page.url),
    lastmod: page.data.lastModified
      ? new Date(page.data.lastModified).toISOString().split("T")[0]
      : undefined,
    changefreq: "weekly",
    priority: "0.5",
  }))

  const allPages = [...staticPages, ...docPages]

  const urlEntries = allPages
    .map((page) => {
      const lastmod = "lastmod" in page && page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""
      return `  <url>
    <loc>${page.loc}</loc>${lastmod}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(await getSitemap(), {
          headers: {
            "Content-Type": "application/xml",
          },
        })
      },
    },
  },
})
