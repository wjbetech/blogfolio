"use client";

import React, { useRef, useImperativeHandle } from "react";
import Carousel, { type CarouselHandle } from "@/components/Carousel/Carousel";
import CarouselControls from "@/components/Carousel/CarouselControls";
import ProjectCard from "../ProjectPostCard/ProjectPostCard";
import Link from "next/link";
import type { ProjectCardData } from "@/lib/homeCards";

type ProjectCarouselProps = {
  projects: ProjectCardData[];
};

const ProjectCarousel = React.forwardRef<CarouselHandle, ProjectCarouselProps>(function ProjectCarousel(
  { projects },
  ref
) {
  const innerRef = useRef<CarouselHandle | null>(null);

  useImperativeHandle(ref, () => ({
    scrollLeft: () => innerRef.current?.scrollLeft(),
    scrollRight: () => innerRef.current?.scrollRight()
  }));

  return (
    <section className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold font-serif text-headline">Posts</h2>
          <CarouselControls
            onPrev={() => innerRef.current?.scrollLeft()}
            onNext={() => innerRef.current?.scrollRight()}
            className="ml-4"
          />
        </div>
        <div>
          <Link
            href="/dev"
            className="flex items-baseline gap-2 relative pb-1 text-sm lg:text-lg transition-colors text-link after:absolute after:bottom-px after:-left-1.5 after:right-0 after:h-3 after:bg-accent-100/50 after:origin-left after:transform after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 after:-z-10">
            <span>See all projects</span>
          </Link>
        </div>
      </div>

      <Carousel ref={innerRef} hideControls>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Carousel>
    </section>
  );
});

// explicit displayName for tooling and lints
ProjectCarousel.displayName = "ProjectCarousel";

export default ProjectCarousel;
