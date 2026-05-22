// next imports
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// lib imports
import { createBlogListMetadata, generatePostMetadata } from "@/lib/metadata";
import { createBlogPostingJsonLd, serializeJsonLd } from "@/lib/metadataHelper";
import { parsePostContent } from "@/lib/postContent";

// component imports
import CoverImage from "@/components/Blog/CoverImage";
import PostNav from "@/components/Blog/PostNav";
import { allPosts } from "contentlayer/generated";
import { Button } from "@/components/ui/button";
import ArrowLeftIcon from "@/components/Icons/ArrowLeftIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import HeadingAnchor from "@/components/Blog/HeadingAnchor";

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
              const safeLevel = block.level <= 2 ? 2 : block.level === 3 ? 3 : 4;

              return <HeadingAnchor key={`${post.id}-${idx}`} level={safeLevel} id={block.id} text={block.text} />;
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
