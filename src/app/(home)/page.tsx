import { Card } from "fumadocs-ui/components/card"
import {
  Command,
  Globe,
  Shield,
  User,
  Brush,
  Text,
  Video,
  Archive,
  Landmark,
  Wrench,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

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
    className: "h-64 group",
    href: "docs/worlds",
  },
  {
    title: "Tweaks",
    icon: Wrench,
    description: "An Essentials-like, must have command collection for your minecraft server.",
    className: "h-64 group",
    href: "docs/tweaks",
  },
]

const otherCards: CardData[] = [
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
    title: "Charachters",
    icon: User,
    description: "A modern, fully featured npc plugin for paper servers",
    href: "docs/charachters",
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
    icon: Text,
    description: "modern hologram plugin using the new display api",
    href: "docs/holograms",
    className: "group",
  },
]

export default function HomePage() {
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

      <div className="grid md:grid-cols-2 gap-6 mb-16">
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
