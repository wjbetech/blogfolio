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
      <div className="relative">
        <div
          ref={scroller}
          {...dragHandlers}
          className="flex overflow-x-auto no-scrollbar z-0 cursor-grab active:cursor-grabbing select-none"
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
