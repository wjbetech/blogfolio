"use client";

import CarouselControls from "@/components/Carousel/CarouselControls";
import ProjectCarousel from "@/components/Projects/ProjectCarousel/ProjectCarousel";
import { useRef } from "react";
import type { CarouselHandle } from "@/components/Carousel/Carousel";

export default function PortfolioPage() {
  const carouselRef = useRef<CarouselHandle | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-headline">Projects</h2>
        <CarouselControls
          onPrev={() => carouselRef.current?.scrollLeft()}
          onNext={() => carouselRef.current?.scrollRight()}
        />
      </div>

      {/* Ensure ProjectsCarousel forwards a ref exposing scrollLeft/scrollRight */}
      <ProjectCarousel ref={carouselRef} />
    </div>
  );
}
