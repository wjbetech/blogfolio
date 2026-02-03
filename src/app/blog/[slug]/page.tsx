import { notFound } from "next/navigation";
import Link from "next/link";
import { mockPosts } from "@/app/data/posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ArrowLeftIcon from "@/components/Icons/ArrowLeftIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import UserIcon from "@/components/Icons/UserIcon";

export async function generateStaticParams() {
  return mockPosts.map((post) => ({
    slug: post.slug
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = mockPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Blog
          </Button>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-paragraph">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>

            <CardTitle className="text-4xl text-headline">{post.title}</CardTitle>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </CardHeader>

          <CardContent className="prose prose-lg max-w-none">
            <div className="text-paragraph leading-relaxed whitespace-pre-wrap">{post.content}</div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-between items-center">
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              <ArrowLeftIcon className="w-4 h-4" />
              Back to all posts
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
