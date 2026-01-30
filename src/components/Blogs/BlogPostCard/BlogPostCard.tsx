import Link from "next/link";
import Image from "next/image";
import { Card } from "../../ui/card";
import type { Post } from "@/app/types/post";

export default function BlogPostCard({ post }: { post: Post }) {
  return (
    <Card className="w-44 shrink-0 mr-4">
      <div className="h-60 rounded-md overflow-hidden bg-slate-100">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            width={180}
            height={240}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300"></div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
        {post.excerpt ? <p>{post.excerpt}</p> : null}
      </div>

      <div className="mt-4">
        <Link href={`/posts/${post.slug}`} className="text-md text-sky-600 hover:underline">
          View
        </Link>
      </div>
    </Card>
  );
}
