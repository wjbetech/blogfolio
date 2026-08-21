import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { allProjects } from "contentlayer/generated";
import { createDevMetadata, generateDevProjectMetadata } from "@/lib/metadata";
import { serializeJsonLd, toAbsoluteStructuredDataUrl, toAbsoluteStructuredDataUrls } from "@/lib/metadataHelper";
import { formatDate } from "@/lib/date";
import { getExistingProjectImages } from "@/lib/projectImages.server";

import TrackedLink from "@/components/Analytics/TrackedLink";
import ProjectImageSlider from "../ProjectImageSlider";
import { shouldShowLiveDemo } from "@/lib/projectLinks";
import { getPublishedProjects } from "@/lib/content";
import { IconArrowLeft, IconArrowRight, IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";

const publishedProjects = getPublishedProjects(allProjects);

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = publishedProjects.find((p) => p.slug === slug);
  if (!project) return createDevMetadata();
  return generateDevProjectMetadata(project);
}

type DevProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DevProjectPage({ params }: DevProjectPageProps) {
  const { slug } = await params;
  const projectIndex = publishedProjects.findIndex((p) => p.slug === slug);
  const project = projectIndex === -1 ? undefined : publishedProjects[projectIndex];

  if (!project) notFound();

  const images = getExistingProjectImages(project.images);

  const prevProject = projectIndex > 0 ? publishedProjects[projectIndex - 1] : null;
  const nextProject = projectIndex < publishedProjects.length - 1 ? publishedProjects[projectIndex + 1] : null;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: toAbsoluteStructuredDataUrl(`/dev/${project.slug}`),
    image: toAbsoluteStructuredDataUrls(project.images ?? [])[0],
    datePublished: project.publishedAt,
    dateModified: project.updatedAt || project.publishedAt,
    keywords: project.tech
  };

  return (
    <article className="mx-auto w-full max-w-7xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectJsonLd) }} />

      {/* ── Back link ── */}
      <nav className="pt-2 md:pt-4 animate-in fade-in animation-duration-[700ms] fill-mode-backwards">
        <Link
          href="/dev"
          className="group inline-flex items-center gap-2 font-sans text-sm text-paragraph hover:text-headline transition-colors duration-300">
          <IconArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to all projects
        </Link>
      </nav>

      {/* ── Editorial header ── */}
      <header className="mt-10 md:mt-16">
        <h1 className="mt-8 md:mt-10 font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-headline animate-in fade-in slide-in-from-bottom-6 animation-duration-[900ms] animation-delay-[100ms] fill-mode-backwards">
          {project.title}
        </h1>

        <p className="mt-6 md:mt-8 max-w-2xl text-lg md:text-xl text-paragraph leading-relaxed animate-in fade-in slide-in-from-bottom-4 animation-duration-[700ms] animation-delay-[250ms] fill-mode-backwards">
          {project.description}
        </p>
      </header>

      {/* ── Meta strip ── */}
      <div className="mt-12 md:mt-16 border-y border-paragraph/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 animation-duration-[700ms] animation-delay-[400ms] fill-mode-backwards">
        <div className="py-6 px-1 sm:pr-6 border-b sm:border-b-0 lg:border-r border-paragraph/15">
          <span className="block font-sans text-[0.65rem] uppercase tracking-[0.3em] text-paragraph/60 mb-2">
            Published
          </span>
          <time dateTime={project.publishedAt} className="font-serif text-lg font-semibold text-headline">
            {formatDate(project.publishedAt)}
          </time>
        </div>

        <div className="py-6 px-1 sm:pl-6 lg:px-6 border-b lg:border-b-0 lg:border-r border-paragraph/15">
          <span className="block font-sans text-[0.65rem] uppercase tracking-[0.3em] text-paragraph/60 mb-2">
            Last updated
          </span>
          <time dateTime={project.updatedAt} className="font-serif text-lg font-semibold text-headline">
            {formatDate(project.updatedAt || project.publishedAt)}
          </time>
        </div>

        <div className="py-6 px-1 sm:pr-6 lg:px-6 border-b sm:border-b-0 lg:border-r border-paragraph/15">
          <span className="block font-sans text-[0.65rem] uppercase tracking-[0.3em] text-paragraph/60 mb-2">
            Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-bg-100/60 border border-accent-100/10 text-paragraph/65 font-mono">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="py-6 px-1 sm:pl-6 lg:px-6">
          <span className="block font-sans text-[0.65rem] text-paragraph/60 mb-2">Links</span>
          <div className="flex flex-col items-start gap-1.5">
            {project.repo && (
              <TrackedLink
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium text-link hover:text-headline transition-colors"
                eventName="Project CTA Click"
                eventProps={{ kind: "github", slug: project.slug, surface: "dev_slug" }}>
                <IconBrandGithub className="w-4 h-4" />
                GitHub
                <IconArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </TrackedLink>
            )}
            {shouldShowLiveDemo(project.link, project.repo) && (
              <TrackedLink
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium text-link hover:text-headline transition-colors"
                eventName="Project CTA Click"
                eventProps={{ kind: "demo", slug: project.slug, surface: "dev_slug" }}>
                Live Demo
                <IconArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </TrackedLink>
            )}
            {!project.repo && !shouldShowLiveDemo(project.link, project.repo) && (
              <span className="text-sm text-paragraph/50">Private project</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Gallery ── */}
      <section className="mt-12 md:mt-16 animate-in fade-in zoom-in-[0.98] animation-duration-[900ms] animation-delay-[500ms] fill-mode-backwards">
        <ProjectImageSlider
          variant="gallery"
          images={images}
          title={project.title}
          fallback="/images/assets/placeholder.png"
        />
      </section>

      {/* ── Body ── */}
      {project.body?.html && (
        <section className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 animation-duration-[700ms] animation-delay-[650ms] fill-mode-backwards">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-paragraph/60">About</span>
              <div className="mt-4 w-12 h-px bg-accent-100/40" />
            </div>
          </div>

          <div
            className="lg:col-span-8 max-w-3xl space-y-6 text-base md:text-lg leading-[1.8] text-paragraph [&_a]:text-link [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-headline [&_h2]:mt-10 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-headline [&_h3]:mt-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_code]:font-mono [&_code]:text-sm [&_code]:bg-bg-200 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_blockquote]:border-l-2 [&_blockquote]:border-accent-100/50 [&_blockquote]:pl-5 [&_blockquote]:italic [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:font-serif [&>p:first-of-type]:first-letter:text-6xl [&>p:first-of-type]:first-letter:font-bold [&>p:first-of-type]:first-letter:leading-[0.85] [&>p:first-of-type]:first-letter:text-accent-100 [&>p:first-of-type]:first-letter:pr-3"
            dangerouslySetInnerHTML={{ __html: project.body.html }}
          />
        </section>
      )}

      {/* ── Prev / Next ── */}
      <nav
        className="mt-20 md:mt-28 border-t border-paragraph/15 grid grid-cols-1 sm:grid-cols-2"
        aria-label="Project navigation">
        <div className="sm:border-r border-paragraph/15">
          {prevProject && (
            <Link
              href={`/dev/${prevProject.slug}`}
              className="group block py-8 sm:pr-8 transition-all duration-300 hover:bg-bg-200/50 sm:hover:pl-3">
              <span className="inline-flex items-center gap-2 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-paragraph/60">
                <IconArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                Previous
              </span>
              <span className="mt-3 block font-serif text-2xl md:text-3xl font-semibold tracking-tight text-headline group-hover:text-accent-100 transition-colors duration-300">
                {prevProject.title}
              </span>
            </Link>
          )}
        </div>

        <div>
          {nextProject && (
            <Link
              href={`/dev/${nextProject.slug}`}
              className="group block py-8 sm:pl-8 text-left sm:text-right border-t sm:border-t-0 border-paragraph/15 transition-all duration-300 hover:bg-bg-200/50 sm:hover:pr-3">
              <span className="inline-flex items-center gap-2 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-paragraph/60">
                Next
                <IconArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="mt-3 block font-serif text-2xl md:text-3xl font-semibold tracking-tight text-headline group-hover:text-accent-100 transition-colors duration-300">
                {nextProject.title}
              </span>
            </Link>
          )}
        </div>
      </nav>

      {/* ── Footer back link ── */}
      <footer className="mt-4 mb-16 border-t border-paragraph/15 pt-8">
        <Link
          href="/dev"
          className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-paragraph/70 hover:text-headline transition-colors duration-300">
          <IconArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to all projects
        </Link>
      </footer>
    </article>
  );
}
