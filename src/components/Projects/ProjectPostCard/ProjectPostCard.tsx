"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Project } from "@/app/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);
  const declared = project.images && project.images.length > 0 ? project.images[0] : "";
  const showImage = !!declared && !imgError;

  return (
    <Card className="w-92 shrink-0 mr-4 h-110">
      <div className="h-40 rounded-md overflow-hidden bg-accent-100">
        {showImage ? (
          <Image
            src={declared}
            alt={project.title}
            width={280}
            height={160}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-accent-200 to-accent-300" />
        )}
      </div>

      <div className="mt-4 flex-1">
        <h3 className="relative pb-1 text-lg font-semibold text-headline line-clamp-2 transition-colors duration-200 hover:text-accent-200 after:absolute after:bottom-px after:left-0 after:right-0 after:h-1 after:bg-accent-100/60 after:origin-left after:transform after:scale-x-0 after:transition-transform after:duration-200 after:-z-10 hover:after:scale-x-100">
          {project.title}
        </h3>
        {project.description ? <p className="text-sm text-paragraph mt-2 line-clamp-3">{project.description}</p> : null}
      </div>

      <div className="mt-4">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-bold text-link hover:underline transition-none">
            View
          </a>
        ) : null}
      </div>
    </Card>
  );
}
