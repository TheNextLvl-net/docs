import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
import "@/lib/posthog-server";

export default createServerEntry({
	fetch(request) {
		return handler.fetch(request);
	},
});
