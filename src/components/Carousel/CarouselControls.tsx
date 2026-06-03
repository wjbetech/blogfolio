"use client";

import ChevronLeftIcon from "@/components/Icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";
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
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={onNext}
        className="p-2 rounded-md text-paragraph hover:text-headline hover:bg-bg-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-100 cursor-pointer">
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
