import { createFileRoute } from "@tanstack/react-router";
import { logPostHogInfo } from "@/lib/posthog-logs";
import { getRSS } from "@/lib/rss";

export const Route = createFileRoute("/rss.xml")({
	server: {
		handlers: {
			GET: async () => {
				logPostHogInfo("rss feed requested", {
					route: "/rss.xml",
				});
				return new Response(await getRSS(), {
					headers: {
						"Content-Type": "application/xml",
					},
				});
			},
		},
	},
});
