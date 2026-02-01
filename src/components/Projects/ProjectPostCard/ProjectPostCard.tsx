import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Project } from "@/app/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="w-92 shrink-0 mr-4 h-110">
      <div className="h-40 rounded-md overflow-hidden bg-accent-100">
        {project.images?.[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            width={280}
            height={160}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-accent-200 to-accent-300" />
        )}
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-lg font-semibold line-clamp-2">{project.title}</h3>
        {project.description ? <p className="text-sm text-paragraph mt-2 line-clamp-3">{project.description}</p> : null}
      </div>

      <div className="mt-4">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-bold text-link hover:underline">
            View
          </a>
        ) : null}
      </div>
    </Card>
  );
}
