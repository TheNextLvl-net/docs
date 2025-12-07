import { SiDiscord } from "@icons-pack/react-simple-icons";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { RssIcon } from "lucide-react";
import { baseOptions } from "@/lib/layout.shared";

export const Route = createFileRoute("/(home)")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<HomeLayout
			{...baseOptions}
			links={[
				{
					type: "icon",
					icon: <RssIcon />,
					text: "Blog",
					url: "/blog",
				},
				{
					type: "icon",
					icon: <SiDiscord />,
					text: "Discord",
					url: "/discord",
				},
			]}
		>
			<Outlet />
		</HomeLayout>
	);
}
