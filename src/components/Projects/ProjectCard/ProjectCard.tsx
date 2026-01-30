import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Project } from "@/app/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="w-64 shrink-0 mr-4">
      <div className="h-40 rounded-md overflow-hidden bg-slate-100">
        {project.images?.[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            width={256}
            height={160}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300" />
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-semibold line-clamp-2">{project.title}</h3>
        {project.description ? <p className="text-xs text-slate-500 mt-1 line-clamp-2">{project.description}</p> : null}
      </div>

      <div className="mt-3">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-sky-600 hover:underline">
            Visit
          </a>
        ) : null}
      </div>
    </Card>
  );
}
