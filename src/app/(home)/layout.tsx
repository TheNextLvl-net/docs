import type { ReactNode } from "react"
import { HomeLayout } from "fumadocs-ui/layouts/home"
import { baseOptions } from "@/app/layout.config"
import { SiDiscord } from "@icons-pack/react-simple-icons"
import { RssIcon } from "lucide-react"

export default function Layout({ children }: { children: ReactNode }) {
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
      {children}
    </HomeLayout>
  )
}
