import { getGithubLastEdit } from "fumadocs-core/server"
import { Page } from "fumadocs-core/source"

export async function latestVersion(project: string): Promise<string> {
  const response = await fetch(
    `https://repo.thenextlvl.net/api/maven/latest/version/releases/net/thenextlvl/${project}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 300,
      },
    },
  )

  if (!response.ok) {
    return "VERSION"
  }

  const data = await response.json()
  return data.version
}

export async function lastEdit(page: Page): Promise<Date> {
  const time = await getGithubLastEdit({
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
