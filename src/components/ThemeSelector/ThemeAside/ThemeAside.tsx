"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import ThemeDrawer from "@/components/ThemeSelector/ThemeDrawer/ThemeDrawer";

export default function ThemeAside() {
  const [open, setOpen] = useState(false);
  const [activePalette, setActivePalette] = useState<string | null>(null);

  const toggleDrawer = () => setOpen((v) => !v);

  return (
    <>
      <ThemeDrawer
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(id) => {
          setActivePalette(id);
        }}
        active={activePalette}
      />

      <Navbar onToggle={toggleDrawer} isDrawerOpen={open} activePalette={activePalette} />
    </>
  );
}
