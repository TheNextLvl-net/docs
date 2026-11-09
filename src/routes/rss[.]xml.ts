import { createFileRoute } from "@tanstack/react-router";
import { logDocumentationService } from "@/lib/posthog-logs";
import { getRSS } from "@/lib/rss";

export const Route = createFileRoute("/rss.xml")({
	server: {
		handlers: {
			GET: async () => {
				const feed = await getRSS();
				logDocumentationService("documentation_rss_served");

				return new Response(feed, {
					headers: {
						"Content-Type": "application/xml",
					},
				});
			},
		},
	},
});
