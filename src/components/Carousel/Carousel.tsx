"use client";

import ChevronLeftIcon from "@/components/Icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";
import React, { useRef, useImperativeHandle, useCallback } from "react";
import useCarouselDrag from "@/hooks/useCarouselDrag";

type CarouselProps = {
  children: React.ReactNode;
  gap?: number;
  step?: number;
  hideControls?: boolean;
};

export type CarouselHandle = {
  scrollLeft: () => void;
  scrollRight: () => void;
};

const Carousel = React.forwardRef<CarouselHandle, CarouselProps>(
  ({ children, gap = 56, step = 400, hideControls = false }, ref: React.Ref<CarouselHandle>) => {
    const scroller = useRef<HTMLDivElement>(null);
    const dragHandlers = useCarouselDrag(scroller);

    const scrollBy = useCallback(
      (dir: number) => {
        if (!scroller.current) return;
        scroller.current.scrollBy({
          left: dir * step,
          behavior: "smooth"
        });
      },
      [step]
    );

    useImperativeHandle(
      ref,
      () => ({
        scrollLeft: () => scrollBy(-1),
        scrollRight: () => scrollBy(1)
      }),
      [scrollBy]
    );

    return (
      // make container relative so absolute buttons are scoped here
      <div className="relative group/carousel">
        {/* edge fades hint that content is scrollable — subtle, theme-aware */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-bg-100 to-transparent z-[1] opacity-60 hidden sm:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-bg-100 to-transparent z-[1] opacity-60 hidden sm:block"
        />
        <div
          ref={scroller}
          onPointerDownCapture={dragHandlers.onPointerDown}
          onPointerMoveCapture={dragHandlers.onPointerMove}
          onPointerUp={dragHandlers.onPointerUp}
          onPointerCancel={dragHandlers.onPointerCancel}
          onClickCapture={dragHandlers.onClickCapture}
          onDragStart={(e) => e.preventDefault()}
          className="flex overflow-x-auto no-scrollbar z-0 cursor-grab active:cursor-grabbing select-none scroll-pb-2"
          style={{ gap, touchAction: "pan-y" as const }}>
          {children}
        </div>

        {!hideControls && (
          <>
            <button
              aria-label="Previous post"
              onClick={() => scrollBy(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center bg-bg-200 rounded-full p-1 shadow z-10">
              <ChevronLeftIcon className="w-4 h-4 text-paragraph" />
            </button>

            <button
              aria-label="Next post"
              onClick={() => scrollBy(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center bg-bg-200 rounded-full p-1 shadow z-10">
              <ChevronRightIcon className="w-4 h-4 text-paragraph" />
            </button>
          </>
        )}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

export default Carousel;
