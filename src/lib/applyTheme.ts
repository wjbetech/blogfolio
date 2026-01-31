import { ColorTheme } from "@/app/types/themes";

export function applyTheme(theme: ColorTheme) {
  const root = document.documentElement;
  // Set CSS variables using non-hyphenated names that match themes.ts properties
  root.style.setProperty("--bg100", theme.bg100);
  root.style.setProperty("--bg200", theme.bg200);
  root.style.setProperty("--bg300", theme.bg300);
  root.style.setProperty("--headline", theme.headline);
  root.style.setProperty("--paragraph", theme.paragraph);
  root.style.setProperty("--button", theme.button);
  root.style.setProperty("--buttonText", theme.buttonText);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent2", theme.accent2);
  root.style.setProperty("--accent3", theme.accent3);

  // Persist selection to localStorage
  try {
    localStorage.setItem("site:theme", theme.id);
  } catch (error) {
    console.log(error, "Could not save theme to localStorage");
  }

  // Persist to cookie so server can read it on SSR (prevents hydration mismatch)
  try {
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    document.cookie = `site-theme=${encodeURIComponent(theme.id)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
  } catch (error) {
    console.log(error, "Could not save theme to cookie");
  }
}

export function loadSavedThemeId(): string | null {
  try {
    return localStorage.getItem("site:theme");
  } catch {
    return null;
  }
}
