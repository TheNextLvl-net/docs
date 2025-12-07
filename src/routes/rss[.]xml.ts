import { createFileRoute } from "@tanstack/react-router";
import { getRSS } from "@/lib/rss";

export const Route = createFileRoute("/rss.xml")({
	server: {
		handlers: {
			GET: async () => {
				return new Response(await getRSS(), {
					headers: {
						"Content-Type": "application/xml",
					},
				});
			},
		},
	},
});
