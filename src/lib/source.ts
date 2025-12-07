import { blogPosts, docs } from "fumadocs-mdx:collections/server";
import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { icons } from "lucide-react";
import { createElement } from "react";

function getIcon(icon: string | undefined) {
	if (!icon) {
		return;
	}
	if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
}

export const source = loader({
	baseUrl: "/docs",
	source: docs.toFumadocsSource(),
	icon(icon) {
		return getIcon(icon);
	},
});

export const blog = loader(toFumadocsSource(blogPosts, []), {
	baseUrl: "/blog",
	icon(icon) {
		return getIcon(icon);
	},
});
