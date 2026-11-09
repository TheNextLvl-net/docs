import { createFileRoute } from "@tanstack/react-router";
import { createFromSource } from "fumadocs-core/search/server";
import { logDocumentationService } from "@/lib/posthog-logs";
import { source } from "@/lib/source";

const server = createFromSource(source, {
	language: "english",
});

export const Route = createFileRoute("/api/search")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const response = await server.GET(request);
				logDocumentationService("documentation_search_served");
				return response;
			},
		},
	},
});
