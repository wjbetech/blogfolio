import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/app/types/post";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ArrowUpRightIcon from "@/components/Icons/ArrowUpRightIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";

export default function Blog({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden cursor-pointer transition-shadow p-0 gap-0 h-105 min-h-105 max-h-105">
      {/* Image */}
      {post.image ? (
        <Image
          src={post.image}
          alt={post.title}
          width={600}
          height={320}
          className="w-full h-48 object-cover block rounded-t-xl"
        />
      ) : (
        <div className="w-full h-48 bg-secondary/5 rounded-t-xl" />
      )}

      {/* Content panel with bg-bg-200 */}
      <div className="bg-bg-200 p-4 rounded-b-lg flex flex-col flex-1 overflow-hidden">
        <CardHeader className="p-0 rounded-t-none">
          <div className="text-sm text-accent-100 mb-2">{post.tags?.[0] ?? ""}</div>
          <CardTitle className="text-xl font-serif font-extrabold text-headline hover:text-main transition-colors mb-2">
            <Link
              href={`/blog/${post.slug}`}
              className="relative inline-block pb-1 after:absolute after:bottom-px after:left-0 after:right-0 after:h-3 after:bg-accent-100/50 after:origin-left after:transform after:scale-x-100 after:transition-transform after:duration-200 line-clamp-2">
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 py-4 flex-1">
          <p className="text-paragraph line-clamp-3">{post.excerpt}</p>
        </CardContent>

        <CardFooter className="bg-transparent p-0 mt-0 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-paragraph">
            <CalendarIcon className="w-4 h-4 text-accent-100" />
            <time className="text-accent-100" dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })}
            </time>
          </div>

          <Link href={`/blog/${post.slug}`} className="group" aria-label={`Read more about ${post.title}`}>
            <Button
              variant="ghost"
              className="p-2 bg-accent-100 hover:bg-accent-100/80 text-headline rounded-full cursor-pointer">
              <ArrowUpRightIcon className="w-4 h-4" />
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
