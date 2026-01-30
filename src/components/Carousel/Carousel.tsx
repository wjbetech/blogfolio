"use client";

import React, { useRef } from "react";

type CarouselProps = {
  children: React.ReactNode;
  gap?: number;
  step?: number;
};

export default function Carousel({ children, gap = 16, step = 320 }: CarouselProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    if (!scroller.current) return;
    scroller.current.scrollBy({
      left: dir * step,
      behavior: "smooth"
    });
  };

  return (
    <div className="py-10">
      <div ref={scroller} className="flex overflow-x-auto no-scrollbar py-2 px-1" style={{ gap }}>
        {children}
      </div>

      <button
        aria-label="Previous post"
        onClick={() => scrollBy(-1)}
        className="absolute top-1/2 ml-4 transform -translate-y-1/2 hidden md:flex">
        <span>{"<"}</span>
      </button>

      <button
        aria-label="Next post"
        onClick={() => scrollBy(1)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-1 shadow hidden md:flex">
        <span>{">"}</span>
      </button>
    </div>
  );
}
