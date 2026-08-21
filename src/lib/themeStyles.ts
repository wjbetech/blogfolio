import { ColorThemes } from "@/lib/themes";
import type { ColorTheme } from "@/app/types/themes";

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
 * Single source of truth for theme CSS: one [data-theme] block per theme,
 * generated from themes.ts at render time. A :root block mirroring the
 * welcome theme acts as the fallback default, so first paint and "pick
 * Welcome" are visually identical.
 */
export function buildThemeCss(): string {
  const welcome = ColorThemes.find((theme) => theme.id === "welcome") ?? ColorThemes[0];
  const blocks = ColorThemes.map((theme) => `[data-theme="${theme.id}"]{${themeVarLines(theme)}}`);
  return `:root{${themeVarLines(welcome)}}${blocks.join("")}`;
}
