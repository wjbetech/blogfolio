"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import PaletteItem from "../Palettes/Palette";
import UpArrowIcon from "../Icons/UpArrowIcon";
import { ColorThemes } from "@/lib/themes";
import { applyTheme } from "@/lib/applyTheme";

export default function ThemeDrawer({
  open,
  onClose,
  onSelect,
  active
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  active?: string | null;
}) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="theme-drawer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className="overflow-hidden border-b bg-white">
          <div className="max-w-7xl mx-auto py-4 flex items-center justify-between px-16">
            <div className="flex flex-col mx-auto">
              <h3 className="text-xl font-bold m-auto place-self-center">Themes</h3>
            </div>

            <div>
              <button onClick={onClose} aria-label="Close theme drawer" className="text-sm p-2 cursor-pointer">
                <UpArrowIcon />
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-16 pb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {ColorThemes.map((t) => (
                <PaletteItem
                  key={t.id}
                  palette={{
                    id: t.id,
                    name: t.name,
                    colors: [t.bg100, t.accent, t.accent2 ?? t.accent, t.accent3 ?? t.accent]
                  }}
                  onSelect={(id) => {
                    const theme = ColorThemes.find((x) => x.id === id);
                    if (theme) applyTheme(theme);
                    onSelect(id);
                  }}
                  selected={active === t.id}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
