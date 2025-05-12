import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import Image from "next/image"
import { SiDiscord } from "@icons-pack/react-simple-icons"
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image src="/logo.png" alt="TheNextLvl" width={24} height={24} />
        TheNextLvl
      </>
    ),
  },
  links: [
    {
      type: "icon",
      label: "Discord",
      icon: <SiDiscord />,
      text: "Discord",
      url: "https://thenextlvl.net/discord",
    },
  ],
  githubUrl: "https://github.com/TheNextLvl-net",
}
