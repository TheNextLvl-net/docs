import path from "node:path";
import { fileURLToPath } from "node:url";
import sourcemapsPlugin from "@faststats/sourcemap-uploader-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import mdx from "fumadocs-mdx/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import * as MdxConfig from "./source.config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		tsconfigPaths: true,
		alias: {
			"@": path.resolve(root, "src"),
		},
	},
	build: {
		sourcemap: true,
	},
	plugins: [
		mdx(MdxConfig),
		sourcemapsPlugin({
			deleteAfterUpload: true,
			authToken: process.env.FASTSTATS_UPLOAD_TOKEN,
			enabled: process.env.GITHUB_REF_NAME === "main",
		}),
		nitro({
			routeRules: {
				"/discord": {
					redirect: { to: "https://discord.com/invite/npPXFQcsK8" },
				},
				"/youtube": {
					redirect: {
						to: "https://www.youtube.com/channel/UCHwqk5v8JSbpDb6frP4ZTOQ",
					},
				},
				"/namemc": {
					redirect: { to: "https://namemc.com/server/thenextlvl.net" },
				},
				"/github": { redirect: { to: "https://github.com/TheNextLvl-net/" } },
				"/plugins": {
					redirect: { to: "https://modrinth.com/organization/thenextlvl" },
				},
			},
		}),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
});
