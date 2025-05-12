import "./global.css"
import { RootProvider } from "fumadocs-ui/provider"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "TheNextLvl",
  description:
    "TheNextLvl is a community-driven Minecraft server that provides a safe and fun environment for players of all ages.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
