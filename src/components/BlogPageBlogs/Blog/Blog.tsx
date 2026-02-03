import Link from "next/link";
import type { Post } from "@/app/types/post";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";

export default function Blog({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden cursor-pointer transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-paragraph mb-2">
          <CalendarIcon className="w-4 h-4" />
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </time>
        </div>
        <CardTitle className="text-2xl text-headline hover:text-main transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <CardDescription className="text-paragraph">By {post.author}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-paragraph line-clamp-3">{post.excerpt}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-4 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/blog/${post.slug}`} className="group">
          <Button variant="ghost" className="gap-2">
            Read more
            <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
