"use client";

import React from "react";

type Palette = {
  id: string;
  name: string;
  colors: string[]; // hex colors, first is primary
};

export default function PaletteItem({
  palette,
  onSelect,
  selected
}: {
  palette: Palette;
  onSelect: (id: string) => void;
  selected?: boolean;
}) {
  return (
    <button
      onClick={() => onSelect(palette.id)}
      className={`flex items-center gap-3 p-3 rounded-lg border transition-shadow hover:shadow-md ${
        selected ? "ring-2 ring-indigo-400" : ""
      }`}
      aria-pressed={selected}>
      <div className="flex gap-1">
        {palette.colors.slice(0, 5).map((c, i) => (
          <span key={i} className="w-6 h-6 rounded-full border" style={{ backgroundColor: c }} />
        ))}
      </div>
      <div className="text-left">
        <div className="text-sm font-semibold">{palette.name}</div>
        <div className="text-xs text-slate-500">{palette.colors[0]}</div>
      </div>
    </button>
  );
}
