export interface CommandColor {
  hsl: string;
}

/**
 * Represents a color used by the command highlighter.
 * Currently only HSL is used by the transformer for inline styles.
 *
 * @example
 * ```command
 * <green>content</green>
 * ```
 */
export const commandColors: Record<string, CommandColor> = {
  green: {
    hsl: "hsl(142, 76%, 36%)",
  },
  red: {
    hsl: "hsl(0, 84%, 60%)",
  },
  blue: {
    hsl: "hsl(221, 83%, 53%)",
  },
  yellow: {
    hsl: "hsl(48, 96%, 53%)",
  },
  purple: {
    hsl: "hsl(262, 83%, 58%)",
  },
  orange: {
    hsl: "hsl(25, 95%, 53%)",
  },
  cyan: {
    hsl: "hsl(187, 100%, 42%)",
  },
  pink: {
    hsl: "hsl(330, 81%, 60%)",
  },
  gray: {
    hsl: "hsl(215, 16%, 47%)",
  },
  white: {
    hsl: "hsl(0, 0%, 100%)",
  },
  black: {
    hsl: "hsl(0, 0%, 0%)",
  }
};

export function getCommandColor(colorName: string): CommandColor | null {
  return commandColors[colorName.toLowerCase()] || null;
}
