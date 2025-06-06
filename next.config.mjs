import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.com/invite/npPXFQcsK8",
        permanent: false,
      },
      {
        source: "/youtube",
        destination: "https://www.youtube.com/channel/UCHwqk5v8JSbpDb6frP4ZTOQ",
        permanent: false,
      },
      {
        source: "/namemc",
        destination: "https://namemc.com/server/thenextlvl.net",
        permanent: false,
      },
      {
        source: "/github",
        destination: "https://github.com/TheNextLvl-net/",
        permanent: false,
      },
      {
        source: "/plugins",
        destination: "https://modrinth.com/organization/thenextlvl",
        permanent: false,
      },
    ]
  },
}

export default withMDX(config)
