"use client";

import React, { useRef, useImperativeHandle, useCallback } from "react";

type CarouselProps = {
  children: React.ReactNode;
  gap?: number;
  step?: number;
};

export type CarouselHandle = {
  scrollLeft: () => void;
  scrollRight: () => void;
};

const Carousel = React.forwardRef<CarouselHandle, CarouselProps>(
  ({ children, gap = 20, step = 400 }, ref: React.Ref<CarouselHandle>) => {
    const scroller = useRef<HTMLDivElement>(null);

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
      <div className="relative pb-4">
        <div ref={scroller} className="flex overflow-x-auto no-scrollbar py-2 px-1 z-0" style={{ gap }}>
          {children}
        </div>

        <button
          aria-label="Previous post"
          onClick={() => scrollBy(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center bg-bg-200 rounded-full p-1 shadow z-10">
          <svg className="w-4 h-4 text-paragraph" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          aria-label="Next post"
          onClick={() => scrollBy(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center bg-bg-200 rounded-full p-1 shadow z-10">
          <svg className="w-4 h-4 text-paragraph" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

export default Carousel;
