import tailwindcss from "@tailwindcss/vite";
import takumiPackageJson from "@takumi-rs/core/package.json" with {
	type: "json",
};
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import mdx from "fumadocs-mdx/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import * as MdxConfig from "./source.config";

export default defineConfig({
	server: {
		port: 3000,
	},
	optimizeDeps: {
		exclude: ["@takumi-rs/core"],
	},
	resolve: {
		tsconfigPaths: true,
	},
	build: {
		sourcemap: true,
	},
	plugins: [
		mdx(MdxConfig),
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
			traceDeps: [
				"@takumi-rs/core",
				...Object.keys(takumiPackageJson.optionalDependencies),
			],
		}),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
});
