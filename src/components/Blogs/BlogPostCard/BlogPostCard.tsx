import Link from "next/link";
import Image from "next/image";
import { Card } from "../../ui/card";
import type { Post } from "@/app/types/post";

export default function BlogPostCard({ post }: { post: Post }) {
  return (
    <Card className="w-90 shrink-0 mr-4 h-110">
      <div className="h-48 rounded-md overflow-hidden bg-accent-100">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            width={320}
            height={192}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-bg-200 to-bg-300" />
        )}
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-xl text-headline font-semibold line-clamp-2">{post.title}</h3>
        {post.excerpt ? <p className="text-sm text-paragraph mt-2 line-clamp-3">{post.excerpt}</p> : null}
      </div>

      <div className="mt-4">
        <Link href={`/posts/${post.slug}`} className="text-link font-semibold hover:underline">
          View
        </Link>
      </div>
    </Card>
  );
}
