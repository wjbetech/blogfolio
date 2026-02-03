"use client";

import ProjectCarousel from "@/app/components/Projects/ProjectCarousel/ProjectCarousel";

export default function PortfolioPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-headline">Projects</h2>
      </div>

      <ProjectCarousel />
    </div>
  );
}
