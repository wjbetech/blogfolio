import { notFound } from "next/navigation";
import Link from "next/link";
import CoverImage from "@/components/Blog/CoverImage";
import { allPosts } from "contentlayer/generated";
import { Button } from "@/components/ui/button";
import ArrowLeftIcon from "@/components/Icons/ArrowLeftIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug
  }));
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

  const heroImage = post.coverImage || post.image || "";
  const bodyContent = post.content?.trim() || post.body.raw?.trim() || "";
  const contentBlocks = bodyContent
    .split("\n\n")
    .map((block) => block.trim())
    .filter((block) => block.length > 0);

  return (
    <article className="mx-auto w-full max-w-7xl">
      <div className="mb-6">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 text-link hover:text-headline">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Blog
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

      <section className="mb-8 sm:mb-10 overflow-hidden rounded-xl">
        {/* Componentized cover image with robust fallback */}
        <CoverImage src={heroImage} title={post.title} className="rounded-xl" />
      </section>

      <section className="rounded-xl">
        <div className="space-y-4 text-base leading-8 text-paragraph sm:text-lg">
          {contentBlocks.map((paragraph, idx) => (
            <p key={`${post.id}-${idx}`} className="whitespace-pre-wrap">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <footer className="mt-8 sm:mt-10 flex items-center">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 bg-bg-100 text-link hover:text-headline">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to all posts
          </Button>
        </Link>
      </footer>
    </article>
  );
}
