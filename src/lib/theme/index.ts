// Deep Theme module — small interface, deep implementation.
//
// Public seam (what callers learn):
//   getTheme, getAllThemes, getThemeCss (+ buildThemeCss alias), useTheme
//
// Implementation hidden behind the seam:
//   palettes (data), css (var generation), storage + dom (adapters)
//
// Interior seams (private to implementation, used by its own tests):
//   storage.ts (localStorage vs memory), dom.ts (document vs memory)

import { ColorThemes } from "./palettes";
import type { ColorTheme } from "@/app/types/themes";

export { ColorThemes } from "./palettes";
export { getThemeCss, buildThemeCss } from "./css";
export { default as useTheme } from "./hook";
export type { UseThemeResult } from "./hook";

// Pure helpers — no DOM, no storage — testable in isolation through the seam.
export function getTheme(id: string): ColorTheme | undefined {
  return ColorThemes.find((t) => t.id === id);
}

export function getAllThemes(): ColorTheme[] {
  return [...ColorThemes];
}
