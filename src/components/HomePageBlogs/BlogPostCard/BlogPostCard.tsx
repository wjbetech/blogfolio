import Link from "next/link";
import Image from "next/image";
import { Card } from "../../ui/card";
import type { Post } from "@/app/types/post";
import { getPostSnippet } from "@/lib/post";

export default function BlogPostCard({ post }: { post: Post }) {
  const snippet = getPostSnippet(post, 120);
  const primaryImage =
    post.coverImage?.trim() ||
    post.images?.[0]?.trim() ||
    "https://openlab.citytech.cuny.edu/chenry-eportfolio/wp-content/themes/koji/assets/images/default-fallback-image.png";
  
  return (
    <Card className="w-92 shrink-0 h-110">
      <div className="h-48 rounded-md overflow-hidden">
        {primaryImage ? (
          <Image src={primaryImage} alt={post.title} width={320} height={192} className="w-full h-full object-cover" />
        ) : (
          ""
        )}
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-xl text-headline font-semibold line-clamp-2">{post.title}</h3>
        {snippet ? <p className="text-sm text-paragraph mt-2 line-clamp-3">{snippet}</p> : null}
      </div>

      <div className="mt-4">
        <Link href={`/blog/${post.slug}`} className="text-link font-semibold hover:underline">
          View
        </Link>
      </div>
    </Card>
  );
}
