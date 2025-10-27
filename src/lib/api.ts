import { getGithubLastEdit } from "fumadocs-core/content/github"
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
    token: process.env.GITHUB_TOKEN ? "Bearer " + process.env.GITHUB_TOKEN : undefined,
    path: `content/docs/${page.path}`,
  }).catch((error) => {
    console.error("Error fetching last edit date:", error)
    return new Date()
  })
  return time ? time : new Date()
}
