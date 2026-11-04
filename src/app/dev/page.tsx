import { IconBrandGithub } from "@tabler/icons-react";
import { createProjectsCollectionJsonLd, serializeJsonLd } from "@/lib/metadataHelper";
import { createDevMetadata } from "@/lib/metadata";
import { getExistingProjectImages } from "@/lib/projectImages.server";

import { getChangelogSlice } from "@/lib/changelog/entryParser";
import TrackedLink from "@/components/Analytics/TrackedLink";
import ChangelogList from "@/components/Changelog/ChangelogList";
import { allProjects } from "contentlayer/generated";
import CurrentRoleCard from "./CurrentRoleCard";
import Image from "next/image";
import styles from "./ProjectList.module.css";
import { shouldShowLiveDemo } from "@/lib/projectLinks";
import { getPublishedProjects } from "@/lib/content";

const projectSummaries: Record<string, string> = {
  orbit: "Plan projects, manage tasks, and keep notes in one personal workspace.",
  wordweb: "Explore word meanings and connections through an interactive graph.",
  picme: "Guess words from pictures in hangman and multiple-choice games.",
  "pic-me": "Guess words from pictures in hangman and multiple-choice games.",
  atomology: "Guess periodic elements in a Wordle-inspired browser game.",
  wowcomps: "Plan raid compositions across Classic World of Warcraft expansions.",
  "cabin-chat": "Self-hosted chat for friends, with reactions and photo sharing."
};

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

      <CurrentRoleCard />
      <section aria-label="Selected projects" className={styles.projects}>
        {publishedProjects.map((project) => {
          const image = getExistingProjectImages(project.images)[0] || "/images/assets/placeholder.png";
          return (
            <article key={project.id} id={project.slug} className={styles.project}>
              <TrackedLink href={`/dev/${project.slug}`} className={styles.thumbnail} aria-label={`Explore ${project.title}`} eventName="Project Card Click" eventProps={{ slug: project.slug, surface: "dev_image" }}>
                <Image src={image} alt={`${project.title} preview`} fill sizes="(max-width: 600px) 90vw, 242px" className={styles.image} />
              </TrackedLink>
              <div>
                <h2 className={styles.title}>
                  <TrackedLink href={`/dev/${project.slug}`} eventName="Project Card Click" eventProps={{ slug: project.slug, surface: "dev_title" }}>{project.title}</TrackedLink>
                </h2>
                <p className={styles.description}>{projectSummaries[project.slug] || project.description}</p>
                <div className={styles.links}>
                  {project.slug !== "cabin-chat" && <TrackedLink href={`/dev/${project.slug}`} className={styles.primaryButton} eventName="Project CTA Click" eventProps={{ kind: "case_study", slug: project.slug, surface: "dev_primary" }}>View Project</TrackedLink>}
                  {shouldShowLiveDemo(project.link, project.repo) && <TrackedLink href={project.link} target="_blank" rel="noopener noreferrer" eventName="Project CTA Click" eventProps={{ kind: "demo", slug: project.slug, surface: "dev_secondary" }}>Live Demo</TrackedLink>}
                  {project.repo && <TrackedLink href={project.repo} className={styles.githubButton} aria-label={`View ${project.title} on GitHub`} title="GitHub" target="_blank" rel="noopener noreferrer" eventName="Project CTA Click" eventProps={{ kind: "github", slug: project.slug, surface: "dev_primary" }}><IconBrandGithub size={18} aria-hidden="true" /></TrackedLink>}
                </div>
              </div>
            </article>
          );
        })}
      </section>

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
