import { SeverityNumber } from "@opentelemetry/api-logs";
import {
	LoggerProvider,
	SimpleLogRecordProcessor,
} from "@opentelemetry/sdk-logs";
import { PostHogLogExporter } from "@posthog/otel";

let loggerProvider: LoggerProvider | undefined;
let applicationLogger: ReturnType<LoggerProvider["getLogger"]> | undefined;
let warnedAboutMissingConfiguration = false;

function getApplicationLogger() {
	if (applicationLogger) return applicationLogger;

	const apiKey =
		process.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN ||
		import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
	const host =
		process.env.VITE_PUBLIC_POSTHOG_HOST ||
		import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

	if (!apiKey || !host) {
		if (!warnedAboutMissingConfiguration && process.env.NODE_ENV !== "production") {
			const missingVariable = apiKey
				? "VITE_PUBLIC_POSTHOG_HOST"
				: "VITE_PUBLIC_POSTHOG_PROJECT_TOKEN";
			console.warn(
				`${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
			);
			warnedAboutMissingConfiguration = true;
		}
		return;
	}

	loggerProvider = new LoggerProvider({
		processors: [
			new SimpleLogRecordProcessor(new PostHogLogExporter({ apiKey, host })),
		],
	});
	applicationLogger = loggerProvider.getLogger("thenextlvl-docs-posthog");

	process.once("beforeExit", () => {
		void loggerProvider?.shutdown().catch(() => {});
	});

	return applicationLogger;
}

export function logDocumentationService(message: string) {
	getApplicationLogger()?.emit({
		severityNumber: SeverityNumber.INFO,
		severityText: "INFO",
		body: message,
	});
}
