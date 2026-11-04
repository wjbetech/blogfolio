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
    <nav aria-label="Project index" className="mb-10 flex min-w-0 items-center gap-2 overflow-x-auto border-y border-accent-100/20 py-3 [scrollbar-width:thin]">
      <span className="mr-2 shrink-0 font-mono text-[11px] uppercase tracking-wider text-paragraph">Selected</span>
      <div className="flex min-w-0 items-center gap-2">
        {projects.map((project, i) => {
          const active = activeSlug === project.slug;

          return (
            <a
              key={project.slug}
              href={`#${project.slug}`}
              aria-current={active ? "location" : undefined}
              className={`group/nav flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-200 ${
                active
                  ? "border-accent-200/35 bg-accent-200/10 text-headline shadow-sm"
                  : "border-transparent text-paragraph/75 hover:border-accent-200/25 hover:bg-accent-200/5 hover:text-headline"
              }`}>
              <span
                className={`inline-flex size-5 shrink-0 items-center justify-center font-mono text-[10px] tabular-nums ${
                  active
                    ? "border-accent-200/35 bg-bg-100/80 text-accent-200"
                    : "border-accent-100/15 bg-bg-100/50 text-paragraph/60 group-hover/nav:text-accent-200"
                }`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium">{project.title}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
