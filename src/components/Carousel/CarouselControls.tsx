"use client";

import React from "react";

export default function CarouselControls({
  onPrev,
  onNext,
  className
}: {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <button
        type="button"
        aria-label="Previous"
        onClick={onPrev}
        className="p-2 rounded-md text-paragraph hover:text-headline hover:bg-bg-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-100 cursor-pointer">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={onNext}
        className="p-2 rounded-md text-paragraph hover:text-headline hover:bg-bg-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-100 cursor-pointer">
        <svg className="w-6 h-6 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
