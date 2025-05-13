import type { ReactNode } from "react"
import { HomeLayout } from "fumadocs-ui/layouts/home"
import { baseOptions } from "@/app/layout.config"
import { SiDiscord } from "@icons-pack/react-simple-icons"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          type: "icon",
          icon: <SiDiscord />,
          text: "Discord",
          url: "https://thenextlvl.net/discord",
        },
      ]}
    >
      {children}
    </HomeLayout>
  )
}
