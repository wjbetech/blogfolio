"use client";

import ProjectCarousel from "@/components/Projects/ProjectCarousel/ProjectCarousel";
import { createPortfolioMetadata } from "@/lib/metadata";

export const metadata = createPortfolioMetadata();

export default function PortfolioPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="relative pb-1 text-3xl font-semibold text-headline transition-colors duration-200 after:absolute after:bottom-px after:left-0 after:right-0 after:h-1 after:bg-accent-100/60 after:origin-left after:transform after:scale-x-0 after:transition-transform after:duration-200 after:-z-10 hover:text-accent-100 hover:after:scale-x-100">
          Projects
        </h2>
      </div>

      <ProjectCarousel />
    </div>
  );
}
