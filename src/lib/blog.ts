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
