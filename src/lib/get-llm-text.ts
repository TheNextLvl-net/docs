import type { InferPageType } from "fumadocs-core/source";
import { remarkInclude } from "fumadocs-mdx/config";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import type { source } from "@/lib/source";

const processor = remark().use(remarkMdx).use(remarkInclude).use(remarkGfm);

export async function getLLMText(page: InferPageType<typeof source>) {
	const processed = await processor.process({
		path: page.data.info.fullPath,
		value: await page.data.getText("raw"),
	});

	return `# ${page.data.title}
URL: ${page.url}

${page.data.description}

${processed.value}`;
}
