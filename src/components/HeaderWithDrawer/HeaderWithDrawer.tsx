"use client";

import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import ThemeDrawer from "../ThemeDrawer/ThemeDrawer";

export default function HeaderWithDrawer() {
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
          setOpen(false);
        }}
        active={activePalette}
      />

      <Navbar onToggle={toggleDrawer} isDrawerOpen={open} activePalette={activePalette} />
    </>
  );
}
