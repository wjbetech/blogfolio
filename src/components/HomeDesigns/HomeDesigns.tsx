"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel, { type CarouselHandle } from "@/components/Carousel/Carousel";
import type { BlogCardData, ProjectCardData } from "@/lib/homeCards";

type Design = "letter" | "index" | "studio";
type Entry = { href: string; title: string; description: string; image: string; kind: string };

const designs: { id: Design; name: string; note: string }[] = [
  { id: "letter", name: "The Letter", note: "Personal, spacious, and led by the portrait" },
  { id: "index", name: "The Index", note: "A bold headline and a compact catalogue of work" },
  { id: "studio", name: "The Studio", note: "A working desk for code, language, and writing" }
];

function Portrait({ className, sizes = "(max-width: 768px) 100vw, 400px" }: { className: string; sizes?: string }) {
  return <div className={`relative overflow-hidden bg-bg-300 ${className}`}><Image src="/images/assets/avatar.png" alt="William East in Seoul" fill priority sizes={sizes} className="object-cover" /></div>;
}

function LetterHero() {
  return <section className="grid items-center gap-8 border-b border-palette-border/60 pb-12 pt-4 md:grid-cols-[0.85fr_1.15fr] md:gap-14 md:pt-8">
    <div className="relative mx-auto w-full max-w-md md:max-w-none">
      <Portrait className="aspect-[4/4.5] rounded-t-[45%] rounded-b-sm" />
      <p className="absolute inset-x-0 bottom-0 bg-bg-100/90 px-4 py-3 font-mono text-xs text-headline backdrop-blur-sm">William East · Seoul, South Korea</p>
    </div>
    <div className="max-w-2xl">
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent-200">A note from Will</p>
      <h1 className="font-serif text-[clamp(2.8rem,6vw,5.7rem)] font-semibold leading-[0.97] tracking-[-0.055em] text-headline">I make things <span className="text-accent-100">make sense.</span></h1>
      <p className="mt-7 max-w-xl text-lg leading-relaxed text-paragraph">I&apos;m a developer and Korean ↔ English translator based in Seoul. I build useful software, make complicated ideas clearer, and write about the work along the way.</p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/dev" className="bg-button px-5 py-3 text-sm font-semibold text-buttonText hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-100">Explore development ↗</Link>
        <Link href="/language-services" className="border border-palette-border/70 px-5 py-3 text-sm font-semibold text-link hover:bg-bg-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-100">Language services ↗</Link>
      </div>
    </div>
  </section>;
}

function IndexHero() {
  return <section className="border-b border-palette-border/60 pb-12 pt-6 md:pt-10">
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
      <div>
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-accent-200">William East / developer · translator · writer</p>
        <h1 className="max-w-4xl font-serif text-[clamp(3.5rem,8vw,7.7rem)] font-semibold leading-[0.91] tracking-[-0.07em] text-headline">Good work starts with <span className="text-accent-100">clear thinking.</span></h1>
        <div className="mt-9 grid gap-5 border-t border-palette-border/60 pt-6 sm:grid-cols-2">
          <Link href="/dev" className="border-l-2 border-accent-200 pl-4 text-paragraph hover:text-headline focus-visible:outline-2 focus-visible:outline-accent-100"><span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-accent-200">Build</span><strong className="block font-serif text-xl text-headline">Software & systems ↗</strong><span className="mt-2 block text-sm leading-relaxed">Apps, sites, AI assisted engineering, and the details that keep them running.</span></Link>
          <Link href="/language-services" className="border-l-2 border-accent-100 pl-4 text-paragraph hover:text-headline focus-visible:outline-2 focus-visible:outline-accent-100"><span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-accent-200">Translate</span><strong className="block font-serif text-xl text-headline">Korean ↔ English ↗</strong><span className="mt-2 block text-sm leading-relaxed">Translation, editing, and teaching shaped by life in Seoul.</span></Link>
        </div>
      </div>
      <div className="self-start lg:pt-4"><Portrait className="aspect-[4/5] w-full max-w-sm border border-palette-border/60" sizes="(max-width: 1024px) 400px, 288px" /><p className="mt-3 flex justify-between gap-3 font-mono text-xs text-paragraph"><span>SEOUL, KOREA</span><span>2016—NOW</span></p></div>
    </div>
  </section>;
}

function StudioHero() {
  return <section className="overflow-hidden border border-palette-border/65 bg-bg-200/35">
    <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        <div><p className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-accent-200">From my desk in Seoul</p><h1 className="max-w-2xl font-serif text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-headline">Words and <span className="text-accent-100">working code.</span></h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-paragraph">I&apos;m Will. I design and ship software, translate between Korean and English, and teach the ideas that connect both.</p></div>
        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-palette-border/60 pt-5 text-sm font-semibold text-link"><Link href="/dev" className="hover:text-headline focus-visible:outline-2 focus-visible:outline-accent-100">See my projects ↗</Link><Link href="/language-services" className="hover:text-headline focus-visible:outline-2 focus-visible:outline-accent-100">Work with me ↗</Link></div>
      </div>
      <div className="relative min-h-80 border-t border-palette-border/60 bg-bg-300 md:min-h-[34rem] md:border-l md:border-t-0"><div className="absolute inset-4 sm:inset-6"><Portrait className="size-full" sizes="(max-width: 768px) 100vw, 500px" /></div><div className="absolute bottom-8 left-8 bg-bg-100/95 px-4 py-3 shadow-lg sm:bottom-10 sm:left-10"><span className="block font-mono text-[11px] uppercase tracking-[0.15em] text-accent-200">Current coordinates</span><span className="mt-1 block font-semibold text-headline">Seoul, South Korea</span></div></div>
    </div>
  </section>;
}

function Shelf({ title, entries, href, linkText, design }: { title: string; entries: Entry[]; href: string; linkText: string; design: Design }) {
  const carousel = useRef<CarouselHandle>(null);
  const compact = design === "index";
  const framed = design === "studio";
  return <section className={`min-w-0 border-t pt-7 ${framed ? "border-accent-200/60" : "border-palette-border/60"}`} aria-label={title}>
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <h2 className={`${compact ? "text-2xl" : "text-3xl sm:text-4xl"} font-serif font-semibold tracking-tight text-headline`}>{title}</h2>
      <div className="flex items-center gap-3 sm:gap-5">
        <Link href={href} className="text-sm font-semibold text-link underline decoration-accent-100/70 decoration-4 underline-offset-2 hover:text-headline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-100">{linkText} ↗</Link>
        <div className="flex gap-1">
          <button type="button" aria-label={`Previous ${title.toLowerCase()}`} onClick={() => carousel.current?.scrollLeft()} className="flex size-9 items-center justify-center border border-palette-border/50 text-accent-200 hover:bg-bg-200 focus-visible:outline-2 focus-visible:outline-accent-100">←</button>
          <button type="button" aria-label={`Next ${title.toLowerCase()}`} onClick={() => carousel.current?.scrollRight()} className="flex size-9 items-center justify-center border border-palette-border/50 text-accent-200 hover:bg-bg-200 focus-visible:outline-2 focus-visible:outline-accent-100">→</button>
        </div>
      </div>
    </div>
    <Carousel ref={carousel} hideControls gap={compact ? 16 : 24} step={compact ? 340 : 400}>
      {entries.map((entry) => <Link key={entry.href} href={entry.href} className={`group block shrink-0 snap-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-100 ${compact ? "w-68" : framed ? "w-88" : "w-76 sm:w-84"}`}>
        <article className={`h-full overflow-hidden ${compact ? "border-l-2 border-accent-100/70 pl-4" : framed ? "border border-palette-border/60 bg-bg-200/40 p-3" : ""}`}>
          <div className={`relative overflow-hidden bg-bg-300 ${compact ? "aspect-[8/5]" : framed ? "aspect-[7/4]" : "aspect-[4/3]"}`}><Image src={entry.image || "/images/assets/placeholder.png"} alt="" fill sizes="(max-width: 640px) 304px, 352px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none" /></div>
          <div className={`${framed ? "px-2 pb-2" : ""} pt-4`}><p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-200">{entry.kind}</p><h3 className={`${compact ? "text-lg" : "text-xl"} font-serif font-semibold leading-snug text-headline transition-colors group-hover:text-accent-100`}>{entry.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-relaxed text-paragraph">{entry.description}</p><span className="mt-4 inline-block text-sm font-semibold text-accent-200">View ↗</span></div>
        </article>
      </Link>)}
    </Carousel>
  </section>;
}

export default function HomeDesigns({ posts, projects }: { posts: BlogCardData[]; projects: ProjectCardData[] }) {
  const [selected, setSelected] = useState<Design>("letter");
  const blogEntries = posts.map((post) => ({ href: `/blog/${post.slug}`, title: post.title, description: post.snippet, image: post.image, kind: "Writing" }));
  const projectEntries = projects.map((project) => ({ href: `/dev/${project.slug}`, title: project.title, description: project.description, image: project.image, kind: "Project" }));
  return <div className="pb-10">
    <div className="my-5 flex flex-wrap items-center justify-between gap-3 border-b border-palette-border/50 pb-4" aria-label="Homepage design previews">
      <div><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-200">Homepage study</p><p className="mt-1 text-sm text-paragraph">Switch between three directions</p></div>
      <div role="group" aria-label="Homepage design" className="flex flex-wrap gap-1 rounded-full border border-palette-border/50 bg-bg-200/45 p-1">
        {designs.map((design) => <button key={design.id} type="button" aria-pressed={selected === design.id} aria-controls="home-design-panel" onClick={() => setSelected(design.id)} className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-accent-100 ${selected === design.id ? "bg-button text-buttonText" : "text-paragraph hover:bg-bg-300"}`}>{design.name}</button>)}
      </div>
    </div>
    <p className="mb-7 text-sm text-paragraph" aria-live="polite">{designs.find((design) => design.id === selected)?.note}</p>
    <div id="home-design-panel" className="space-y-12 md:space-y-16">
      {selected === "letter" && <LetterHero />}
      {selected === "index" && <IndexHero />}
      {selected === "studio" && <StudioHero />}
      <Shelf title={selected === "index" ? "From the journal" : "Writing"} entries={blogEntries} href="/blog" linkText="All articles" design={selected} />
      <Shelf title={selected === "studio" ? "Built at the desk" : "Projects"} entries={projectEntries} href="/dev" linkText="All projects" design={selected} />
    </div>
  </div>;
}
