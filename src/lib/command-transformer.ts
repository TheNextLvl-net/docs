import type { ShikiTransformer, ThemedToken } from '@shikijs/types'
import { getCommandColor } from './command-colors'

interface ColorContentRange {
  start: number
  end: number
  color: string
}

interface HideRange {
  start: number
  end: number
}

interface MetaRanges {
  contents: ColorContentRange[]
  hides: HideRange[]
}

function detectRanges(code: string): MetaRanges {
  const contents: ColorContentRange[] = []
  const hides: HideRange[] = []

  const re = /<([A-Za-z]+)>([\s\S]*?)<\/\1>/g
  let match: RegExpExecArray | null
  while ((match = re.exec(code)) !== null) {
    const [full, colorName, inner] = match
    const openStart = match.index
    const openEnd = openStart + `<${colorName}>`.length
    const closeEnd = openStart + full.length
    const closeStart = closeEnd - `</${colorName}>`.length
    hides.push({ start: openStart, end: openEnd })
    hides.push({ start: closeStart, end: closeEnd })
    contents.push({ start: openEnd, end: closeStart, color: colorName })
  }

  return { contents, hides }
}

function splitTokenAtOffsets(token: ThemedToken, breakpoints: number[]): ThemedToken[] {
  if (!breakpoints.length) return [token]
  const local = Array.from(new Set(breakpoints.filter(bp => bp > token.offset && bp < token.offset + token.content.length)))
    .sort((a, b) => a - b)

  if (!local.length) return [token]

  const result: ThemedToken[] = []
  let last = 0
  for (const bp of local) {
    const idx = bp - token.offset
    if (idx > last) {
      result.push({ ...token, content: token.content.slice(last, idx), offset: token.offset + last })
    }
    last = idx
  }
  if (last < token.content.length) {
    result.push({ ...token, content: token.content.slice(last), offset: token.offset + last })
  }
  return result
}

export function transformerCommandColor(): ShikiTransformer {
  const map = new WeakMap<object, MetaRanges>()

  return {
    name: 'color-tags',
    preprocess(code) {
      const ranges = detectRanges(code)
      const metaKey = (this as unknown as { meta?: object }).meta ?? {}
      map.set(metaKey, ranges)
      return undefined
    },
    tokens(lines) {
      const metaKey = (this as unknown as { meta?: object }).meta ?? {}
      const ranges = map.get(metaKey)
      if (!ranges) return lines

      return lines.map((line) => {
        if (!line.length) return line

        const start = line[0]
        const end = line[line.length - 1]
        const lineStart = start.offset
        const lineEnd = end.offset + end.content.length

        const bps: number[] = []
        for (const r of [...ranges.hides, ...ranges.contents]) {
          if (r.start > lineStart && r.start < lineEnd) bps.push(r.start)
          if (r.end > lineStart && r.end < lineEnd) bps.push(r.end)
        }

        if (!bps.length) return line

        const splitted = line.flatMap(t => splitTokenAtOffsets(t, bps))

        const styled: ThemedToken[] = splitted.map(seg => {
          const inHide = ranges.hides.some(r => r.start <= seg.offset && seg.offset + seg.content.length <= r.end)
          if (inHide) {
            return {
              ...seg,
              htmlStyle: { ...(seg.htmlStyle || {}), display: 'none' },
            }
          }

          const contentRange = ranges.contents.find(r => r.start <= seg.offset && seg.offset + seg.content.length <= r.end)
          if (contentRange) {
            const cfg = getCommandColor(contentRange.color)
            if (cfg) {
              return {
                ...seg,
                htmlStyle: { ...(seg.htmlStyle || {}), color: cfg.hsl },
              }
            }
          }

          return seg
        })

        return styled
      })
    },
  }
}
