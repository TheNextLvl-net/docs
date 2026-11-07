import { useTrack } from "@faststats/react";
import { useFetchSearch } from "fumadocs-core/search/client";
import {
	SearchDialog,
	SearchDialogClose,
	SearchDialogContent,
	SearchDialogHeader,
	SearchDialogIcon,
	SearchDialogInput,
	SearchDialogList,
	SearchDialogOverlay,
	type SearchItemType,
	type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { useEffect } from "react";

// Wait until the user stops typing so partial queries aren't tracked.
const TRACK_DELAY_MS = 1000;

export default function DocsSearchDialog(props: SharedProps) {
	const search = useFetchSearch({ api: "/api/search" });
	const track = useTrack();
	const { data, isLoading } = search;

	useEffect(() => {
		const query = data?.query.trim();
		if (isLoading || !query) return;
		const timeout = setTimeout(() => {
			track("search", { query, results: data?.items.length ?? 0 });
		}, TRACK_DELAY_MS);
		return () => clearTimeout(timeout);
	}, [data, isLoading, track]);

	function onSelect(item: SearchItemType) {
		if (item.type === "action") return;
		track("search_result_click", {
			query: search.search.trim(),
			url: item.url,
			type: item.type,
		});
	}

	return (
		<SearchDialog {...search} {...props} onSelect={onSelect}>
			<SearchDialogOverlay />
			<SearchDialogContent>
				<SearchDialogHeader>
					<SearchDialogIcon />
					<SearchDialogInput />
					<SearchDialogClose />
				</SearchDialogHeader>
				<SearchDialogList />
			</SearchDialogContent>
		</SearchDialog>
	);
}
