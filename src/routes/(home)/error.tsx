import { createFileRoute } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
	AlertTriangle,
	Bug,
	Clock,
	Code,
	Flame,
	Timer,
	Zap,
} from "lucide-react";

export const Route = createFileRoute("/(home)/error")({
	component: RouteComponent,
});

class CustomPluginError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "CustomPluginError";
	}
}

interface ErrorTrigger {
	label: string;
	description: string;
	icon: LucideIcon;
	variant: "default" | "warning" | "danger";
	action: () => void;
}

const errorTriggers: ErrorTrigger[] = [
	{
		label: "Standard Error",
		description: "A plain Error thrown synchronously in an event handler.",
		icon: Bug,
		variant: "default",
		action: () => {
			throw new Error("Test error from error page");
		},
	},
	{
		label: "TypeError",
		description: "Simulates accessing a property on null or undefined.",
		icon: AlertTriangle,
		variant: "warning",
		action: () => {
			throw new TypeError(
				"Cannot read properties of undefined (reading 'world')",
			);
		},
	},
	{
		label: "ReferenceError",
		description: "Simulates using a variable that was never declared.",
		icon: Code,
		variant: "warning",
		action: () => {
			throw new ReferenceError("playerData is not defined");
		},
	},
	{
		label: "RangeError",
		description: "Simulates an invalid numeric range, like a bad array length.",
		icon: Flame,
		variant: "danger",
		action: () => {
			throw new RangeError("Invalid array length: -1");
		},
	},
	{
		label: "Custom Error",
		description: "A custom Error subclass with a distinct name for grouping.",
		icon: Zap,
		variant: "default",
		action: () => {
			throw new CustomPluginError("Failed to load world configuration");
		},
	},
	{
		label: "Error with cause",
		description:
			"An Error that wraps an underlying failure via the cause field.",
		icon: AlertTriangle,
		variant: "default",
		action: () => {
			throw new Error("World save failed", {
				cause: new Error("Disk quota exceeded"),
			});
		},
	},
	{
		label: "String throw",
		description:
			"A non-Error value thrown, which some trackers still need to catch.",
		icon: Code,
		variant: "warning",
		action: () => {
			throw "Unexpected server response";
		},
	},
	{
		label: "Unhandled rejection",
		description: "A rejected promise with no catch handler attached.",
		icon: Timer,
		variant: "danger",
		action: () => {
			void Promise.reject(new Error("Async chunk load failed"));
		},
	},
	{
		label: "Delayed error",
		description: "An error thrown inside setTimeout, outside the click stack.",
		icon: Clock,
		variant: "danger",
		action: () => {
			setTimeout(() => {
				throw new Error("Delayed task crashed after 100ms");
			}, 100);
		},
	},
	{
		label: "Runtime type error",
		description: "Triggers a real TypeError by dereferencing null at runtime.",
		icon: Flame,
		variant: "danger",
		action: () => {
			const data = null as unknown as { config: { enabled: boolean } };
			void data.config.enabled;
		},
	},
];

const variantStyles = {
	default: "border-fd-border hover:border-fd-primary/40 hover:bg-fd-accent/10",
	warning: "border-amber-500/30 hover:border-amber-500/50 hover:bg-amber-500/5",
	danger: "border-red-500/30 hover:border-red-500/50 hover:bg-red-500/5",
} as const;

const iconVariantStyles = {
	default: "text-fd-muted-foreground group-hover:text-fd-primary",
	warning: "text-amber-500/70 group-hover:text-amber-500",
	danger: "text-red-500/70 group-hover:text-red-500",
} as const;

function RouteComponent() {
	return (
		<main className="container mx-auto px-4 py-12 md:py-16">
			<div className="mx-auto max-w-3xl space-y-10">
				<header className="space-y-3 text-center">
					<p className="text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
						Internal only
					</p>
					<h1 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
						Error tracking playground
					</h1>
					<p className="text-lg leading-relaxed text-fd-muted-foreground">
						This page exists to test FastStats error tracking. Pick a scenario
						below to throw a different kind of failure.
					</p>
				</header>

				<div className="grid gap-3 sm:grid-cols-2">
					{errorTriggers.map((trigger) => (
						<button
							key={trigger.label}
							type="button"
							onClick={trigger.action}
							className={`group flex flex-col gap-3 rounded-lg border p-4 text-left transition-colors ${variantStyles[trigger.variant]}`}
						>
							<div className="flex items-center gap-3">
								<trigger.icon
									className={`size-4 shrink-0 ${iconVariantStyles[trigger.variant]}`}
								/>
								<span className="font-medium text-fd-foreground">
									{trigger.label}
								</span>
							</div>
							<p className="text-sm leading-relaxed text-fd-muted-foreground">
								{trigger.description}
							</p>
						</button>
					))}
				</div>
			</div>
		</main>
	);
}
