import Carousel from "@/components/Carousel/Carousel";
import ProjectCard from "../ProjectPostCard/ProjectPostCard";
import { mockProjects } from "@/app/data/projects";

export default function ProjectCarousel() {
  return (
    <section className="">
      <h2 className="text-2xl font-bold mt-4">Projects</h2>
      <Carousel>
        {mockProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Carousel>
    </section>
  );
}
