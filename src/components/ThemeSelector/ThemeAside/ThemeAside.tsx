"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import ThemeDrawer from "@/components/ThemeSelector/ThemeDrawer/ThemeDrawer";
import useTheme from "@/hooks/useThemeHook";

export default function ThemeAside() {
  const [open, setOpen] = useState(false);
  const { themeId, setThemeById } = useTheme();
  const activePalette = themeId ?? null;

  return (
    <>
      <ThemeDrawer
        open={open}
        onClose={() => setOpen((v) => !v)}
        onSelect={(id) => {
          setThemeById(id);
        }}
        active={activePalette}
      />

      <Navbar onToggle={() => setOpen((v) => !v)} isDrawerOpen={open} activePalette={activePalette} />
    </>
  );
}
