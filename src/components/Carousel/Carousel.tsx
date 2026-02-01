"use client";

import React, { useRef } from "react";

type CarouselProps = {
  children: React.ReactNode;
  gap?: number;
  step?: number;
};

export default function Carousel({ children, gap = 20, step = 400 }: CarouselProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    if (!scroller.current) return;
    scroller.current.scrollBy({
      left: dir * step,
      behavior: "smooth"
    });
  };

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
