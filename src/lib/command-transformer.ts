import type { ShikiTransformer, ThemedToken } from "@shikijs/types";
import { getCommandColor } from "./command-colors";

interface Range {
	start: number;
	end: number;
}

interface ColorRange extends Range {
	color: string;
}

interface ParsedRanges {
	colors: ColorRange[];
	hidden: Range[];
}

const TAG_REGEX = /<([A-Za-z_+-]+)>([\s\S]*?)<\/\1>/g;

function parseColorTags(code: string): ParsedRanges {
	const colors: ColorRange[] = [];
	const hidden: Range[] = [];

	for (const match of code.matchAll(TAG_REGEX)) {
		const [full, tagName] = match;
		const tagStart = match.index;
		const openTagEnd = tagStart + `<${tagName}>`.length;
		const closeTagStart = tagStart + full.length - `</${tagName}>`.length;
		const closeTagEnd = tagStart + full.length;

		hidden.push({ start: tagStart, end: openTagEnd });
		hidden.push({ start: closeTagStart, end: closeTagEnd });
		colors.push({ start: openTagEnd, end: closeTagStart, color: tagName });
	}

	return { colors, hidden };
}

function isWithinRange(token: ThemedToken, range: Range): boolean {
	return (
		range.start <= token.offset &&
		token.offset + token.content.length <= range.end
	);
}

function getBreakpoints(
	ranges: ParsedRanges,
	lineStart: number,
	lineEnd: number,
): number[] {
	const points = new Set<number>();

	for (const range of [...ranges.hidden, ...ranges.colors]) {
		if (range.start > lineStart && range.start < lineEnd)
			points.add(range.start);
		if (range.end > lineStart && range.end < lineEnd) points.add(range.end);
	}

	return [...points].sort((a, b) => a - b);
}

function splitToken(token: ThemedToken, breakpoints: number[]): ThemedToken[] {
	const localBreaks = breakpoints.filter(
		(bp) => bp > token.offset && bp < token.offset + token.content.length,
	);

	if (!localBreaks.length) return [token];

	const result: ThemedToken[] = [];
	let cursor = 0;

	for (const bp of localBreaks) {
		const splitIndex = bp - token.offset;
		if (splitIndex > cursor) {
			result.push({
				...token,
				content: token.content.slice(cursor, splitIndex),
				offset: token.offset + cursor,
			});
		}
		cursor = splitIndex;
	}

	if (cursor < token.content.length) {
		result.push({
			...token,
			content: token.content.slice(cursor),
			offset: token.offset + cursor,
		});
	}

	return result;
}

function applyColorToToken(
	token: ThemedToken,
	ranges: ParsedRanges,
): ThemedToken {
	const colorRange = ranges.colors.find((r) => isWithinRange(token, r));
	if (!colorRange) return token;

	const color = getCommandColor(colorRange.color);
	if (!color) return token;

	return {
		...token,
		htmlStyle: { ...(token.htmlStyle || {}), color },
	};
}

export function transformerCommandColor(): ShikiTransformer {
	const rangeCache = new WeakMap<object, ParsedRanges>();

	return {
		name: "color-tags",
		preprocess(code) {
			const metaKey = (this as unknown as { meta?: object }).meta ?? {};
			rangeCache.set(metaKey, parseColorTags(code));
			return undefined;
		},
		tokens(lines) {
			const metaKey = (this as unknown as { meta?: object }).meta ?? {};
			const ranges = rangeCache.get(metaKey);
			if (!ranges) return lines;

			return lines.map((line) => {
				if (!line.length) return line;

				const lineStart = line[0].offset;
				const lastToken = line[line.length - 1];
				const lineEnd = lastToken.offset + lastToken.content.length;

				const breakpoints = getBreakpoints(ranges, lineStart, lineEnd);
				if (!breakpoints.length) return line;

				return line
					.flatMap((token) => splitToken(token, breakpoints))
					.filter(
						(token) => !ranges.hidden.some((r) => isWithinRange(token, r)),
					)
					.map((token) => applyColorToToken(token, ranges));
			});
		},
	};
}
