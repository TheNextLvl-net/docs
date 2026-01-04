import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { blog } from "@/lib/source";

export const getBlogPosts = createServerFn({
	method: "GET",
}).handler(async () => {
	const posts = blog.getPages().sort((a, b) => {
		const dateA = new Date(a.data.date ?? 0);
		const dateB = new Date(b.data.date ?? 0);
		return dateB.getTime() - dateA.getTime();
	});

	return posts.map((post) => {
		let wordCount = 0;
		post.data.structuredData.contents.forEach((content) => {
			wordCount += content.content.split(/\s+/).length;
		});

		return {
			url: post.url,
			path: post.path,
			data: {
				title: post.data.title,
				description: post.data.description,
				date: post.data.date,
				author: post.data.author,
				category: post.data.category,
				readingTime: Math.ceil(wordCount / 238),
			},
		};
	});
});

export const getBlogPost = createServerFn({
	method: "GET",
})
	.inputValidator((slug: string) => slug)
	.handler(async ({ data: slug }) => {
		const page = blog.getPage([slug]);
		if (!page) throw notFound();

		let wordCount = 0;
		page.data.structuredData.contents.forEach((content) => {
			wordCount += content.content.split(/\s+/).length;
		});

		return {
			path: page.path,
			data: {
				title: page.data.title,
				description: page.data.description,
				date: page.data.date,
				author: page.data.author,
				readingTime: Math.ceil(wordCount / 238),
			},
		};
	});
