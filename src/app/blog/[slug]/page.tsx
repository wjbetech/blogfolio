// next imports
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// lib imports
import { createBlogListMetadata, generatePostMetadata } from "@/lib/metadata";
import { createBlogPostingJsonLd, serializeJsonLd } from "@/lib/metadataHelper";
import { getPublishedPosts } from "@/lib/content";
import { formatDate } from "@/lib/date";

// component imports
import CoverImage from "@/components/Blog/CoverImage";
import PostNav from "@/components/Blog/PostNav";
import { allPosts } from "contentlayer/generated";
import { Button } from "@/components/ui/button";
import ArrowLeftIcon from "@/components/Icons/ArrowLeftIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import { IconClock } from "@tabler/icons-react";
import PostContent from "@/components/Blog/PostContent";

export async function generateStaticParams() {
  return getPublishedPosts(allPosts).map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPosts(allPosts).find((candidate) => candidate.slug === slug);
  if (!post) {
    return createBlogListMetadata();
  }

  return generatePostMetadata(post);
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPublishedPosts(allPosts).find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const blogPostingJsonLd = createBlogPostingJsonLd(post);

  const heroImage = post.coverImage?.trim() || post.images?.[0]?.trim() || "";

  return (
    <article className="mx-auto w-full max-w-7xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogPostingJsonLd) }} />
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 text-link hover:text-headline cursor-pointer -ml-2">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to all blogs
          </Button>
        </Link>
      </div>

      {/* B+C Hybrid: author-first header + deck + rule */}
      <header className="mx-auto max-w-3xl space-y-5 mb-8">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-accent-100/20 bg-bg-200 font-serif text-xs font-bold text-headline">
            WE
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-paragraph/70">
            <span className="font-medium text-headline">{post.author || "William East"}</span>
            <span className="hidden sm:inline text-paragraph/25">•</span>
            <span className="flex items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              {post.readingTime > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-accent-200/30 bg-bg-200 px-2.5 py-0.5 text-xs font-medium text-paragraph/80">
                  <IconClock className="w-3 h-3" />
                  {post.readingTime} min
                </span>
              )}
            </span>
          </div>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[0.95] tracking-tight text-balance text-headline">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="max-w-2xl text-pretty text-lg md:text-xl leading-relaxed text-paragraph/80">{post.excerpt}</p>
        )}

        <div className="h-px w-12 bg-accent-200/70" aria-hidden="true" />
      </header>

      {/* Hero: bleed wider than body (Quartz pattern) */}
      <section className="mx-auto max-w-4xl mb-10 overflow-hidden rounded-xl">
        <CoverImage src={heroImage} title={post.title} className="rounded-xl" />
      </section>

      <section className="rounded-xl">
        <PostContent code={post.body.code} />
      </section>

      {/* Footer topics + author bio (Substack/Craft) */}
      <div className="mx-auto max-w-3xl mt-12 space-y-8">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-t border-accent-100/15 pt-6">
            <span className="text-xs font-medium uppercase tracking-widest text-paragraph/40 mr-1">Topics</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent-100/20 bg-bg-200/60 px-3 py-1 text-xs text-paragraph/70">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4 rounded-xl border border-accent-100/10 bg-bg-200/40 p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-300 font-serif text-sm font-bold text-headline">
            WE
          </div>
          <div className="space-y-1">
            <div className="text-sm font-semibold text-headline">William East</div>
            <p className="text-sm leading-relaxed text-paragraph/75">
              Building <Link href="/dev" className="underline decoration-accent-200/40 underline-offset-4 hover:text-headline">Orbit</Link> and writing about code & life in Korea.
              View more <Link href="/dev" className="underline decoration-accent-200/40 underline-offset-4 hover:text-headline">projects</Link> or{" "}
              <Link href="/language-services" className="underline decoration-accent-200/40 underline-offset-4 hover:text-headline">language services</Link>.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <PostNav posts={getPublishedPosts(allPosts)} slug={post.slug} />
      </div>

      <footer className="mt-8 sm:mt-10 flex items-center">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 bg-bg-100 text-link hover:text-headline cursor-pointer">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to all blogs
          </Button>
        </Link>
      </footer>
    </article>
  );
}
