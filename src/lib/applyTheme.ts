import { ColorTheme } from "@/app/types/themes";

export function applyTheme(theme: ColorTheme) {
  const root = document.documentElement;
  root.style.setProperty("--bg-100", theme.bg100);
  root.style.setProperty("--bg-200", theme.bg200);
  root.style.setProperty("--bg-300", theme.bg300);
  root.style.setProperty("--headline", theme.headline);
  root.style.setProperty("--paragraph", theme.paragraph);

  // Use accent, falling back to button; for accent text prefer explicit accentText, else buttonText
  const accent = theme.accent ?? theme.button ?? "#000000";
  const accentText = theme.accentText ?? theme.buttonText ?? "#ffffff";
  root.style.setProperty("--accent", accent);
  root.style.setProperty("--accent-text", accentText);

  if (theme.accent2) root.style.setProperty("--accent-2", theme.accent2);
  if (theme.accent3) root.style.setProperty("--accent-3", theme.accent3);

  // Persist selection
  try {
    localStorage.setItem("site:theme", theme.id);
  } catch (error) {
    console.log(error, "Could not save theme to localStorage");
  }
}

export function loadSavedThemeId(): string | null {
  try {
    return localStorage.getItem("site:theme");
  } catch {
    return null;
  }
}
