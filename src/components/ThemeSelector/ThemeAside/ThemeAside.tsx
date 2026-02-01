"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import ThemeDrawer from "@/components/ThemeSelector/ThemeDrawer/ThemeDrawer";
import useTheme from "@/hooks/useThemeHook";

export default function ThemeAside() {
  const [open, setOpen] = useState(false);
  const [activePalette, setActivePalette] = useState<string | null>(null);

  const { themeId, setThemeById } = useTheme();

  const toggleDrawer = () => setOpen((v) => !v);

  // keep local activePalette in sync with global theme state
  useEffect(() => {
    setActivePalette(themeId ?? null);
  }, [themeId]);

  return (
    <>
      <ThemeDrawer
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(id) => {
          setActivePalette(id);
          setThemeById(id);
        }}
        active={activePalette}
      />

      <Navbar onToggle={toggleDrawer} isDrawerOpen={open} activePalette={activePalette} />
    </>
  );
}
