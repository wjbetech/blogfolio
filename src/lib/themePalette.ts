import type { ColorTheme } from "@/app/types/themes";
import type { Palette } from "@/components/Palettes/Palette";

export function themeToPalette(theme: ColorTheme): Palette {
  return {
    id: theme.id,
    name: theme.name,
    colors: [
      theme["bg-100"],
      theme["accent-100"],
      theme["accent-200"] ?? theme["accent-100"],
      theme["accent-300"] ?? theme["accent-100"]
    ]
  };
}
