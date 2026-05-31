"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Project } from "@/app/types/project";
import { trackAnalyticsEvent } from "@/lib/analytics";

export default function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);
  const declared = (project.images && project.images.length > 0 ? project.images[0] : "").trim();
  const showImage = !!declared && !imgError;
  const imageSrc = showImage ? declared : "/images/assets/placeholder.png";

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="block w-80 shrink-0"
      onClick={() =>
        trackAnalyticsEvent("Project Card Click", {
          slug: project.slug,
          surface: "project_card"
        })
      }>
      <Card className="h-110">
        <div className="h-40 rounded-md overflow-hidden bg-accent-100">
          <Image
            src={imageSrc}
            alt={project.title}
            width={280}
            height={160}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>

        <div className="mt-4 flex-1">
          <h3 className="text-lg font-semibold text-headline line-clamp-2">{project.title}</h3>
          {project.description ? <p className="text-sm text-paragraph mt-2 line-clamp-3">{project.description}</p> : null}
        </div>

        <div className="mt-4">
          <span className="inline-flex items-center gap-1 text-md font-bold text-link">
            View
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </Card>
    </Link>
  );
}
