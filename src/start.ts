import {
	createCsrfMiddleware,
	createStart,
} from "@tanstack/react-start";
import { PostHog } from "posthog-node";

const projectToken =
	process.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN ??
	import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host =
	process.env.VITE_PUBLIC_POSTHOG_HOST ??
	import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

export const posthogServer =
	projectToken && host
		? new PostHog(projectToken, {
				host,
				enableExceptionAutocapture: true,
			})
		: undefined;

if (!posthogServer && process.env.NODE_ENV !== "production") {
	const missingVariable = projectToken
		? "VITE_PUBLIC_POSTHOG_HOST"
		: "VITE_PUBLIC_POSTHOG_PROJECT_TOKEN";
	console.warn(
		`${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
	);
}

export const startInstance = createStart(() => ({
	requestMiddleware: [
		createCsrfMiddleware({
			filter: ({ handlerType }) => handlerType === "serverFn",
		}),
	],
}));
