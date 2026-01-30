import Carousel from "@/components/Carousel/Carousel";
import ProjectCard from "../ProjectCard/ProjectCard";
import { mockProjects } from "@/app/data/projects";

export default function ProjectCarousel() {
  return (
    <section>
      <h2>Projects</h2>
      <Carousel>
        {mockProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Carousel>
    </section>
  );
}
