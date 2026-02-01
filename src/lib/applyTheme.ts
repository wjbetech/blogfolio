import { ColorTheme } from "@/app/types/themes";

export function applyTheme(theme: ColorTheme) {
  try {
    const root = document.documentElement;

    // backgrounds
    root.style.setProperty("--bg-100", theme["bg-100"]);
    root.style.setProperty("--bg-200", theme["bg-200"]);
    root.style.setProperty("--bg-300", theme["bg-300"]);

    // text
    root.style.setProperty("--headline", theme.headline);
    root.style.setProperty("--paragraph", theme.paragraph);

    // button
    root.style.setProperty("--button", theme.button);
    if (theme["button-text"]) root.style.setProperty("--button-text", theme["button-text"]);

    // link (primary link color) and hover/focus fallback
    if (theme.link) {
      root.style.setProperty("--link", theme.link);
    } else {
      // fallback to headline if no explicit link color
      root.style.setProperty("--link", theme.headline);
    }

    // accents (numeric scale)
    root.style.setProperty("--accent-100", theme["accent-100"]);
    if (theme["accent-200"]) root.style.setProperty("--accent-200", theme["accent-200"]);
    if (theme["accent-300"]) root.style.setProperty("--accent-300", theme["accent-300"]);

    // persist selection
    try {
      localStorage.setItem("site:theme", theme.id);
    } catch (error) {
      console.log(error, "applyTheme localStorage error");
    }

    // cookie for SSR hydration parity
    try {
      const maxAge = 60 * 60 * 24 * 365;
      document.cookie = `site-theme=${encodeURIComponent(theme.id)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
    } catch (error) {
      console.log(error, "applyTheme cookie error");
    }
  } catch (error) {
    console.error("applyTheme error", error);
  }
}

export function loadSavedThemeId(): string | null {
  try {
    return localStorage.getItem("site:theme");
  } catch {
    return null;
  }
}
