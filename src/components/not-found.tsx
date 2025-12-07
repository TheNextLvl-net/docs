import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		<main className="flex h-screen flex-col items-center justify-center text-center">
			<div className="space-y-4">
				<h1 className="text-6xl font-bold text-[#141312] dark:text-[#f6f5f3]">
					404
				</h1>
				<h2 className="text-2xl font-regular text-muted-foreground font-inter">
					Oops! Page Not Found.
				</h2>
				<p className="text-lg text-muted-foreground">
					We couldn&apos;t find the page you were looking for.
				</p>
				<Link to="/">Go back home</Link>
			</div>
		</main>
	);
}
