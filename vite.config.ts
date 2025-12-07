import { defineConfig } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { nitro } from "nitro/vite"
import mdx from "fumadocs-mdx/vite"
import * as MdxConfig from "./source.config"
import tailwindcss from "@tailwindcss/vite"
import takumiPackageJson from "@takumi-rs/core/package.json" with { type: "json" }

export default defineConfig({
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ["@takumi-rs/core"],
  },
  plugins: [
    mdx(MdxConfig),
    nitro({
      routeRules: {
        "/discord": { redirect: { to: "https://discord.com/invite/npPXFQcsK8" } },
        "/youtube": {
          redirect: { to: "https://www.youtube.com/channel/UCHwqk5v8JSbpDb6frP4ZTOQ" },
        },
        "/namemc": { redirect: { to: "https://namemc.com/server/thenextlvl.net" } },
        "/github": { redirect: { to: "https://github.com/TheNextLvl-net/" } },
        "/plugins": { redirect: { to: "https://modrinth.com/organization/thenextlvl" } },
      },
      externals: {
        external: ["@takumi-rs/core"],
        traceInclude: Object.keys(takumiPackageJson.optionalDependencies),
      },
    }),
    tailwindcss(),
    tsConfigPaths(),
    tanstackStart({
      sitemap: {
        enabled: true,
        host: process.env.VITE_PUBLIC_BASE_URL || "https://thenextlvl.net",
      },
    }),
    viteReact(),
  ],
})
