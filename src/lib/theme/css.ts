import type { ColorTheme } from "@/app/types/themes";
import { ColorThemes } from "./palettes";

function themeVarLines(theme: ColorTheme): string {
  const lines = [
    `--bg-100:${theme["bg-100"]}`,
    `--bg-200:${theme["bg-200"]}`,
    `--bg-300:${theme["bg-300"]}`,
    `--headline:${theme.headline}`,
    `--paragraph:${theme.paragraph}`,
    `--button:${theme.button}`
  ];

  if (theme.buttonText) lines.push(`--buttonText:${theme.buttonText}`);

  // Mirror the historical fallback: link falls back to headline
  lines.push(`--link:${theme.link || theme.headline}`);

  lines.push(`--accent-100:${theme["accent-100"]}`);
  if (theme["accent-200"]) lines.push(`--accent-200:${theme["accent-200"]}`);
  if (theme["accent-300"]) lines.push(`--accent-300:${theme["accent-300"]}`);

  // Mirror the historical fallback chain for the palette selection border
  const border = theme["palette-border"] || theme["accent-200"] || theme["accent-100"];
  if (border) lines.push(`--palette-border:${border}`);

  return lines.join(";");
}

/**
 * Deep module implementation: CSS generation hidden behind the theme seam.
 * Single source of truth for every theme as a [data-theme] block.
 * A :root block mirroring the welcome theme acts as fallback default.
 */
export function getThemeCss(): string {
  const welcome = ColorThemes.find((theme) => theme.id === "welcome") ?? ColorThemes[0];
  const blocks = ColorThemes.map((theme) => `[data-theme="${theme.id}"]{${themeVarLines(theme)}}`);
  return `:root{${themeVarLines(welcome)}}${blocks.join("")}`;
}

// Deprecated alias for callers still importing buildThemeCss
export const buildThemeCss = getThemeCss;
