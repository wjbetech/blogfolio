"use client";

import React, { useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import PaletteItem, { PALETTE_CARD_WIDTH } from "../../Palettes/Palette";
import { ColorThemes } from "@/lib/themes";

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

  const dragStateRef = useRef({
    pointerId: null as number | null,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
    isDragging: false,
    suppressClick: false
  });

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

    target.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }, [active]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = scrollerRef.current;
    if (!element) return;

    dragStateRef.current.pointerId = event.pointerId;
    dragStateRef.current.startX = event.clientX;
    dragStateRef.current.startScrollLeft = element.scrollLeft;
    dragStateRef.current.moved = false;
    dragStateRef.current.isDragging = false;
    dragStateRef.current.suppressClick = false;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = scrollerRef.current;
    if (!element) return;

    if (dragStateRef.current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragStateRef.current.startX;
    const dragThreshold = 8;

    if (!dragStateRef.current.isDragging) {
      if (Math.abs(deltaX) < dragThreshold) {
        return;
      }

      dragStateRef.current.isDragging = true;
      dragStateRef.current.moved = true;
      dragStateRef.current.suppressClick = true;

      element.setPointerCapture(event.pointerId);
    }

    element.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = scrollerRef.current;
    if (!element) return;

    if (dragStateRef.current.pointerId !== event.pointerId) return;

    if (element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current.pointerId = null;
    dragStateRef.current.isDragging = false;
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.suppressClick) return;

    event.preventDefault();
    event.stopPropagation();
    dragStateRef.current.suppressClick = false;
  };

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
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onClickCapture={handleClickCapture}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-4 scroll-pl-6 px-6 cursor-grab active:cursor-grabbing select-none"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          touchAction: "pan-y"
        }}>
        {ColorThemes.map((t) => (
          <div key={t.id} className="flex-none" data-palette-id={t.id} style={{ scrollSnapAlign: "center" }}>
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
