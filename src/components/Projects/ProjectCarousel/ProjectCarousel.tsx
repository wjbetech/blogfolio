import React from "react";
import Carousel, { CarouselHandle } from "@/components/Carousel/Carousel";
import ProjectCard from "../ProjectPostCard/ProjectPostCard";
import { mockProjects } from "@/app/data/projects";

const ProjectCarousel = React.forwardRef<CarouselHandle>(function ProjectCarousel(_, ref) {
  return (
    <section className="">
      <h2 className="text-2xl font-bold mt-4">Projects</h2>
      <Carousel ref={ref}>
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
