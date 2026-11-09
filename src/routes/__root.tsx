/// <reference types="vite/client" />

import { Analytics } from "@faststats/react";
import { errorTracking } from "@faststats/react/error";
import { sessionReplay } from "@faststats/react/replay";
import { webVitals } from "@faststats/react/web-vitals";
import { PostHogProvider } from "posthog-js/react";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { RootProvider } from "fumadocs-ui/provider/tanstack";
import type { ReactNode } from "react";
import { NotFound } from "@/components/not-found";
import SearchDialog from "@/components/search";
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
	const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
	const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

	if (!posthogKey && import.meta.env.DEV && typeof window !== "undefined") {
		throw new Error(
			"VITE_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
		);
	}

	if (!posthogHost && import.meta.env.DEV && typeof window !== "undefined") {
		throw new Error(
			"VITE_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_HOST is configured",
		);
	}

	const content = (
		<RootProvider search={{ SearchDialog }}>{children}</RootProvider>
	);

	return (
		<html lang="en">
			<head>
				<HeadContent />
				{import.meta.env.VITE_FASTSTATS_SITEKEY && (
					<Analytics
						siteKey={import.meta.env.VITE_FASTSTATS_SITEKEY}
						extensions={[errorTracking(), webVitals(), sessionReplay()]}
					/>
				)}
				<script
					src="https://cdn.databuddy.cc/databuddy.js"
					data-client-id="07b2cf02-d140-40e2-afe6-68deb1dea8a2"
					crossOrigin="anonymous"
					data-track-performance
					data-track-web-vitals
					async
				></script>
			</head>
			<body>
				{posthogKey && posthogHost ? (
					<PostHogProvider
						apiKey={posthogKey}
						options={{
							api_host: posthogHost,
							defaults: "2025-05-24",
							capture_exceptions: true,
							debug: import.meta.env.DEV,
						}}
					>
						{content}
					</PostHogProvider>
				) : (
					content
				)}
				<Scripts />
			</body>
		</html>
	);
}
