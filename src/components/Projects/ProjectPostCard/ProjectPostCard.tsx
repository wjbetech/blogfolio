"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { ProjectCardData } from "@/lib/homeCards";
import ArrowRightIcon from "@/components/Icons/ArrowRightIcon";
import { trackAnalyticsEvent } from "@/lib/analytics";

const FALLBACK = "/images/assets/placeholder.png";

export default function ProjectCard({ project, priority = false }: { project: ProjectCardData; priority?: boolean }) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = project.image && !imgError ? project.image : FALLBACK;

  return (
    <Link
      href={`/dev/${project.slug}`}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      className="block w-80 shrink-0 group cursor-grab active:cursor-grabbing select-none"
      onClick={() =>
        trackAnalyticsEvent("Project Card Click", {
          slug: project.slug,
          surface: "project_card"
        })
      }
    >
      <Card className="h-110 p-0 gap-0 overflow-hidden bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 active:shadow-sm active:translate-y-0">
        <div className="h-56 w-full overflow-hidden bg-bg-200 shrink-0">
          <Image
            src={imageSrc}
            alt={project.title}
            width={320}
            height={224}
            sizes="(max-width: 640px) 80vw, 320px"
            priority={priority}
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] select-none"
            onError={() => setImgError(true)}
          />
        </div>
        <div className="p-6 flex flex-col flex-1 min-h-0">
          {project.tech.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="text-[11px] font-mono px-2 py-1 rounded bg-bg-200 text-paragraph/60">
                  {t}
                </span>
              ))}
              {project.tech.length > 3 ? <span className="text-[11px] text-paragraph/40">+{project.tech.length - 3}</span> : null}
            </div>
          ) : null}
          <h3 className="font-serif text-[1.35rem] leading-tight font-semibold text-headline line-clamp-2 transition-colors duration-200 group-hover:text-accent-200">
            {project.title}
          </h3>
          <p className="text-[13px] leading-relaxed text-paragraph/70 mt-3 line-clamp-2 flex-1">{project.description}</p>
          <div className="mt-5 flex items-center gap-2 text-link font-bold text-sm group-hover:gap-3 transition-all duration-200">
            View <ArrowRightIcon width={14} height={14} strokeWidth={2.5} aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
