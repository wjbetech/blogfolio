"use client";

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import PaletteItem from "../../Palettes/Palette";
import { ColorThemes } from "@/lib/themes";

type Props = {
  active?: string | null;
  onSelect: (id: string) => void;
};

export type ThemeDrawerCarouselHandle = {
  scrollLeft: () => void;
  scrollRight: () => void;
};

const ThemeDrawerCarousel = forwardRef<ThemeDrawerCarouselHandle, Props>(({ active, onSelect }, ref) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollAmount = () => {
    const el = scrollerRef.current;
    if (!el) return 240;
    return Math.max(el.clientWidth * 0.6, 240);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollLeft = () => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollRight = () => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  };

  useImperativeHandle(ref, () => ({ scrollLeft, scrollRight }), [scrollLeft, scrollRight]);

  return (
    <div>
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-4 scroll-pl-6"
        style={{ WebkitOverflowScrolling: "touch" }}>
        {ColorThemes.map((t) => (
          <div key={t.id} className="flex-none">
            <PaletteItem
              palette={{
                id: t.id,
                name: t.name,
                colors: [
                  t["bg-100"],
                  t["accent-100"],
                  t["accent-200"] ?? t["accent-100"],
                  t["accent-300"] ?? t["accent-100"]
                ]
              }}
              onSelect={onSelect}
              selected={active === t.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

ThemeDrawerCarousel.displayName = "ThemeDrawerCarousel";

export default ThemeDrawerCarousel;
