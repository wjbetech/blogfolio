import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSavedThemeId, saveThemeId, setThemeAttribute } from "@/lib/applyTheme";
import { ColorThemes } from "@/lib/themes";
import type { ColorTheme } from "@/app/types/themes";

export type UseThemeResult = {
  theme: ColorTheme | null;
  themeId: string | null;
  setThemeById: (id: string) => void;
  setTheme: (theme: ColorTheme) => void;
  clearTheme: () => void;
  themes: ColorTheme[];
};

const DEFAULT_THEME_ID = ColorThemes.length > 0 ? ColorThemes[0].id : null;

function isKnownThemeId(id: string | null): boolean {
  return id !== null && ColorThemes.some((theme) => theme.id === id);
}

export default function useTheme(): UseThemeResult {
  const [themeId, setThemeId] = useState<string | null>(DEFAULT_THEME_ID);

  // Hydrate saved theme after mount (avoids SSR hydration mismatch). The
  // pre-paint script in the layout has already restored the visual theme.
  useEffect(() => {
    const saved = loadSavedThemeId();
    if (saved !== null && !isKnownThemeId(saved)) {
      // Self-heal: drop selections for themes that no longer exist
      saveThemeId(null);
      return;
    }
    if (isKnownThemeId(saved) && saved !== themeId) {
      setThemeId(saved);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // derive current theme from id
  const theme = useMemo(() => {
    if (!themeId) return null;
    return ColorThemes.find((t) => t.id === themeId) ?? null;
  }, [themeId]);

  const setThemeById = useCallback((id: string) => {
    if (isKnownThemeId(id)) {
      setThemeId(id);
    }
  }, []);

  const setTheme = useCallback((t: ColorTheme) => {
    setThemeId(t.id);
  }, []);

  // Clearing reverts to the welcome default rather than leaving stale styles
  const clearTheme = useCallback(() => {
    setThemeId(DEFAULT_THEME_ID);
  }, []);

  // Keep the DOM attribute and storage in sync with the selected theme
  useEffect(() => {
    if (!themeId) return;
    setThemeAttribute(themeId);
    saveThemeId(themeId);
  }, [themeId]);

  return {
    theme,
    themeId,
    setThemeById,
    setTheme,
    clearTheme,
    themes: ColorThemes
  };
}
