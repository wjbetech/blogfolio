import Link from "next/link";
import type { Post } from "@/app/types/post";

export default function Blog({ post }: { post: Post }) {
  const date = new Date(post.publishedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-accent-100 border border-accent-300 p-6 h-full flex flex-col justify-between hover:border-transparent hover:outline hover:outline-accent-100 hover:scale-[1.03] hover:z-10 transition-all cursor-pointer group relative">
        <div className="space-y-4">
          {/* Category tag */}
          <div className="text-accent-100 text-sm font-serif uppercase tracking-wide">
            {post.tags?.[0] ?? "Article"}
          </div>

          {/* Date */}
          <time className="text-paragraph text-sm" dateTime={post.publishedAt}>
            {formattedDate}
          </time>

          {/* Title */}
          <h3 className="text-xl font-semibold text-headline leading-snug group-hover:text-main transition-colors">
            {post.title}
          </h3>
        </div>
      </article>
    </Link>
  );
}
