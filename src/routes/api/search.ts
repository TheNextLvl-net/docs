import { createFileRoute } from "@tanstack/react-router";
import { createFromSource } from "fumadocs-core/search/server";
import { logPostHogInfo } from "@/lib/posthog-logs";
import { source } from "@/lib/source";

const server = createFromSource(source, {
	language: "english",
});

export const Route = createFileRoute("/api/search")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				logPostHogInfo("documentation search requested", {
					route: "/api/search",
				});
				return server.GET(request);
			},
		},
	},
});
