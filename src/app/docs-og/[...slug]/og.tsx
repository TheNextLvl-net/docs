import { ImageResponse } from "next/og"
import type { ReactElement, ReactNode } from "react"
import type { ImageResponseOptions } from "next/dist/compiled/@vercel/og/types"

interface GenerateProps {
  title: ReactNode
  description?: ReactNode
  primaryTextColor?: string
}

export function generateOGImage(options: GenerateProps & ImageResponseOptions): ImageResponse {
  const { title, description, primaryTextColor, ...rest } = options

  return new ImageResponse(
    generate({
      title,
      description,
      primaryTextColor,
    }),
    {
      width: 1200,
      height: 630,
      ...rest,
    },
  )
}

export function generate({
  primaryTextColor = "rgb(255,150,255)",
  ...props
}: GenerateProps): ReactElement {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        color: "white",
        backgroundColor: "rgb(10,10,10)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "4rem",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: "76px",
          }}
        >
          {props.title}
        </p>
        <p
          style={{
            fontSize: "48px",
            color: "rgba(240,240,240,0.7)",
          }}
        >
          {props.description}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "24px",
            marginTop: "auto",
            color: primaryTextColor,
          }}
        >
          {process.env.NEXT_PUBLIC_BASE_URL && (
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`}
              width="60"
              height="60"
              alt="Logo"
            />
          )}
          <p
            style={{
              fontSize: "46px",
              fontWeight: 600,
            }}
          >
            TheNextLvl
          </p>
        </div>
      </div>
    </div>
  )
}
