import React from "react";
import { render, screen } from "@testing-library/react";
import BlogPageClient from "@/app/blog/BlogPageClient";
import type { Post } from "contentlayer/generated";

type MockLinkProps = React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>> & {
  href: string | { pathname?: string };
};

const posts: Post[] = [
  makePost({
    id: "featured",
    title: "Introductions",
    excerpt: "Featured article summary",
    slug: "introductions",
    featured: true,
    publishedAt: "2026-06-10",
    tags: ["Intro", "Tech"]
  }),
  makePost({
    id: "1",
    title: "Post 1",
    excerpt: "Summary for post 1",
    slug: "post-1",
    publishedAt: "2026-06-09",
    tags: ["Tech"]
  }),
  makePost({
    id: "2",
    title: "Post 2",
    excerpt: "Summary for post 2",
    slug: "post-2",
    publishedAt: "2026-06-08",
    tags: ["Life"]
  }),
  makePost({
    id: "3",
    title: "Post 3",
    excerpt: "Summary for post 3",
    slug: "post-3",
    publishedAt: "2026-06-07",
    tags: ["Work"]
  }),
  makePost({
    id: "4",
    title: "Post 4",
    excerpt: "Summary for post 4",
    slug: "post-4",
    publishedAt: "2026-06-06",
    tags: ["Tech"]
  }),
  makePost({
    id: "5",
    title: "Post 5",
    excerpt: "Summary for post 5",
    slug: "post-5",
    publishedAt: "2026-06-05",
    tags: ["Life"]
  }),
  makePost({
    id: "6",
    title: "Post 6",
    excerpt: "Summary for post 6",
    slug: "post-6",
    publishedAt: "2026-06-04",
    tags: ["Work"]
  })
];

jest.mock("next/link", () => {
  function MockNextLink({ href, children, ...props }: MockLinkProps) {
    const resolvedHref = typeof href === "string" ? href : (href.pathname ?? "#");

    return (
      <a href={resolvedHref} {...props}>
        {children}
      </a>
    );
  }

  MockNextLink.displayName = "MockNextLink";
  return MockNextLink;
});

function makePost(overrides: Partial<Post>): Post {
  return {
    id: overrides.id ?? "post-id",
    title: overrides.title ?? "Post Title",
    excerpt: overrides.excerpt ?? "Post excerpt",
    author: overrides.author ?? "William East",
    tags: overrides.tags ?? ["tech"],
    image: overrides.image ?? "",
    coverImage: overrides.coverImage ?? "",
    publishedAt: overrides.publishedAt ?? "2026-01-04",
    updatedAt: overrides.updatedAt ?? "2026-01-04",
    status: overrides.status ?? "published",
    slug: overrides.slug ?? "post-title",
    body:
      overrides.body ??
      ({
        raw: overrides.excerpt ?? "Post excerpt",
        code: ""
      } as Post["body"])
  } as Post;
}

describe("BlogPageClient", () => {
  it("renders the single featured post and four regular posts on page 1", () => {
    render(<BlogPageClient posts={posts} currentPage={1} />);

    // expect the featured post
    expect(screen.getByRole("heading", { name: "Introductions" })).toBeInTheDocument();

    // expect the four normal posts
    expect(screen.getByText("Summary for post 1")).toBeInTheDocument();
    expect(screen.getByText("Summary for post 2")).toBeInTheDocument();
    expect(screen.getByText("Summary for post 3")).toBeInTheDocument();
    expect(screen.getByText("Summary for post 4")).toBeInTheDocument();

    // expect no fifth or sixth post
    expect(screen.queryByText("Summary for post 5")).not.toBeInTheDocument();
    expect(screen.queryByText("Summary for post 6")).not.toBeInTheDocument();
  });
});
