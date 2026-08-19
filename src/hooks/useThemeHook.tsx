import { useCallback, useEffect, useMemo, useState } from "react";
import { applyTheme, loadSavedThemeId } from "@/lib/applyTheme";
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

export default function useTheme(): UseThemeResult {
  const [themeId, setThemeId] = useState<string | null>(
    ColorThemes.length > 0 ? ColorThemes[0].id : null
  );

  // Hydrate saved theme from localStorage after mount (avoids SSR hydration mismatch)
  useEffect(() => {
    const saved = loadSavedThemeId();
    if (saved && saved !== themeId) {
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

  // set by id
  const setThemeById = useCallback((id: string) => {
    const found = ColorThemes.find((t) => t.id === id) ?? null;
    if (found) {
      setThemeId(found.id);
    }
  }, []);

  // set by theme object
  const setTheme = useCallback((t: ColorTheme) => {
    setThemeId(t.id);
  }, []);

  const clearTheme = useCallback(() => {
    setThemeId(null);
  }, []);

  // apply theme whenever themeId changes (keeps DOM in sync)
  useEffect(() => {
    if (!themeId) return;
    const found = ColorThemes.find((t) => t.id === themeId) ?? null;
    if (found) applyTheme(found);
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
