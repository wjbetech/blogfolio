import Link from "next/link";
import { getPublishedBlogCards, getPublishedProjectCards } from "@/lib/homeCards";
import PrototypeSwitcher from "@/components/Prototype/PrototypeSwitcher";
import BlogPostCard from "@/components/HomePageBlogs/BlogPostCard/BlogPostCard";
import ProjectPostCard from "@/components/Projects/ProjectPostCard/ProjectPostCard";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import ArrowRightIcon from "@/components/Icons/ArrowRightIcon";
import { formatShortDate } from "@/lib/date";
import type { BlogCardData, ProjectCardData } from "@/lib/homeCards";

export const dynamic = "force-dynamic";

// --- Variant B: Full-bleed Editorial ---
function VariantB_BlogCard({ card }: { card: BlogCardData }) {
  const FALLBACK = "/images/assets/placeholder.png";
  const src = card.image || FALLBACK;
  return (
    <Link href={`/blog/${card.slug}`} className="block w-80 shrink-0 group cursor-grab active:cursor-grabbing select-none">
      <Card className="h-110 p-0 gap-0 overflow-hidden bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
        <div className="h-56 w-full overflow-hidden bg-bg-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" draggable={false} />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-paragraph/45 mb-3">
            <time dateTime={card.publishedAt} className="tabular-nums">{formatShortDate(card.publishedAt)}</time>
            <span>·</span><span>{card.readingTime} min</span>
          </div>
          <h3 className="font-serif text-[1.35rem] leading-tight font-semibold text-headline line-clamp-2 group-hover:text-accent-200 transition-colors">{card.title}</h3>
          {card.snippet ? <p className="text-[13px] leading-relaxed text-paragraph/70 mt-3 line-clamp-2">{card.snippet}</p> : null}
          <div className="mt-5 flex items-center gap-2 text-link font-semibold text-sm">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-accent-200 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:origin-left">Read</span>
            <ArrowRightIcon width={14} height={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </Link>
  );
}

function VariantB_ProjectCard({ project }: { project: ProjectCardData }) {
  const FALLBACK = "/images/assets/placeholder.png";
  const src = project.image || FALLBACK;
  return (
    <Link href={`/dev/${project.slug}`} className="block w-80 shrink-0 group cursor-grab active:cursor-grabbing select-none">
      <Card className="h-110 p-0 gap-0 overflow-hidden bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
        <div className="h-56 w-full overflow-hidden bg-bg-200">
          <img src={src} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" draggable={false} />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="text-[11px] font-mono px-2 py-1 rounded bg-bg-200 text-paragraph/60">{t}</span>
            ))}
          </div>
          <h3 className="font-serif text-[1.35rem] leading-tight font-semibold text-headline line-clamp-2 group-hover:text-accent-200 transition-colors">{project.title}</h3>
          <p className="text-[13px] leading-relaxed text-paragraph/70 mt-3 line-clamp-2">{project.description}</p>
          <div className="mt-5 flex items-center gap-2 text-link font-bold text-sm group-hover:gap-3 transition-all">
            View <ArrowRightIcon width={14} height={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </Link>
  );
}

// --- Variant C: Compact Row (horizontal) ---
function VariantC_BlogCard({ card }: { card: BlogCardData }) {
  const FALLBACK = "/images/assets/placeholder.png";
  const src = card.image || FALLBACK;
  return (
    <Link href={`/blog/${card.slug}`} className="block w-[28rem] shrink-0 group cursor-grab active:cursor-grabbing select-none">
      <Card className="h-48 p-0 gap-0 flex flex-row overflow-hidden bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-md transition-all duration-300">
        <div className="w-[42%] shrink-0 overflow-hidden bg-bg-200">
          <img src={src} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" draggable={false} />
        </div>
        <div className="flex-1 p-5 flex flex-col min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-paragraph/50 mb-2">
            <time dateTime={card.publishedAt}>{formatShortDate(card.publishedAt)}</time>
            <span>·</span><span>{card.readingTime} min</span>
          </div>
          <h3 className="text-[1.05rem] leading-snug font-semibold text-headline line-clamp-2 group-hover:text-accent-200 transition-colors">{card.title}</h3>
          <p className="text-[13px] leading-relaxed text-paragraph/65 mt-2 line-clamp-2 flex-1">{card.snippet}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-link group-hover:text-accent-200">View <ArrowRightIcon width={12} height={12} className="group-hover:translate-x-1 transition-transform" /></span>
        </div>
      </Card>
    </Link>
  );
}

function VariantC_ProjectCard({ project }: { project: ProjectCardData }) {
  const FALLBACK = "/images/assets/placeholder.png";
  const src = project.image || FALLBACK;
  return (
    <Link href={`/dev/${project.slug}`} className="block w-[28rem] shrink-0 group cursor-grab active:cursor-grabbing select-none">
      <Card className="h-48 p-0 gap-0 flex flex-row overflow-hidden bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-md transition-all duration-300">
        <div className="w-[42%] shrink-0 overflow-hidden bg-bg-200">
          <img src={src} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" draggable={false} />
        </div>
        <div className="flex-1 p-5 flex flex-col min-w-0">
          <div className="flex gap-1.5 flex-wrap mb-2">
            {project.tech.slice(0, 2).map((t) => (
              <span key={t} className="text-[11px] px-1.5 py-0.5 rounded bg-bg-200 text-paragraph/60">{t}</span>
            ))}
            {project.tech.length > 2 ? <span className="text-[11px] text-paragraph/40">+{project.tech.length - 2}</span> : null}
          </div>
          <h3 className="text-[1.05rem] leading-snug font-semibold text-headline line-clamp-2 group-hover:text-accent-200 transition-colors">{project.title}</h3>
          <p className="text-[13px] leading-relaxed text-paragraph/65 mt-1 line-clamp-2 flex-1">{project.description}</p>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-link group-hover:text-accent-200">View <ArrowRightIcon width={12} height={12} className="group-hover:translate-x-1 transition-transform" /></span>
        </div>
      </Card>
    </Link>
  );
}

function VariantLabel({ variant }: { variant: string }) {
  if (variant === "A") return <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded-full font-mono">A · Padded Inset (production)</span>;
  if (variant === "B") return <span className="text-xs bg-indigo-500 text-white px-2 py-1 rounded-full font-mono">B · Full-bleed Editorial</span>;
  return <span className="text-xs bg-amber-600 text-white px-2 py-1 rounded-full font-mono">C · Compact Row</span>;
}

export default async function CardsPrototypePage({ searchParams }: { searchParams: Promise<{ variant?: string }> }) {
  const params = await searchParams;
  const variant = (params.variant ?? "A").toUpperCase();
  const current = ["A", "B", "C"].includes(variant) ? variant : "A";

  const blogCards = getPublishedBlogCards().slice(0, 6);
  const projectCards = getPublishedProjectCards().slice(0, 6);

  return (
    <div className="min-h-screen bg-bg-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-paragraph/40">Prototype · throwaway · ?variant= A | B | C</p>
            <h1 className="font-serif text-3xl font-semibold text-headline mt-1">Cards — three structurally different variants</h1>
            <p className="text-sm text-paragraph/60 mt-2 max-w-2xl">Variant A is the current production (padded inset, no border, shadow hover, metadata strip, left-aligned). B is full-bleed editorial. C is compact horizontal. Toggle with the pill or ← → . Data is live from Contentlayer; drag works in all variants.</p>
          </div>
          <Link href="/" className="text-sm text-link hover:text-headline underline underline-offset-4">← Home</Link>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <VariantLabel variant={current} />
          <span className="text-xs text-paragraph/50">Pick one or steal bits · variant is in the URL</span>
        </div>

        {/* Blogs row */}
        <section className="mt-8">
          <div className="flex items-center justify-between pl-6">
            <h2 className="text-2xl font-semibold font-serif text-headline">Blogs</h2>
            <span className="text-xs text-paragraph/40">{blogCards.length} cards</span>
          </div>
          <div className="mt-4 flex gap-6 overflow-x-auto no-scrollbar pb-6 cursor-grab select-none pl-6" style={{ touchAction: "pan-y" }}>
            {blogCards.map((c) =>
              current === "A" ? (
                <BlogPostCard key={c.slug} card={c} />
              ) : current === "B" ? (
                <VariantB_BlogCard key={c.slug} card={c} />
              ) : (
                <VariantC_BlogCard key={c.slug} card={c} />
              )
            )}
          </div>
        </section>

        {/* Projects row */}
        <section className="mt-10">
          <div className="flex items-center justify-between pl-6">
            <h2 className="text-2xl font-semibold font-serif text-headline">Projects</h2>
            <span className="text-xs text-paragraph/40">{projectCards.length} cards</span>
          </div>
          <div className="mt-4 flex gap-6 overflow-x-auto no-scrollbar pb-6 cursor-grab select-none pl-6" style={{ touchAction: "pan-y" }}>
            {projectCards.map((p) =>
              current === "A" ? (
                <ProjectPostCard key={p.slug} project={p} />
              ) : current === "B" ? (
                <VariantB_ProjectCard key={p.slug} project={p} />
              ) : (
                <VariantC_ProjectCard key={p.slug} project={p} />
              )
            )}
          </div>
        </section>

        <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">How to decide</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-amber-800">
            <li><b>A</b> wins on consistency — inset image + text share left padding, title at same inset, no border, shadow hover.</li>
            <li><b>B</b> wins on drama — full-bleed image sells projects, editorial serif bigger, but taller cards.</li>
            <li><b>C</b> wins on density — horizontal, scans faster, but loses image impact.</li>
          </ul>
          <p className="mt-3 text-xs">Tell me “A header + B image” etc. — that hybrid is the real winner.</p>
        </div>
      </div>

      <PrototypeSwitcher variants={["A", "B", "C"]} current={current} labels={{ A: "Padded Inset", B: "Full-bleed", C: "Compact Row" }} />
    </div>
  );
}
