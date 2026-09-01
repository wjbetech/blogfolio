"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { ProjectCardData } from "@/lib/homeCards";
import ArrowRightIcon from "@/components/Icons/ArrowRightIcon";
import { trackAnalyticsEvent } from "@/lib/analytics";

const FALLBACK = "/images/assets/placeholder.png";

export default function ProjectCard({ project }: { project: ProjectCardData }) {
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
      <Card className="h-110 p-6 gap-0 bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 active:shadow-sm active:translate-y-0">
        <div className="h-48 rounded-lg overflow-hidden bg-bg-200 shrink-0">
          <Image
            src={imageSrc}
            alt={project.title}
            width={280}
            height={160}
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] select-none"
            onError={() => setImgError(true)}
          />
        </div>

        <div className="mt-4 flex-1 min-h-0">
          {project.tech.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-bg-200 border border-accent-100/15 text-paragraph/60"
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 3 ? (
                <span className="text-[11px] text-paragraph/40">+{project.tech.length - 3}</span>
              ) : null}
            </div>
          ) : null}
          <h3 className="text-[1.15rem] leading-snug font-semibold text-headline line-clamp-2 transition-colors duration-200 group-hover:text-accent-200">
            {project.title}
          </h3>
          {project.description ? (
            <p className="text-[13px] leading-relaxed text-paragraph/75 mt-2.5 line-clamp-3">{project.description}</p>
          ) : null}
        </div>

        <div className="mt-4 pt-3 border-t border-accent-100/10">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-link transition-colors duration-200 group-hover:text-accent-200">
            View
            <ArrowRightIcon
              width={14}
              height={14}
              strokeWidth={2.5}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Card>
    </Link>
  );
}
