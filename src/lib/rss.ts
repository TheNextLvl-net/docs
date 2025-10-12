import { Feed } from "feed"
import { blog } from "@/lib/source"

const baseUrl = "https://thenextlvl.net"

export function getRSS() {
  const feed = new Feed({
    title: "TheNextLvl Blog",
    id: `${baseUrl}/blog`,
    link: `${baseUrl}/blog`,
    language: "en",
    description:
      "Our blog where we post about more or less technical stuff regarding our plugins and minecraft in general",
    image: `${baseUrl}/banner.png`,
    favicon: `${baseUrl}/icon.png`,
    copyright: "All rights reserved 2025, TheNextLvl",
  })

  for (const page of blog.getPages()) {
    feed.addItem({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      link: `${baseUrl}${page.url}`,
      date: new Date(page.data.lastModified?.getDate() ?? new Date()),

      author: [
        {
          name: "TheNextLvl",
        },
      ],
    })
  }

  return feed.rss2()
}
