import ImageResponse from "@takumi-rs/image-response";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { OgImage } from "@/components/og-image";
import { source } from "@/lib/source";

export const Route = createFileRoute("/docs-og/$")({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const splatPath = params._splat ?? "";
				const slugs = splatPath
					.replace(/\/image\.png$/, "")
					.split("/")
					.filter(Boolean);
				const page = source.getPage(slugs);
				if (!page) throw notFound();

				return new ImageResponse(
					<OgImage
						title={page.data.title}
						description={page.data.description}
					/>,
					{
						width: 1200,
						height: 630,
						format: "webp",
					},
				);
			},
		},
	},
});
