"use client";

import React from "react";
import PaletteItem from "../Theme/PaletteItem";

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

  if (!open) return null;

  return (
    <>
      {/* backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} aria-hidden />

      {/* drawer */}
      <div className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Theme palettes</h3>
            <p className="text-sm text-slate-600">Pick a palette to preview/apply</p>
          </div>

          <div>
            <button
              onClick={onClose}
              aria-label="Close theme drawer"
              className="text-sm px-3 py-1 rounded bg-slate-100 hover:bg-slate-200">
              Close
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {palettes.map((p) => (
              <PaletteItem
                key={p.id}
                palette={p}
                onSelect={(id) => {
                  onSelect(id);
                }}
                selected={active === p.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
