import "./global.css"
import { RootProvider } from "fumadocs-ui/provider/next"
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
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        {process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN && process.env.NEXT_PUBLIC_ANALYTICS_URL && (
          <>
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
          </>
        )}
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
