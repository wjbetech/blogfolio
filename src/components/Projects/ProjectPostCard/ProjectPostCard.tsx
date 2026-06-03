"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Project } from "@/app/types/project";
import ArrowRightIcon from "@/components/Icons/ArrowRightIcon";
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
          <h3 className="text-xl font-semibold text-headline line-clamp-2">{project.title}</h3>
          {project.description ? <p className="text-sm text-paragraph mt-2 line-clamp-3">{project.description}</p> : null}
        </div>

        <div className="mt-4">
          <span className="inline-flex items-center gap-1 text-md font-bold text-link">
            View
            <ArrowRightIcon width={14} height={14} strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
