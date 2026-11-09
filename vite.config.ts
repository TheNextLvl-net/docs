import path from "node:path";
import { fileURLToPath } from "node:url";
import sourcemapsPlugin from "@faststats/sourcemap-uploader-plugin/vite";
import posthog from "@posthog/rollup-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import mdx from "fumadocs-mdx/vite";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv } from "vite";
import * as MdxConfig from "./source.config";

const root = path.dirname(fileURLToPath(import.meta.url));

const createConfig = () => ({
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
		posthog({
			personalApiKey: process.env.POSTHOG_API_KEY ?? "",
			projectId: process.env.POSTHOG_PROJECT_ID ?? "",
			host: process.env.POSTHOG_HOST,
			sourcemaps: {
				enabled: Boolean(
					process.env.POSTHOG_API_KEY && process.env.POSTHOG_PROJECT_ID,
				),
				releaseName: process.env.POSTHOG_RELEASE_NAME,
				releaseVersion: process.env.POSTHOG_RELEASE_VERSION,
				deleteAfterUpload: true,
			},
		}),
		nitro({
			exportConditions: ["!unwasm"],
			traceDeps: ["takumi-js*"],
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

export default defineConfig(({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
	return createConfig();
});
