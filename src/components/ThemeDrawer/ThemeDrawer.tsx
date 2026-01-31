"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import PaletteItem from "../Palettes/Palette";
import UpArrowIcon from "../Icons/UpArrowIcon";

type Palette = {
  id: string;
  name: string;
  colors: string[];
};

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
  const palettes: Palette[] = [
    { id: "indigo", name: "Indigo Sunshine", colors: ["#5B21B6", "#7C3AED", "#C084FC", "#A78BFA"] },
    { id: "teal", name: "Teal Breeze", colors: ["#0D9488", "#14B8A6", "#5EEAD4", "#99F6E4"] },
    { id: "rose", name: "Rose Dawn", colors: ["#BE123C", "#F43F5E", "#FECACA", "#FDE68A"] }
  ];

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
              <h3 className="text-lg font-bold m-auto place-self-center">Theme palettes</h3>
              <p className="text-xs text-slate-600">Pick a palette to preview/apply</p>
            </div>

            <div>
              <button onClick={onClose} aria-label="Close theme drawer" className="text-sm p-2 cursor-pointer">
                <UpArrowIcon />
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-16 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {palettes.map((p) => (
                <PaletteItem key={p.id} palette={p} onSelect={(id) => onSelect(id)} selected={active === p.id} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
