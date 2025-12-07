import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Code, File, FileText, RotateCcw } from "lucide-react";
import { useState } from "react";
import { getBlogPosts } from "@/lib/blog";

export const Route = createFileRoute("/(home)/blog/")({
	component: RouteComponent,
	loader: async () => await getBlogPosts(),
});

type Category = "devlog" | "updates" | "other";

const categoryIcons: Record<string, React.ReactNode> = {
	"All Posts": <BookOpen className="w-4 h-4" />,
	devlog: <Code className="w-4 h-4" />,
	updates: <RotateCcw className="w-4 h-4" />,
	other: <FileText className="w-4 h-4" />,
};

function RouteComponent() {
	const posts = Route.useLoaderData();
	const [selectedCategory, setSelectedCategory] = useState("All Posts");

	const categories = [
		"All Posts",
		...[...new Set(posts.map((post) => post.data.category))].filter(
			(category): category is Category => Boolean(category),
		),
	];

	const filteredPosts =
		selectedCategory === "All Posts"
			? posts
			: posts.filter((post) => post.data.category === selectedCategory);

	return (
		<>
			<header className="border-b border-fd-border">
				<div className="container mx-auto px-4 py-12 md:py-16">
					<div className="mx-auto max-w-7xl">
						<h1 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
							Blog
						</h1>
						<p className="mt-4 text-lg leading-relaxed text-fd-muted-foreground">
							Updates, devlogs, and notes from the team.
						</p>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 py-10">
				<div className="mx-auto max-w-7xl">
					<div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
						<section className="space-y-4">
							{filteredPosts.map((post) => (
								<Link
									to={post.url}
									key={post.path}
									className="group block rounded-lg border border-fd-border transition-colors hover:bg-fd-accent/10"
								>
									<article className="p-6">
										<h2 className="text-2xl font-semibold text-fd-foreground group-hover:text-fd-foreground/90">
											{post.data.title}
										</h2>
										{post.data.description && (
											<p className="mt-2 text-sm text-fd-muted-foreground">
												{post.data.description}
											</p>
										)}
										<div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-fd-muted-foreground">
											<span className="inline-flex items-center gap-2">
												{categoryIcons[post.data.category ?? "other"] ?? (
													<File className="w-4 h-4" />
												)}{" "}
												{post.data.category ?? "other"}
											</span>
											<div className="h-3 w-px bg-fd-border" />
											<time>
												{new Date(
													post.data.lastModified ?? new Date().toISOString(),
												).toLocaleDateString("en-US", {
													month: "long",
													day: "numeric",
													year: "numeric",
												})}
											</time>
										</div>
									</article>
								</Link>
							))}
						</section>

						<aside className="hidden lg:block">
							<div className="sticky top-24 rounded-lg border border-fd-border p-4">
								<h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-fd-secondary-foreground">
									Filter
								</h3>
								<nav className="space-y-4 text-sm uppercase text-fd-muted-foreground">
									{categories.map((category) => (
										<button
											key={category}
											type="button"
											onClick={() => setSelectedCategory(category)}
											className={`flex items-center gap-2 text-left transition-colors hover:text-fd-foreground uppercase text-md ${
												selectedCategory === category
													? "text-fd-foreground"
													: ""
											}`}
										>
											{categoryIcons[category] ?? <File className="w-4 h-4" />}
											{category}
										</button>
									))}
								</nav>
							</div>
						</aside>
					</div>
				</div>
			</main>
		</>
	);
}
