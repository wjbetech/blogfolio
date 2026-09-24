"use client";

import { useEffect, useState } from "react";

type ProjectIndexEntry = {
  slug: string;
  title: string;
};

export default function ProjectIndex({ projects }: { projects: ProjectIndexEntry[] }) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");

  useEffect(() => {
    if (projects.length === 0) return;

    const sections = projects
      .map((project) => document.getElementById(project.slug))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const currentSection = visibleSections[0]?.target;
        if (currentSection instanceof HTMLElement) setActiveSlug(currentSection.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [projects]);

  return (
    <div className="rounded-xl border border-accent-100/20 bg-bg-200/70 p-4 shadow-sm">
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-200">Project index</h4>
      <nav aria-label="Project index" className="space-y-1">
        {projects.map((project, i) => {
          const active = activeSlug === project.slug;

          return (
            <a
              key={project.slug}
              href={`#${project.slug}`}
              aria-current={active ? "location" : undefined}
              className={`group/nav flex items-center gap-2.5 rounded-md border px-2 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-200 ${
                active
                  ? "border-accent-200/35 bg-accent-200/10 text-headline shadow-sm"
                  : "border-transparent text-paragraph/75 hover:border-accent-200/25 hover:bg-accent-200/5 hover:text-headline"
              }`}>
              <span
                className={`inline-flex size-7 shrink-0 items-center justify-center border font-mono text-[11px] tabular-nums ${
                  active
                    ? "border-accent-200/35 bg-bg-100/80 text-accent-200"
                    : "border-accent-100/15 bg-bg-100/50 text-paragraph/60 group-hover/nav:text-accent-200"
                }`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="truncate text-sm font-medium">{project.title}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
