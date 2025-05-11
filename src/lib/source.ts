import { docs } from "@/.source"
import { loader } from "fumadocs-core/source"
import { createElement } from "react"
import { DynamicIcon } from "lucide-react/dynamic"
import dynamicIconImports from "lucide-react/dynamicIconImports"
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon: string | undefined) {
    if (icon && icon in dynamicIconImports) {
      return createElement(DynamicIcon, {
        name: icon as keyof typeof dynamicIconImports,
      })
    }
    return undefined
  },
})
