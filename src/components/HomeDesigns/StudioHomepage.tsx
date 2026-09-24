"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel, { type CarouselHandle } from "@/components/Carousel/Carousel";
import type { BlogCardData, ProjectCardData } from "@/lib/homeCards";

type Entry = { href: string; title: string; description: string; image: string };

function Portrait({ className, sizes = "(max-width: 768px) 100vw, 400px" }: { className: string; sizes?: string }) {
  return <div className={`relative overflow-hidden bg-transparent ${className}`}><Image src="/images/assets/avatar.png" alt="William East in Seoul" fill priority unoptimized sizes={sizes} className="object-cover" style={{ clipPath: "polygon(46px 0, 100% 0, 100% 100%, 0 100%, 0 46px)" }} /></div>;
}

function StudioHero() {
  return <section className="overflow-hidden border border-palette-border/65 bg-bg-200/35">
    <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
      <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
        <div><h1 className="max-w-2xl font-serif text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-headline">Words and <span className="text-accent-100">working code.</span></h1><p className="mt-5 max-w-xl text-base leading-relaxed text-paragraph sm:text-lg">I&apos;m Will. I design and ship software, translate between Korean and English, and teach the ideas that connect both.</p></div>
        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-palette-border/60 pt-4 text-sm font-semibold text-link"><Link href="/dev" className="hover:text-headline focus-visible:outline-2 focus-visible:outline-accent-100">See my projects ↗</Link><Link href="/contact" className="hover:text-headline focus-visible:outline-2 focus-visible:outline-accent-100">Work with me ↗</Link></div>
      </div>
      <div className="relative min-h-72 border-t border-palette-border/60 bg-bg-300 md:min-h-[28rem] md:border-l md:border-t-0"><div className="absolute inset-4 flex items-center justify-center sm:inset-5"><Portrait className="aspect-[506/478] w-full max-w-[430px]" sizes="430px" /></div><div className="absolute bottom-6 left-6 bg-bg-100/95 px-4 py-3 shadow-lg sm:bottom-7 sm:left-7"><span className="block font-mono text-[11px] uppercase tracking-[0.15em] text-accent-200">Current Location</span><span className="mt-1 block font-semibold text-headline">Seoul, South Korea</span></div></div>
    </div>
  </section>;
}

function Shelf({ title, entries, href, linkText }: { title: string; entries: Entry[]; href: string; linkText: string }) {
  const carousel = useRef<CarouselHandle>(null);
  return <section className="min-w-0 border-t border-accent-200/60 pt-7" aria-label={title}>
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <h2 className="text-3xl font-serif font-semibold tracking-tight text-headline sm:text-4xl">{title}</h2>
      <div className="flex items-center gap-3 sm:gap-5">
        <Link href={href} className="text-sm font-semibold text-link underline decoration-accent-100/70 decoration-4 underline-offset-2 hover:text-headline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-100">{linkText} ↗</Link>
        <div className="flex gap-1">
          <button type="button" aria-label={`Previous ${title.toLowerCase()}`} onClick={() => carousel.current?.scrollLeft()} className="flex size-9 items-center justify-center border border-palette-border/50 text-accent-200 hover:bg-bg-200 focus-visible:outline-2 focus-visible:outline-accent-100">←</button>
          <button type="button" aria-label={`Next ${title.toLowerCase()}`} onClick={() => carousel.current?.scrollRight()} className="flex size-9 items-center justify-center border border-palette-border/50 text-accent-200 hover:bg-bg-200 focus-visible:outline-2 focus-visible:outline-accent-100">→</button>
        </div>
      </div>
    </div>
    <Carousel ref={carousel} hideControls gap={24} step={400}>
      {entries.map((entry) => <Link key={entry.href} href={entry.href} className="group block w-88 shrink-0 snap-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-100">
        <article className="flex h-[26rem] flex-col overflow-hidden border border-palette-border/60 bg-bg-200/40 p-3">
          <div className="relative aspect-[7/4] shrink-0 overflow-hidden bg-bg-300"><Image src={entry.image || "/images/assets/placeholder.png"} alt="" fill sizes="(max-width: 640px) 304px, 352px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none" /></div>
          <div className="flex min-h-0 flex-1 flex-col px-2 pb-2 pt-4"><h3 className="line-clamp-2 min-h-[3.5rem] text-xl font-serif font-semibold leading-snug text-headline transition-colors group-hover:text-accent-100">{entry.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-relaxed text-paragraph">{entry.description}</p><span className="mt-auto inline-block pt-4 pb-1 text-sm font-semibold text-accent-200">View ↗</span></div>
        </article>
      </Link>)}
    </Carousel>
  </section>;
}

export default function StudioHomepage({ posts, projects }: { posts: BlogCardData[]; projects: ProjectCardData[] }) {
  const blogEntries = posts.map((post) => ({ href: `/blog/${post.slug}`, title: post.title, description: post.snippet, image: post.image }));
  const projectEntries = projects.map((project) => ({ href: `/dev/${project.slug}`, title: project.title, description: project.description, image: project.image }));
  return <div className="space-y-12 pb-10 pt-4 md:space-y-16">
    <StudioHero />
    <Shelf title="Writing" entries={blogEntries} href="/blog" linkText="All articles" />
    <Shelf title="Things I Built" entries={projectEntries} href="/dev" linkText="All projects" />
  </div>;
}
