"use client";

import React, { useRef, useImperativeHandle } from "react";
import Carousel, { type CarouselHandle } from "@/components/Carousel/Carousel";
import CarouselControls from "@/components/Carousel/CarouselControls";
import ProjectCard from "../ProjectPostCard/ProjectPostCard";
import { mockProjects } from "@/app/data/projects";
import Link from "next/link";

const ProjectCarousel = React.forwardRef<CarouselHandle>(function ProjectCarousel(_, ref) {
  const innerRef = useRef<CarouselHandle | null>(null);

  useImperativeHandle(ref, () => ({
    scrollLeft: () => innerRef.current?.scrollLeft(),
    scrollRight: () => innerRef.current?.scrollRight()
  }));

  return (
    <section className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <CarouselControls
            onPrev={() => innerRef.current?.scrollLeft()}
            onNext={() => innerRef.current?.scrollRight()}
            className="ml-4"
          />
        </div>
        <div>
          <Link href="/projects" className="text-link text-lg">
            See all projects
          </Link>
        </div>
      </div>

      <Carousel ref={innerRef} hideControls>
        {mockProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Carousel>
    </section>
  );
});

// explicit displayName for tooling and lints
ProjectCarousel.displayName = "ProjectCarousel";

export default ProjectCarousel;
