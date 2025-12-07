import { getGithubLastEdit } from "fumadocs-core/content/github";
import type { Page } from "fumadocs-core/source";

export async function latestVersion(project: string): Promise<string> {
	const response = await fetch(
		`https://repo.thenextlvl.net/api/maven/latest/version/releases/net/thenextlvl/${project}`,
		{
			cache: "force-cache",
		},
	);

	if (!response.ok) {
		return "VERSION";
	}

	const data = await response.json();
	return data.version;
}

export async function lastEdit(page: Page): Promise<Date> {
	const time = await getGithubLastEdit({
		owner: "TheNextLvl-net",
		repo: "docs",
		token: process.env.GITHUB_TOKEN
			? `Bearer ${process.env.GITHUB_TOKEN}`
			: undefined,
		path: `content/docs/${page.path}`,
	}).catch((error) => {
		console.error("Error fetching last edit date:", error);
		return new Date();
	});
	return time ? time : new Date();
}

export async function lastEditFromPath(
	filePath: string,
): Promise<Date | undefined> {
	const contentIndex = filePath.indexOf("content/");
	if (contentIndex === -1) return undefined;

	const relativePath = filePath.slice(contentIndex);
	const time = await getGithubLastEdit({
		owner: "TheNextLvl-net",
		repo: "docs",
		token: process.env.GITHUB_TOKEN
			? `Bearer ${process.env.GITHUB_TOKEN}`
			: undefined,
		path: relativePath,
	}).catch((error) => {
		console.error("Error fetching last edit date:", error);
		return undefined;
	});
	return time ? time : undefined;
}
