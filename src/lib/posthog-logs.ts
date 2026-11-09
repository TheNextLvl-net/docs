import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
	BatchLogRecordProcessor,
	LoggerProvider,
} from "@opentelemetry/sdk-logs";

const projectToken =
	process.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN ??
	import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host =
	process.env.VITE_PUBLIC_POSTHOG_HOST ??
	import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

let posthogLogger: ReturnType<LoggerProvider["getLogger"]> | undefined;

if (!projectToken || !host) {
	if (process.env.NODE_ENV !== "production") {
		const missingVariable = projectToken
			? "VITE_PUBLIC_POSTHOG_HOST"
			: "VITE_PUBLIC_POSTHOG_PROJECT_TOKEN";
		console.warn(
			`${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
		);
	}
} else {
	const loggerProvider = new LoggerProvider({
		resource: resourceFromAttributes({
			"service.name": "thenextlvl-docs",
		}),
		processors: [
			new BatchLogRecordProcessor({
				exporter: new OTLPLogExporter({
					url: `${host.replace(/\/$/, "")}/i/v1/logs`,
					headers: {
						Authorization: `Bearer ${projectToken}`,
					},
				}),
			}),
		],
	});

	posthogLogger = loggerProvider.getLogger("posthog-exporter");

	for (const signal of ["SIGINT", "SIGTERM"] as const) {
		process.once(signal, () => {
			const timeout = new Promise<void>((resolve) => {
				setTimeout(resolve, 3000).unref();
			});
			void Promise.race([loggerProvider.shutdown(), timeout])
				.catch(() => undefined)
				.finally(() => process.kill(process.pid, signal));
		});
	}
}

export function logPostHogInfo(
	body: string,
	attributes: Record<string, string>,
) {
	posthogLogger?.emit({
		severityText: "info",
		body,
		attributes,
	});
}
