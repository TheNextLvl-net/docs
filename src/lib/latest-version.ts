export async function latestVersion(repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/thenextlvl-net/${encodeURIComponent(repo)}/releases/latest`,
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
