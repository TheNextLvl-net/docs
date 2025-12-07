import browserCollections from "fumadocs-mdx:collections/browser";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { PathUtils } from "fumadocs-core/source";
import type { TOCItemType } from "fumadocs-core/toc";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { lastEdit } from "@/lib/api";
import { blog } from "@/lib/source";

export const Route = createFileRoute("/(home)/blog/$slug")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const data = await serverLoader({ data: params.slug });
		await clientLoader.preload(data.path);
		return data;
	},
});

const serverLoader = createServerFn({
	method: "GET",
})
	.inputValidator((slug: string) => slug)
	.handler(async ({ data: slug }) => {
		const page = blog.getPage([slug]);
		if (!page) throw notFound();

		const editDate = await lastEdit(page);

		return {
			path: page.path,
			title: page.data.title,
			description: page.data.description,
			author: page.data.author,
			lastModified:
				editDate?.toISOString() ??
				PathUtils.basename(page.path, PathUtils.extname(page.path)),
		};
	});

function TableOfContents({ toc }: { toc: TOCItemType[] }) {
	if (toc.length === 0) return null;

	return (
		<aside className="hidden lg:block">
			<div className="sticky top-24 rounded-lg border border-fd-border p-4">
				<h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-fd-secondary-foreground">
					On This Page
				</h3>
				<nav className="space-y-1">
					{toc.map((item) => (
						<Link
							key={item.url}
							to={item.url}
							className="block rounded-md py-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground"
							style={{ paddingLeft: `${(item.depth - 1) * 12}px` }}
						>
							{item.title}
						</Link>
					))}
				</nav>
			</div>
		</aside>
	);
}

const clientLoader = browserCollections.blogPosts.createClientLoader({
	component({ toc, default: MDX }) {
		return (
			<div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
				<article className="prose prose-invert max-w-3xl">
					<MDX components={defaultMdxComponents} />
				</article>
				<TableOfContents toc={toc} />
			</div>
		);
	},
});

function RouteComponent() {
	const data = Route.useLoaderData();
	const Content = clientLoader.getComponent(data.path);

	return (
		<>
			<header className="border-b border-fd-border">
				<div className="container mx-auto px-4 py-12 md:py-16">
					<div className="mx-auto max-w-7xl">
						<div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
							<div className="max-w-3xl">
								<nav className="mb-6 text-sm text-fd-muted-foreground">
									<Link className="hover:text-fd-foreground" to="/blog">
										Blog
									</Link>
									<span className="mx-2">/</span>
									<span className="text-fd-foreground">{data.title}</span>
								</nav>
								<h1 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
									{data.title}
								</h1>
								{data.description && (
									<p className="mt-4 text-lg leading-relaxed text-fd-muted-foreground">
										{data.description}
									</p>
								)}
								<div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-fd-muted-foreground">
									{data.author && (
										<div className="flex items-center gap-2">
											<span className="text-fd-muted-foreground">By</span>
											<span className="font-medium text-fd-foreground">
												{data.author}
											</span>
										</div>
									)}
									<div className="h-4 w-px bg-fd-muted-foreground" />
									<time>
										{new Date(data.lastModified).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</time>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 py-10">
				<div className="mx-auto max-w-7xl">
					<Content />
				</div>
			</main>
		</>
	);
}
