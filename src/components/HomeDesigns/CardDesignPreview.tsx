"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogCardData, ProjectCardData } from "@/lib/homeCards";
import CompactCard from "./CompactCard";

type Entry = { href: string; title: string; description: string; image: string };
type Design = "open" | "inset" | "horizontal" | "image-led" | "type-first";

const designs: { id: Design; name: string; note: string }[] = [
  { id: "open", name: "Open canvas", note: "A photograph, clear type, and room to breathe. No frame or fill." },
  { id: "inset", name: "Inset surface", note: "A quiet rounded surface, with the photograph tucked inside." },
  { id: "horizontal", name: "Compact horizontal", note: "Small thumbnails alongside the story. Compact and easy to scan." },
  { id: "image-led", name: "Image-led", note: "A generous photograph and a short title. The simplest gallery treatment." },
  { id: "type-first", name: "Type-first", note: "The headline leads; the image and description follow." }
];

const titleClass = "font-serif font-semibold leading-snug tracking-tight text-headline group-hover:underline decoration-accent-100/60 underline-offset-4";

function Cover({ entry, className }: { entry: Entry; className: string }) {
  return <div className={`relative overflow-hidden bg-bg-200 ${className}`}>
    <Image src={entry.image || "/images/assets/placeholder.png"} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-cover" />
  </div>;
}

function DesignCard({ entry, design }: { entry: Entry; design: Design }) {
  if (design === "horizontal") return <CompactCard entry={entry} />;
  const description = <p className="line-clamp-2 text-sm leading-relaxed text-paragraph">{entry.description}</p>;
  const readLink = <span className="text-sm font-medium text-link">View <span aria-hidden="true">↗</span></span>;
  let content;

  switch (design) {
    case "open":
      content = <article className="flex h-full flex-col gap-4">
        <Cover entry={entry} className="aspect-[7/4] rounded-lg" />
        <h3 className={`${titleClass} text-xl`}>{entry.title}</h3>
        {description}
        <div className="mt-auto pt-1">{readLink}</div>
      </article>;
      break;
    case "inset":
      content = <article className="flex h-full flex-col rounded-2xl bg-bg-200/60 p-3">
        <Cover entry={entry} className="aspect-[7/4] rounded-xl" />
        <div className="flex flex-1 flex-col gap-3 px-3 pb-3 pt-5">
          <h3 className={`${titleClass} text-xl`}>{entry.title}</h3>
          {description}
          <div className="mt-auto pt-3">{readLink}</div>
        </div>
      </article>;
      break;
    case "image-led":
      content = <article>
        <Cover entry={entry} className="aspect-[4/3] rounded-xl" />
        <div className="mt-4 flex items-start justify-between gap-5">
          <h3 className={`${titleClass} text-xl`}>{entry.title}</h3>
          <span aria-hidden="true" className="shrink-0 text-xl text-link">↗</span>
        </div>
      </article>;
      break;
    case "type-first":
      content = <article className="flex h-full flex-col gap-4 border-t border-paragraph/25 pt-5">
        <h3 className={`${titleClass} line-clamp-3 min-h-[6.25rem] text-2xl`}>{entry.title}</h3>
        <Cover entry={entry} className="aspect-[2/1] rounded-sm" />
        {description}
        <div className="mt-auto pt-1">{readLink}</div>
      </article>;
      break;
  }

  return <Link href={entry.href} className="group block min-w-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-100">{content}</Link>;
}

export default function CardDesignPreview({ posts, projects }: { posts: BlogCardData[]; projects: ProjectCardData[] }) {
  const [collection, setCollection] = useState<"writing" | "projects">("writing");
  const entries: Entry[] = collection === "writing"
    ? posts.map(post => ({ href: `/blog/${post.slug}`, title: post.title, description: post.snippet, image: post.image }))
    : projects.map(project => ({ href: `/dev/${project.slug}`, title: project.title, description: project.description, image: project.image }));

  return <div className="space-y-12 pb-16 pt-8">
    <header className="space-y-5">
      <Link href="/" className="text-sm font-medium text-link underline underline-offset-4">← Home</Link>
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-headline sm:text-5xl">Card designs</h1>
      <p className="max-w-2xl text-paragraph">Five directions, with the same content in each. Use the theme picker to compare palettes.</p>
      <div className="flex flex-wrap items-center gap-2" aria-label="Preview content">
        {(["writing", "projects"] as const).map(value => <button key={value} type="button" aria-pressed={collection === value} onClick={() => setCollection(value)} className={`rounded-full px-5 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-100 ${collection === value ? "bg-button text-buttonText" : "text-paragraph hover:bg-bg-200"}`}>{value === "writing" ? "Writing" : "Projects"}</button>)}
      </div>
      <nav aria-label="Card designs" className="flex flex-wrap gap-x-5 gap-y-2">
        {designs.map(design => <a key={design.id} href={`#${design.id}`} className="text-sm text-link underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-accent-100">{design.name}</a>)}
      </nav>
    </header>
    <div aria-live="polite" aria-atomic="true" className="sr-only">Showing {collection === "writing" ? "writing" : "projects"} in five designs.</div>
    {designs.map(design => <section key={design.id} id={design.id} aria-labelledby={`${design.id}-title`} className="scroll-mt-6 space-y-6">
      <div>
        <h2 id={`${design.id}-title`} className="font-serif text-2xl font-semibold text-headline">{design.name}</h2>
        <p className="mt-1 text-sm text-paragraph">{design.note}</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(entry => <DesignCard key={entry.href} entry={entry} design={design.id} />)}
      </div>
    </section>)}
  </div>;
}
