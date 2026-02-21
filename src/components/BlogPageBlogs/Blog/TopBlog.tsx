import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/app/types/post";

export default function TopBlog({ post }: { post: Post }) {
  return (
    <article className="relative w-full rounded-lg overflow-hidden shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block">
        {post.image ? (
          <Image src={post.image} alt={post.title} width={1200} height={560} className="w-full h-80 object-cover" />
        ) : (
          <div className="w-full h-80 bg-secondary/5" />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-accent-100/10 via-accent-200/10 to-accent-300/10" />
      </Link>

      <div className="absolute left-6 bottom-6 right-6 text-white">
        <div className="text-sm opacity-90 mb-2">{post.tags?.[0] ?? ""}</div>
        <h2 className="text-3xl font-serif font-extrabold leading-tight">
          <Link
            href={`/blog/${post.slug}`}
            className="relative font-serif inline-block pb-1 after:absolute after:bottom-px after:left-0 after:right-0 after:h-3 after:bg-accent-100/50 after:origin-left after:transform after:scale-x-100 after:transition-transform after:duration-200">
            {post.title}
          </Link>
        </h2>
        <div className="flex items-center gap-3 text-sm opacity-90">
          <time className="text-xs mt-4">{new Date(post.publishedAt).toLocaleDateString()}</time>
        </div>
      </div>
    </article>
  );
}
