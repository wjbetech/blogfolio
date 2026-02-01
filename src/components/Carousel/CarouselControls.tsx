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
        aria-label="Previous"
        onClick={onPrev}
        className="p-2 rounded-md text-sm text-foreground/80 hover:text-foreground/100 hover:bg-transparent">
        ←
      </button>
      <button
        aria-label="Next"
        onClick={onNext}
        className="p-2 rounded-md text-sm text-foreground/80 hover:text-foreground/100 hover:bg-transparent">
        →
      </button>
    </div>
  );
}
