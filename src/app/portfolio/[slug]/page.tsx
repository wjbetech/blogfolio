import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import path from "path";
import fs from "fs";

import { generateProjectMetadata, createPortfolioMetadata } from "@/lib/metadata";
import { allProjects } from "contentlayer/generated";
import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import TrackedLink from "@/components/Analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import ArrowLeftIcon from "@/components/Icons/ArrowLeftIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return createPortfolioMetadata();
  return generateProjectMetadata(project);
}

function formatDate(dateValue: string) {
  return new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  // Check if the declared cover image actually exists in public/
  const declared = project.images && project.images.length > 0 && project.images[0] !== "";
  let hasImage = false;
  if (declared) {
    const rel = project.images![0].startsWith("/") ? project.images![0].slice(1) : project.images![0];
    const abs = path.join(process.cwd(), "public", rel);
    try {
      hasImage = fs.existsSync(abs);
    } catch {
      hasImage = false;
    }
  }

  return (
    <article className="mx-auto w-full max-w-7xl">
      {/* Back link */}
      <div className="mb-6">
        <Link href="/dev">
          <Button variant="ghost" className="gap-2 text-link hover:text-headline cursor-pointer">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to all projects
          </Button>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10 space-y-5">
        <div className="flex flex-wrap items-center gap-x-4 text-sm text-paragraph/70">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <time dateTime={project.publishedAt}>{formatDate(project.publishedAt)}</time>
          </div>
          {project.updatedAt && project.updatedAt !== project.publishedAt && (
            <span className="text-paragraph/40">updated {formatDate(project.updatedAt)}</span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-extrabold text-headline leading-tight tracking-tight">
          {project.title}
        </h1>

        <p className="text-base md:text-lg text-paragraph/75 leading-relaxed max-w-2xl">{project.description}</p>

        {/* Tech pills */}
        {project.tech && project.tech.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-paragraph/60 font-mono font-semibold block">
              Built with
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-bg-200 border border-accent-100/10 text-paragraph/65 text-sm font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* External links */}
        <div className="flex items-center gap-5 pt-2">
          {(project.repo || project.link) && (
            <TrackedLink
              href={project.repo || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/gh inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium rounded-lg bg-[#24292f] text-[#f6f8fa] border border-[#57606a]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_3px_rgba(0,0,0,0.12)] hover:bg-[#32383f] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_6px_16px_rgba(0,0,0,0.18)] active:bg-[#1c2024] active:shadow-none transition-[background-color,box-shadow] duration-150"
              eventName="Project CTA Click"
              eventProps={{ kind: project.repo ? "github" : "demo", slug: project.slug, surface: "portfolio_slug" }}>
              <IconBrandGithub className="w-4.5 h-4.5 transition-transform duration-200 group-hover/gh:rotate-[-8deg]" />
              View on GitHub
            </TrackedLink>
          )}
          {project.link && (
            <TrackedLink
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/demo inline-flex items-center gap-2 text-sm text-link font-medium hover:text-headline transition-colors"
              eventName="Project CTA Click"
              eventProps={{ kind: "demo", slug: project.slug, surface: "portfolio_slug_secondary" }}>
              Live Demo
              <IconArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5" />
            </TrackedLink>
          )}
        </div>
      </header>

      {/* Cover image */}
      {hasImage && (
        <section className="mb-10 overflow-hidden rounded-xl max-w-3xl">
          <div className="relative w-full h-72 md:h-96">
            <Image src={project.images![0]} alt={project.title} fill className="object-cover" />
          </div>
        </section>
      )}

      {/* Body */}
      {project.body?.html && (
        <section
          className="prose prose-neutral max-w-3xl text-paragraph leading-relaxed"
          dangerouslySetInnerHTML={{ __html: project.body.html }}
        />
      )}

      {/* Footer nav */}
      <footer className="mt-12 flex items-center">
        <Link href="/dev">
          <Button variant="ghost" className="gap-2 bg-bg-100 text-link hover:text-headline cursor-pointer">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to all projects
          </Button>
        </Link>
      </footer>
    </article>
  );
}
