/// <reference types="vite/client" />

import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { RootProvider } from "fumadocs-ui/provider/tanstack";
import type { ReactNode } from "react";
import { NotFound } from "@/components/not-found";
import globalCss from "./../global.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TheNextLvl",
			},
			{
				name: "description",
				content:
					"TheNextLvl is a community-driven Minecraft server that provides a safe and fun environment for players of all ages.",
			},
		],
		links: [
			{ rel: "stylesheet", href: globalCss },
			{ rel: "icon", href: "/favicon.ico" },
			{ rel: "icon", href: "/favicon-16x16.png", sizes: "16x16" },
			{ rel: "icon", href: "/favicon-32x32.png", sizes: "32x32" },
			{ rel: "icon", href: "/android-chrome-192x192.png", sizes: "192x192" },
			{ rel: "icon", href: "/android-chrome-512x512.png", sizes: "512x512" },
			{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
		],
	}),
	component: RootComponent,
	notFoundComponent: NotFound,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	const analyticsDomain = import.meta.env.VITE_ANALYTICS_DOMAIN;
	const analyticsUrl = import.meta.env.VITE_ANALYTICS_URL;

	const faststatsDomain = import.meta.env.VITE_FASTSTATS_SITEKEY;
	const faststatsUrl = import.meta.env.VITE_FASTSTATS_SCRIPT_URL;

	return (
		<html lang="en">
			<head>
				<HeadContent />
				{faststatsDomain && faststatsUrl && (
					<script
						defer
						data-sitekey={faststatsDomain}
						src={faststatsUrl}
						id="faststats-script"
					/>
				)}
				{analyticsDomain && analyticsUrl && (
					<>
						<script
							defer
							data-domain={analyticsDomain}
							src={analyticsUrl}
							id="plausible-script"
						/>
						<script
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <Plausible docs say to do this>
							dangerouslySetInnerHTML={{
								__html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
							}}
							id="plausible-window"
						/>
					</>
				)}
			</head>
			<body>
				<RootProvider>{children}</RootProvider>
				<Scripts />
			</body>
		</html>
	);
}
