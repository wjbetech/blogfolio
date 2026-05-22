import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CoverImage from "@/components/Blog/CoverImage";
import PostNav from "@/components/Blog/PostNav";
import { allPosts } from "contentlayer/generated";
import { Button } from "@/components/ui/button";
import ArrowLeftIcon from "@/components/Icons/ArrowLeftIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import { createBlogListMetadata, generatePostMetadata } from "@/lib/metadata";
import { createBlogPostingJsonLd, serializeJsonLd } from "@/lib/metadataHelper";

type ParsedPostBlock =
  | { kind: "heading"; level: number; text: string; id: string }
  | { kind: "paragraph"; text: string };

function createHeadingSlug(text: string) {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "section"
  );
}

function parsePostContent(raw: string): ParsedPostBlock[] {
  const headingCounts = new Map<string, number>();

  return raw
    .replace(/\r\n/g, "\n")
    .trim()
    .split(/\n{2,}/)
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const headingMatch = segment.match(/^(#{1,6})\s+(.*)$/);

      if (!headingMatch) {
        return { kind: "paragraph", text: segment };
      }

      const [, hashes, text] = headingMatch;
      const cleanedText = text.trim();
      const level = Math.min(hashes.length + 1, 6);

      const baseSlug = createHeadingSlug(cleanedText);
      const seenCount = (headingCounts.get(baseSlug) ?? 0) + 1;
      headingCounts.set(baseSlug, seenCount);

      const id = seenCount === 1 ? baseSlug : `${baseSlug}-${seenCount}`;

      return {
        kind: "heading",
        level,
        text: cleanedText,
        id
      };
    });
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = allPosts.find((candidate) => candidate.slug === params.slug);
  if (!post) {
    return createBlogListMetadata();
  }

  return generatePostMetadata(post);
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatPublishedDate(dateValue: string) {
  return new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const blogPostingJsonLd = createBlogPostingJsonLd(post);

  const heroImage = post.coverImage?.trim() || post.images?.[0]?.trim() || "";

  const contentBlocks = parsePostContent(post.body?.raw ?? "");

  return (
    <article className="mx-auto w-full max-w-7xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogPostingJsonLd) }} />
      <div className="mb-6">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 text-link hover:text-headline cursor-pointer">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to all blogs
          </Button>
        </Link>
      </div>

      <header className="mb-6 space-y-4">
        <div className="flex flex-wrap items-center gap-x-4 text-sm text-paragraph/80">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
          </div>
        </div>

        <h1 className="text-3xl font-serif text-headline leading-tight">{post.title}</h1>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent-100/30 bg-bg-200 px-3 py-1 text-xs font-medium text-link">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <section className="mb-8 sm:mb-10 overflow-hidden rounded-xl max-w-3xl mx-auto my-12">
        {/* Componentized cover image with robust fallback */}
        <CoverImage src={heroImage} title={post.title} className="rounded-xl" />
      </section>

      <section className="rounded-xl">
        <div className="space-y-4 text-base leading-8 text-paragraph sm:text-lg">
          {contentBlocks.map((block, idx) => {
            if (block.kind === "heading") {
              if (block.level === 2) {
                return (
                  <div key={`${post.id}-${idx}`} className="group relative mt-10 flex items-start gap-2">
                    <h2 id={block.id} className="text-2xl font-serif text-headline scroll-mt-24">
                      {block.text}
                    </h2>
                    <a
                      href={`#${block.id}`}
                      aria-label={`Link to section: ${block.text}`}
                      className="inline-flex items-center rounded-sm px-1 text-link opacity-0 transition-opacity group-hover:opacity-100 hover:text-headline focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-100">
                      #
                    </a>
                  </div>
                );
              }

              if (block.level === 3) {
                return (
                  <div key={`${post.id}-${idx}`} className="group relative mt-8 flex items-start gap-2">
                    <h3 id={block.id} className="text-xl font-serif text-headline scroll-mt-24">
                      {block.text}
                    </h3>
                    <a
                      href={`#${block.id}`}
                      aria-label={`Link to section: ${block.text}`}
                      className="absolute -left-6 top-1/2 -translate-y-1/2 inline-flex items-center rounded-sm px-1 text-link opacity-0 transition-opacity group-hover:opacity-100 hover:text-headline focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-100">
                      <span aria-hidden="true">§</span>
                    </a>
                  </div>
                );
              }

              return (
                <div key={`${post.id}-${idx}`} className="group relative mt-6 flex items-start gap-2">
                  <h4 id={block.id} className="text-lg font-serif text-headline scroll-mt-24">
                    {block.text}
                  </h4>
                  <a
                    href={`#${block.id}`}
                    aria-label={`Link to section: ${block.text}`}
                    className="inline-flex items-center rounded-sm px-1 text-link opacity-0 transition-opacity group-hover:opacity-100 hover:text-headline focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-100">
                    <span aria-hidden="true">§</span>
                  </a>
                </div>
              );
            }

            return (
              <p key={`${post.id}-${idx}`} className="whitespace-pre-wrap">
                {block.text}
              </p>
            );
          })}
        </div>
      </section>
      <PostNav posts={allPosts} slug={post.slug} />

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
