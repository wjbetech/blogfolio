import Link from "next/link";
import { formatDate } from "@/lib/date";
import CoverImage from "@/components/Blog/CoverImage";
import PostContent from "@/components/Blog/PostContent";
import BlogToc from "@/components/Blog/BlogToc";
import BlogTocMobile from "@/components/Blog/BlogTocMobile";
import { Button } from "@/components/ui/button";
import ArrowLeftIcon from "@/components/Icons/ArrowLeftIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import { IconClock } from "@tabler/icons-react";
import { type Post } from "contentlayer/generated";

type Props = {
  post: Post;
  allPosts: Post[];
};

function RelatedPosts({ posts, currentSlug }: { posts: Post[]; currentSlug: string }) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <div className="mt-16 border-t border-accent-100/15 pt-10">
      <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-paragraph/40">
        Continue reading
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group rounded-xl border border-accent-100/10 bg-bg-200/30 p-4 transition-colors hover:bg-bg-200/60"
          >
            <h3 className="mb-1.5 text-sm font-semibold leading-snug text-headline group-hover:text-accent-200 transition-colors">
              {p.title}
            </h3>
            <p className="text-xs leading-relaxed text-paragraph/55 line-clamp-2">
              {p.excerpt || "Read this article →"}
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-paragraph/40">
              <CalendarIcon className="w-3 h-3" />
              <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function BlogPostView({ post, allPosts }: Props) {
  const heroImage = post.coverImage?.trim() || post.images?.[0]?.trim() || "";

  return (
    <article className="mx-auto w-full max-w-7xl">
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 text-link hover:text-headline cursor-pointer">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to all blogs
          </Button>
        </Link>
      </div>

      {/* Title section — dramatic serif title + horizontal meta bar, aligned to navbar */}
      <header className="mx-auto max-w-7xl space-y-4 sm:space-y-5 mt-6 sm:mt-10 mb-8 sm:mb-14">
        <h1 className="font-serif text-[1.9rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] sm:leading-[0.92] tracking-tight text-balance text-headline">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 border-y border-accent-100/15 py-2.5 sm:py-3 text-[13px] sm:text-sm text-paragraph/60">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </span>
          {post.readingTime > 0 && (
            <>
              <span className="text-paragraph/20">|</span>
              <span className="inline-flex items-center gap-1">
                <IconClock className="w-3 h-3" />
                {post.readingTime} min read
              </span>
            </>
          )}
          {post.excerpt && (
            <>
              <span className="text-paragraph/20 hidden sm:inline">|</span>
              <span className="hidden sm:inline text-paragraph/50 italic">{post.excerpt}</span>
            </>
          )}
        </div>
      </header>

      {/* Hero — same width as the blog body (48rem) */}
      <section className="mx-auto max-w-[48rem] mb-6 sm:mb-10 overflow-hidden rounded-xl">
        <CoverImage src={heroImage} title={post.title} className="rounded-xl" />
      </section>

      {/* Mobile TOC — collapsible, only below xl where sidebar is hidden */}
      <div className="xl:hidden mx-auto w-full max-w-[48rem] mb-6 sm:mb-8">
        <BlogTocMobile key={`mobile-${post.slug}`} />
      </div>

      {/* Readable body (48rem) + TOC pushed to the right edge of the navbar frame */}
      <div className="flex gap-8">
        <div className="hidden xl:block flex-1" aria-hidden="true" />
        <div className="mx-auto xl:mx-0 w-full max-w-[48rem] flex-shrink-0 min-w-0">
          <PostContent code={post.body.code} />
        </div>
        <aside className="hidden xl:block flex-1">
          <div className="sticky top-40 w-52 ml-auto">
            <BlogToc key={post.slug} />
          </div>
        </aside>
      </div>

      {/* Related posts */}
      <div className="mx-auto max-w-3xl mt-10 sm:mt-16 px-0">
        <RelatedPosts posts={allPosts} currentSlug={post.slug} />
      </div>

      <footer className="mt-8 sm:mt-10 flex items-center pb-2 sm:pb-0">
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
