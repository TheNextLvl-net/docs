import "./global.css"
import { RootProvider } from "fumadocs-ui/provider"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
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
        <Script
          defer
          data-domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
          src={process.env.NEXT_PUBLIC_ANALYTICS_URL}
          id="plausible-script"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
          }}
          id="plausible-window"
        />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
