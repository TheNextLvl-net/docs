import { createFileRoute } from "@tanstack/react-router"
import { Card } from "fumadocs-ui/components/card"
import type { LucideIcon } from "lucide-react"
import {
  Globe,
  Group,
  Shell,
  User,
  Wrench,
  Archive,
  Landmark,
  Shield,
  ShieldAlert,
  TextAlignStart,
  Video,
  Brush,
  Command,
  BrickWall,
} from "lucide-react"

export const Route = createFileRoute("/(home)/")({
  component: RouteComponent,
})

interface CardData {
  title: string
  icon: LucideIcon
  description: string
  href: string
  className?: string
}

const featuredCards: CardData[] = [
  {
    title: "Worlds",
    icon: Globe,
    description: "World management plugin for modern Paper and Folia servers",
    className: "h-48 group",
    href: "docs/worlds",
  },
  {
    title: "PerWorlds",
    icon: Group,
    description: "A modern alternative to Multiverse-Inventories.",
    href: "docs/perworlds",
    className: "h-48 group",
  },
  {
    title: "Portals",
    icon: Shell,
    description: "Create custom portals to travel between your worlds and servers",
    href: "docs/portals",
    className: "h-48 group",
  },
]

const otherCards: CardData[] = [
  {
    title: "Characters",
    icon: User,
    description: "A modern, fully featured npc plugin for paper servers",
    href: "docs/characters",
  },
  {
    title: "Tweaks",
    icon: Wrench,
    description: "An Essentials-like, must have command collection for your minecraft server.",
    href: "docs/tweaks",
    className: "group",
  },
  {
    title: "ServiceIO",
    icon: Archive,
    description: "Modern drop-in replacement for vault.",
    href: "docs/serviceio",
    className: "group",
  },
  {
    title: "Economist",
    icon: Landmark,
    description: "A modern economy plugin.",
    href: "docs/economist",
    className: "group",
  },
  {
    title: "Protect",
    icon: Shield,
    description: "A modern, WorldGuard-like, protection plugin with robust API",
    href: "docs/protect",
    className: "group",
  },
  {
    title: "Cinematics",
    icon: Video,
    description: "A plugin to create cinematic transitions",
    href: "docs/cinematics",
    className: "group",
  },
  {
    title: "goPaintAdvanced",
    icon: Brush,
    description: "Based on the original goPaint but modern and fast",
    href: "docs/gopaintadvanced",
    className: "group",
  },
  {
    title: "Commander",
    icon: Command,
    description: "Remove, hide or change or query permissions of commands",
    href: "docs/commander",
    className: "group",
  },
  {
    title: "Holograms",
    icon: TextAlignStart,
    description: "A modern hologram plugin using the new display api",
    href: "docs/holograms",
    className: "group",
  },
  {
    title: "CreativeUtilities",
    icon: BrickWall,
    description: "Utilities that help you building in creative mode",
    href: "docs/creativeutilities",
    className: "group",
  },
  {
    title: "RedProtect",
    icon: ShieldAlert,
    description: "Prevent redstone clocks that might lag the server",
    href: "docs/redprotect",
    className: "group",
  },
]

function RouteComponent() {
  return (
    <main className="container mx-auto my-12 space-y-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold text-[#141312] dark:text-[#f6f5f3]">
          Welcome to TheNextLvl Docs.
        </h1>
        <h2 className="text-2xl font-regular text-muted-foreground font-inter">
          Explore our guides, API references, and more.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {featuredCards.map((card) => (
          <Card
            key={card.href}
            title={card.title}
            icon={<card.icon className="group-hover:text-fd-primary" />}
            description={card.description}
            className={card.className}
            href={card.href}
            external={false}
          />
        ))}
      </div>

      <main className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Need help getting started?</h2>
          <p className="text-xl text-muted-foreground">Check out these resources.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {otherCards.map((card) => (
            <Card
              key={card.href}
              title={card.title}
              icon={<card.icon className="group-hover:text-fd-primary" />}
              description={card.description}
              className={card.className}
              href={card.href}
              external={false}
            />
          ))}
        </div>
      </main>
    </main>
  )
}
