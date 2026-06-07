"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

interface ProjectImageSliderProps {
  images: string[];
  title: string;
  fallback: string;
}

export default function ProjectImageSlider({ images, title, fallback }: ProjectImageSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [fallback];

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const target = index * container.clientWidth;
    container.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || displayImages.length <= 1) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.clientWidth;
      if (slideWidth === 0) return;
      const newIndex = Math.round(scrollLeft / slideWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < displayImages.length) {
        setActiveIndex(newIndex);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeIndex, displayImages.length]);

  return (
    <div className="relative w-full h-64 md:h-full rounded-sm overflow-hidden">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-full"
      >
        {displayImages.map((src, idx) => (
          <div key={idx} className="shrink-0 w-full snap-center relative h-full">
            <Image
              src={src}
              alt={`${title} - image ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {displayImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {displayImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                idx === activeIndex ? "bg-accent-100" : "bg-bg-100/80 hover:bg-bg-100"
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
