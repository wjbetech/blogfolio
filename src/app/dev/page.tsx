import { createProjectsCollectionJsonLd, serializeJsonLd } from "@/lib/metadataHelper";
import { createDevMetadata } from "@/lib/metadata";
import { getExistingProjectImages } from "@/lib/projectImages.server";

import { getChangelogSlice } from "@/lib/changelog/entryParser";
import TrackedLink from "@/components/Analytics/TrackedLink";
import ChangelogList from "@/components/Changelog/ChangelogList";
import CardAtmosphere from "@/components/ui/CardAtmosphere";
import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import { allProjects } from "contentlayer/generated";
import CurrentRoleCard from "./CurrentRoleCard";
import ProjectImageSlider from "./ProjectImageSlider";
import ProjectIndex from "./ProjectIndex";
import { shouldShowLiveDemo } from "@/lib/projectLinks";
import { getPublishedProjects } from "@/lib/content";

export const metadata = createDevMetadata();

export default function DevPage() {
  const publishedProjects = getPublishedProjects(allProjects);
  const entries = getChangelogSlice(0, 5);

  const devProjectsJsonLd = createProjectsCollectionJsonLd({
    pagePath: "/dev",
    pageTitle: "Dev Portfolio | BlogFolio",
    pageDescription: "My projects - apps and software I built for friends, coworkers, or myself.",
    projects: publishedProjects
  });

  return (
    <div>
      {/* JSON-LD (application/ld+json) is data, not executable script — no CSP nonce needed. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(devProjectsJsonLd) }} />

      {/* ── Hero header ── */}
      <header className="relative">
        <div className="relative pb-10 z-10 space-y-2">
          <h1 className="sr-only">Dev</h1>
          <CurrentRoleCard />
          <p className="text-paragraph leading-relaxed">
            My own projects - apps and software I built both for my own use, for friends or for co-workers.
          </p>
        </div>
      </header>

      <div className="flex gap-14 lg:gap-16">
        {/* ════════════════ Main column ════════════════ */}
        <section className="flex-1 min-w-0">
          {publishedProjects.map((project, i) => {
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
                  className={`group/card relative isolate flex flex-col items-stretch overflow-hidden rounded-xl border border-accent-100/15 bg-bg-200/75 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-accent-200/40 hover:shadow-[0_16px_42px_-26px_var(--accent-200)] motion-reduce:transition-none ${
                    isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}>
                  <CardAtmosphere reverse={i % 2 === 1} />
                  {/* ── Visual side ── */}
                  <div className="relative z-10 w-full shrink-0 bg-bg-100/35 p-3 sm:p-4 md:w-[48%] lg:p-5">
                    <ProjectImageSlider
                      images={existingImages}
                      title={project.title}
                      fallback="/images/assets/placeholder.png"
                    />
                  </div>

                  {/* ── Content side ── */}
                  <div
                    className={`relative z-10 flex flex-1 flex-col justify-between p-6 md:p-8 lg:p-10 ${
                      isImageLeft ? "md:pl-10" : "md:pr-10"
                    }`}>
                    <div className="space-y-4">
                      {/* Title */}
                      <div>
                        <h2 className="text-3xl font-bold font-serif text-headline leading-[1.15] tracking-tight sm:text-4xl">
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

                      {/* Tech stack: surface the tools before the supporting copy. */}
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          {project.tech.map((tag) => (
                            <span
                              key={tag}
                              className="border border-accent-200/20 bg-bg-100/75 px-3 py-1.5 font-mono text-sm text-accent-200 shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Description */}
                      <p className="max-w-lg text-base leading-[1.7] text-paragraph/80">{project.description}</p>
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
                          className="group/demo inline-flex items-center gap-2 rounded-md border border-accent-200/35 bg-bg-100/40 px-4 py-2.5 text-sm font-semibold text-link shadow-sm transition-[transform,background-color,border-color,box-shadow,color] duration-200 hover:-translate-y-0.5 hover:border-accent-200/70 hover:bg-accent-200/10 hover:text-headline hover:shadow-[0_8px_24px_-12px_var(--accent-200)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-200 motion-reduce:transform-none motion-reduce:transition-none"
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
        <div className="hidden lg:block w-px bg-accent-200/55 self-stretch" />

        {/* ════════════════ Sidebar ════════════════ */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-24 space-y-5">
            <ProjectIndex projects={publishedProjects.map(({ slug, title }) => ({ slug, title }))} />

            {/* Quick stats */}
            <div className="space-y-3 rounded-xl border border-accent-100/20 bg-bg-200/50 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-200">At a glance</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-headline">{publishedProjects.length}</span>
                <span className="text-sm text-paragraph/50">projects</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-headline">
                  {new Set(publishedProjects.flatMap((p) => p.tech)).size}
                </span>
                <span className="text-sm text-paragraph/50">technologies</span>
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
