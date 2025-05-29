import { getGithubLastEdit } from "fumadocs-core/server"
import { Page } from "fumadocs-core/source"

export async function latestVersion(repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/TheNextLvl-net/${encodeURIComponent(repo)}/releases/latest`,
    {
      headers: {
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
        Accept: "application/vnd.github.v3+json",
      },
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    },
  )

  if (!response.ok) {
    return "VERSION"
  }

  const data = await response.json()
  return data.tag_name
}

export async function lastEdit(page: Page): Promise<Date> {
  var time = await getGithubLastEdit({
    owner: "TheNextLvl-net",
    repo: "docs",
    token: process.env.GITHUB_TOKEN,
    path: `content/docs/${page.file.path}`,
  }).catch((error) => {
    console.error("Error fetching last edit date:", error)
    return new Date(0)
  })
  return time ? time : new Date(0)
}
