import { createProjectsCollectionJsonLd, serializeJsonLd } from "@/lib/metadataHelper";
import { getExistingProjectImages } from "@/lib/projectImages.server";

import { getChangelogSlice } from "@/lib/changelog/entryParser";
import TrackedLink from "@/components/Analytics/TrackedLink";
import ChangelogList from "@/components/Changelog/ChangelogList";
import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import { allProjects } from "contentlayer/generated";
import ProjectImageSlider from "./ProjectImageSlider";
import { shouldShowLiveDemo } from "@/lib/projectLinks";

export default function DevPage() {
  const entries = getChangelogSlice(0, 5);

  const devProjectsJsonLd = createProjectsCollectionJsonLd({
    pagePath: "/dev",
    pageTitle: "Dev Portfolio | BlogFolio",
    pageDescription: "My projects - apps and software I built for friends, coworkers, or myself.",
    projects: allProjects
  });

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(devProjectsJsonLd) }} />

      {/* ── Hero header ── */}
      <header className="relative">
        <div className="relative pb-10 z-10 space-y-2">
          <h1 className="text-4xl font-bold font-serif text-headline tracking-tight leading-[1.1]">Dev</h1>
          <p className="text-paragraph leading-relaxed">
            My own projects - apps and software I built both for my own use, for friends or for co-workers.
          </p>
        </div>
      </header>

      <div className="flex gap-14 lg:gap-16">
        {/* ════════════════ Main column ════════════════ */}
        <section className="flex-1 min-w-0">
          {allProjects.map((project, i) => {
            const existingImages = getExistingProjectImages(project.images);
            const num = String(i + 1).padStart(2, "0");

            const isImageLeft = i % 2 === 0;

            return (
              <article key={project.id} id={project.slug} className="scroll-mt-28 mb-28 last:mb-12">
                {/* ── Project number + rule ── */}
                <div className={`flex items-center gap-4 mb-6 ${isImageLeft ? "" : "flex-row-reverse"}`}>
                  <span className="font-accent-200 tracking-widest" style={{ transition: "none" }}>
                    {num}
                  </span>
                  <div className="flex-1 h-px bg-accent-100/30" />
                </div>

                {/* ── Card ── */}
                <div
                  className={`flex flex-col items-stretch overflow-hidden bg-bg-200 border border-accent-100/8 ${
                    isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}>
                  {/* ── Visual side ── */}
                  <div className="relative w-full md:w-[42%] shrink-0 p-4">
                    <ProjectImageSlider
                      images={existingImages}
                      title={project.title}
                      fallback="/images/assets/placeholder.png"
                    />
                  </div>

                  {/* ── Content side ── */}
                  <div
                    className={`flex-1 flex flex-col justify-between p-8 md:p-10 lg:p-12 ${
                      isImageLeft ? "md:pl-10" : "md:pr-10"
                    }`}>
                    <div className="space-y-6">
                      {/* Title */}
                      <div>
                        <h2 className="text-3xl font-bold font-serif text-headline leading-[1.15] tracking-tight">
                          <TrackedLink
                            href={`/dev/${project.slug}`}
                            className="group/title inline-flex items-start gap-1.5 transition-colors duration-300 hover:text-accent-100"
                            eventName="Project Card Click"
                            eventProps={{ slug: project.slug, surface: "dev_title" }}>
                            {project.title}
                            <IconArrowUpRight className="w-5 h-5 mt-1 shrink-0 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover/title:opacity-100 group-hover/title:translate-x-0 group-hover/title:translate-y-0" />
                          </TrackedLink>
                        </h2>
                      </div>

                      {/* Description */}
                      <p className="text-base text-paragraph/80 leading-[1.7] max-w-lg">{project.description}</p>

                      {/* Tech stack */}
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap mt-4">
                          {project.tech.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-bg-100/60 border border-accent-100/10 text-paragraph/65 font-mono">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-5 mt-10">
                      {project.repo && (
                        <TrackedLink
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/gh inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium rounded-lg bg-[#24292f] text-[#f6f8fa] border border-[#57606a]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_3px_rgba(0,0,0,0.12)] hover:bg-[#32383f] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_6px_16px_rgba(0,0,0,0.18)] active:bg-[#1c2024] active:shadow-none transition-[background-color,box-shadow] duration-150"
                          eventName="Project CTA Click"
                          eventProps={{
                            kind: "github",
                            slug: project.slug,
                            surface: "dev_primary"
                          }}>
                          <IconBrandGithub className="w-4.5 h-4.5 transition-transform duration-200 group-hover/gh:rotate-[-8deg]" />
                          GitHub
                        </TrackedLink>
                      )}
                      {shouldShowLiveDemo(project.link, project.repo) && (
                        <TrackedLink
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/demo inline-flex items-center gap-2 text-sm text-link font-medium hover:text-headline transition-colors"
                          eventName="Project CTA Click"
                          eventProps={{ kind: "demo", slug: project.slug, surface: "dev_secondary" }}>
                          Live Demo
                          <IconArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5" />
                        </TrackedLink>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Vertical separator */}
        <div className="hidden lg:block w-0.5 bg-accent-200/60 self-stretch" />

        {/* ════════════════ Sidebar ════════════════ */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-24 space-y-10">
            {/* Project index */}
            <div>
              <h4 className="text-sm font-semibold text-paragraph/60 mb-5">Index</h4>
              <nav className="space-y-0.5">
                {allProjects.map((project, i) => (
                  <a
                    key={project.id}
                    href={`#${project.slug}`}
                    className="group/nav flex items-center gap-3 py-2 cursor-pointer"
                    style={{ transition: "none" }}>
                    <span
                      className="text-xs font-paragraph/30 group-hover/nav:text-accent-200 tabular-nums"
                      style={{ transition: "none" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-sm text-paragraph/60 group-hover/nav:text-headline truncate"
                      style={{ transition: "none" }}>
                      {project.title}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick stats */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-paragraph/60 mb-3">At a glance</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-headline">{allProjects.length}</span>
                <span className="text-sm text-paragraph/50">projects</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-headline">
                  {new Set(allProjects.flatMap((p) => p.tech)).size}
                </span>
                <span className="text-sm text-paragraph/50">technologies</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-headline">
                  {allProjects.filter((p) => p.featured).length}
                </span>
                <span className="text-sm text-paragraph/50">featured</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Changelog ── */}
      <div className="mt-24 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-accent-200/40" />
        </div>

        <section className="pb-16 max-w-3xl">
          <h2 className="text-2xl font-semibold font-serif text-headline mb-3 tracking-tight">Changelog</h2>
          <p className="text-base text-paragraph/70 mb-10 max-w-lg leading-relaxed">
            Track updates, improvements, and fixes to this blogfolio.
          </p>

          <div className="space-y-6">
            <ChangelogList initial={entries} />
          </div>

          {entries.length === 0 && <p className="text-center text-paragraph/50 py-12">No changelog entries yet.</p>}
        </section>
      </div>
    </div>
  );
}
