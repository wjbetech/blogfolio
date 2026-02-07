import { getChangelogEntries } from "@/lib/changelog/entryParser";
import ChangelogEntry from "@/components/ChangelogEntry/ChangelogEntry";
import Link from "next/link";
import Image from "next/image";
import { IconArrowUpRight, IconBrandGithub, IconCode } from "@tabler/icons-react";
import { mockProjects } from "../data/projects";

export default function DevPage() {
  const entries = getChangelogEntries();

  return (
    <div className="max-w-7xl mx-auto ">
      {/* ── Hero header ── */}
      <header className="pt-6 pb-16 relative">
        <div className="relative z-10 space-y-4">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-accent-200">Portfolio &mdash; Projects</p>
          <h1 className="text-3xl font-serif font-extrabold text-headline tracking-tight leading-[1.1]">Dev</h1>
          <p className="text-lg text-paragraph leading-relaxed">Software I&apos;ve designed and built.</p>
        </div>

        {/* Thin accent rule */}
        <div className="mt-10 h-px w-full bg-accent-200/40" />
      </header>

      <div className="flex gap-14 lg:gap-16">
        {/* ════════════════ Main column ════════════════ */}
        <section className="flex-1 min-w-0">
          {mockProjects.map((project, i) => {
            const isEven = i % 2 === 0;
            const hasImage = project.images && project.images.length > 0 && project.images[0] !== "";
            const num = String(i + 1).padStart(2, "0");

            return (
              <article key={project.id} id={project.slug} className="scroll-mt-28 group/project mb-28 last:mb-12">
                {/* ── Project number + rule ── */}
                <div className={`flex items-center gap-4 mb-6 ${isEven ? "" : "flex-row-reverse"}`}>
                  <span className="font-mono text-accent-200 tracking-widest">{num}</span>
                  <div className="flex-1 h-px bg-accent-100/30" />
                  {project.featured && i !== 0 && i !== 3 && (
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent-200/70">Featured</span>
                  )}
                </div>

                {/* ── Card with accent edge ── */}
                <div className="relative">
                  {/* Accent edge stripe */}
                  <div className={`absolute top-0 bottom-0 w-1 bg-accent-200 z-10 ${isEven ? "left-0" : "right-0"}`} />

                  <div
                    className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-stretch overflow-hidden bg-bg-200 border border-accent-100/8 transition-all duration-300 group-hover/project:-translate-y-0.5 group-hover/project:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)]`}>
                    {/* ── Visual side ── */}
                    <div className="relative w-full md:w-[42%] shrink-0 overflow-hidden">
                      {hasImage ? (
                        <div className="relative w-full h-80 md:h-full min-h-80">
                          <Image
                            src={project.images![0]}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover/project:scale-[1.06]"
                          />
                          <div className="absolute inset-0 bg-bg-200/10 mix-blend-multiply" />
                        </div>
                      ) : (
                        <div className="relative w-full h-80 md:h-full min-h-80 bg-bg-300/30 overflow-hidden">
                          {/* Layered geometric decoration */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            {/* Background circle */}
                            <div className="absolute w-40 h-40 rounded-full border border-accent-100/8" />
                            <div className="absolute w-56 h-56 rounded-full border border-accent-100/5 rotate-45" />
                            {/* Large initial */}
                            <span className="text-[10rem] font-serif font-black text-accent-100 select-none leading-none">
                              {project.title.charAt(0)}
                            </span>
                          </div>
                          {/* Corner accent */}
                          <div className={`absolute bottom-0 ${isEven ? "right-0" : "left-0"} w-20 h-20`}>
                            <div
                              className={`absolute bottom-0 ${isEven ? "right-0" : "left-0"} w-full h-full bg-accent-200`}
                            />
                          </div>
                          {/* Floating tech icon */}
                          <div className="absolute bottom-6 left-6 flex items-center gap-2">
                            <IconCode className="w-5 h-5 text-accent-200/30" />
                            <span className="text-[11px] font-mono text-accent-200/30 tracking-wider">
                              {project.tech?.[0] ?? "code"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ── Content side ── */}
                    <div
                      className={`flex-1 flex flex-col justify-between p-8 md:p-10 lg:p-12 ${isEven ? "md:pl-10" : "md:pr-10"}`}>
                      <div className="space-y-6">
                        {/* Title with hover underline */}
                        <div>
                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-extrabold text-headline leading-[1.15] tracking-tight">
                            <span className="relative inline-block">
                              {project.title}
                              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-200 transition-all duration-300 group-hover/project:w-full" />
                            </span>
                          </h2>
                        </div>

                        {/* Description — slightly larger for readability */}
                        <p className="text-base text-paragraph/75 leading-[1.7] max-w-lg">{project.description}</p>

                        {/* Tech stack — pills with subtle background */}
                        {project.tech && project.tech.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-accent-200/60 font-mono block">
                              Built with
                            </span>
                            <div className="flex items-center gap-2 flex-wrap">
                              {project.tech.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[12px] px-3 py-1 bg-bg-100/60 border border-accent-100/10 text-paragraph/65 font-mono transition-colors duration-200 hover:border-accent-200/30 hover:text-headline">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions — separated with space, not a border */}
                      <div className="flex items-center gap-5 mt-10">
                        {(project.repo || project.link) && (
                          <Link
                            href={project.repo || project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/gh inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium rounded-lg bg-[#24292f] text-[#f6f8fa] border border-[#57606a]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_3px_rgba(0,0,0,0.12)] hover:bg-[#32383f] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_6px_16px_rgba(0,0,0,0.18)] active:bg-[#1c2024] active:shadow-none transition-all duration-150">
                            <IconBrandGithub className="w-4.5 h-4.5 transition-transform duration-200 group-hover/gh:rotate-[-8deg]" />
                            View on GitHub
                          </Link>
                        )}
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/demo inline-flex items-center gap-2 text-sm text-link font-medium hover:text-headline transition-colors">
                            Live Demo
                            <IconArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5" />
                          </Link>
                        )}
                      </div>
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
              <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-200 mb-5">Index</h3>
              <nav className="space-y-0.5">
                {mockProjects.map((project, i) => (
                  <a
                    key={project.id}
                    href={`#${project.slug}`}
                    className="group/nav flex items-center gap-3 py-2 cursor-pointer transition-colors">
                    <span className="text-[11px] font-mono text-paragraph/30 group-hover/nav:text-accent-200 transition-colors tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] text-paragraph/60 group-hover/nav:text-headline transition-colors truncate">
                      {project.title}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick stats */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-200 mb-3">At a glance</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-headline">{mockProjects.length}</span>
                <span className="text-xs text-paragraph/50">projects</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-headline">
                  {new Set(mockProjects.flatMap((p) => p.tech)).size}
                </span>
                <span className="text-xs text-paragraph/50">technologies</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-headline">
                  {mockProjects.filter((p) => p.featured).length}
                </span>
                <span className="text-xs text-paragraph/50">featured</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Changelog ── */}
      <div className="mt-24 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[11px] font-mono text-accent-200 tracking-widest uppercase">Changelog</span>
          <div className="flex-1 h-px bg-accent-200/40" />
        </div>

        <section className="pb-16 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-headline mb-3 tracking-tight">
            What&apos;s New
          </h2>
          <p className="text-base text-paragraph/70 mb-10 max-w-lg leading-relaxed">
            Track updates, improvements, and fixes to this application.
          </p>

          <div className="space-y-6">
            {entries.map((entry, idx) => (
              <ChangelogEntry key={`${entry.date}-${idx}`} entry={entry} />
            ))}
          </div>

          {entries.length === 0 && <p className="text-center text-paragraph/50 py-12">No changelog entries yet.</p>}
        </section>
      </div>
    </div>
  );
}
