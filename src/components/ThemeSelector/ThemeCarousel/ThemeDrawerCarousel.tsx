"use client";

import React, { useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import PaletteItem, { PALETTE_CARD_WIDTH } from "../../Palettes/Palette";
import { ColorThemes } from "@/lib/themes";
import { themeToPalette } from "@/lib/themePalette";
import useCarouselDrag from "@/hooks/useCarouselDrag";

type Props = {
  active?: string | null;
  onSelect: (id: string) => void;
};

export type ThemeDrawerCarouselHandle = {
  scrollLeft: () => void;
  scrollRight: () => void;
  scrollToActive: () => void;
};

const ThemeDrawerCarousel = forwardRef<ThemeDrawerCarouselHandle, Props>(({ active, onSelect }, ref) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragHandlers = useCarouselDrag(scrollerRef);

  const cardGap = 16;
  const scrollDistance = PALETTE_CARD_WIDTH + cardGap;
  const scrollLeft = useCallback(() => {
    const element = scrollerRef.current;
    if (!element) return;

    element.scrollBy({
      left: -scrollDistance,
      behavior: "smooth"
    });
  }, [scrollDistance]);

  const scrollRight = useCallback(() => {
    const element = scrollerRef.current;
    if (!element) return;

    element.scrollBy({
      left: scrollDistance,
      behavior: "smooth"
    });
  }, [scrollDistance]);

  const scrollToActive = useCallback(() => {
    const container = scrollerRef.current;
    if (!container || !active) return;

    const target = container.querySelector<HTMLElement>(`[data-palette-id="${active}"]`);
    if (!target) return;

    const targetCenter = target.offsetLeft + target.offsetWidth / 2;
    const nextScrollLeft = targetCenter - container.clientWidth / 2;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const scrollLeftTo = Math.max(0, Math.min(nextScrollLeft, maxScrollLeft));

    if (typeof target.scrollIntoView === "function") {
      try {
        target.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
        return;
      } catch (error) {
        console.error("scrollIntoView failed, falling back to manual scroll. Error:", error);
      }
    }

    if (typeof container.scrollTo === "function") {
      container.scrollTo({
        left: scrollLeftTo,
        behavior: "smooth"
      });
    } else {
      container.scrollLeft = scrollLeftTo;
    }
  }, [active]);

  useImperativeHandle(
    ref,
    () => ({
      scrollLeft,
      scrollRight,
      scrollToActive
    }),
    [scrollLeft, scrollRight, scrollToActive]
  );

  return (
    <div>
      <div
        ref={scrollerRef}
        {...dragHandlers}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-4 scroll-pl-6 px-6 cursor-grab active:cursor-grabbing select-none"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          touchAction: "pan-y"
        }}>
        {ColorThemes.map((t) => (
          <div key={t.id} className="flex-none" data-palette-id={t.id} style={{ scrollSnapAlign: "center" }}>
            <PaletteItem palette={themeToPalette(t)} onSelect={onSelect} selected={active === t.id} />
          </div>
        ))}
      </div>
    </div>
  );
});

ThemeDrawerCarousel.displayName = "ThemeDrawerCarousel";

export default ThemeDrawerCarousel;
