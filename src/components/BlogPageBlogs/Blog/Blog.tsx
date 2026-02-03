import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/app/types/post";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";

export default function Blog({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden cursor-pointer transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-56 w-full md:h-auto h-40 shrink-0 overflow-hidden bg-secondary/5">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              width={224}
              height={240}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-paragraph">No image</div>
          )}
        </div>

        <div className="flex-1 pl-8 bg-bg-300">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-serif font-extrabold text-headline hover:text-main transition-colors mb-2">
              <Link
                href={`/blog/${post.slug}`}
                className="relative inline-block pb-1 after:absolute after:bottom-px after:left-0 after:right-0 after:h-3 after:bg-accent-100/50 after:origin-left after:transform after:scale-x-100 after:transition-transform after:duration-200 after:-z-10">
                {post.title}
              </Link>
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-headline">
              <CalendarIcon className="w-4 h-4 text-accent-100" />
              <time className="text-accent-100" dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </time>

              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-secondary">
                  <span aria-hidden className="mx-1">
                    ·
                  </span>
                  <div className="flex gap-2 items-center">
                    {post.tags.map((tag, i) => (
                      <span key={tag} className="text-paragraph capitalize tracking-wide">
                        {tag}
                        {i < post.tags.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-0 py-4">
            <p className="text-paragraph line-clamp-3">{post.excerpt}</p>
          </CardContent>

          <CardFooter className="p-0">
            <Link href={`/blog/${post.slug}`} className="group">
              <Button variant="ghost" className="gap-2">
                Read more
                <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
