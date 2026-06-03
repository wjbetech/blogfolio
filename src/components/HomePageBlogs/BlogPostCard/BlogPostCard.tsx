"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "../../ui/card";
import type { Post } from "@/app/types/post";
import ArrowRightIcon from "@/components/Icons/ArrowRightIcon";
import { getPostSnippet } from "@/lib/post";

const FALLBACK = "/images/assets/placeholder.png";

export default function BlogPostCard({ post }: { post: Post }) {
  const [imgError, setImgError] = useState(false);
  const snippet = getPostSnippet(post, 120);
  const declared = post.coverImage?.trim() || post.images?.[0]?.trim() || "";
  const imageSrc = declared && !imgError ? declared : FALLBACK;

  return (
    <Link href={`/blog/${post.slug}`} className="block w-80 shrink-0">
      <Card className="h-110">
        <div className="h-48 rounded-md overflow-hidden">
          <Image
            src={imageSrc}
            alt={post.title}
            width={320}
            height={192}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>

        <div className="mt-4 flex-1">
          <h3 className="text-xl text-headline font-semibold line-clamp-2">{post.title}</h3>
          {snippet ? <p className="text-sm text-paragraph mt-2 line-clamp-3">{snippet}</p> : null}
        </div>

        <div className="mt-4">
          <span className="inline-flex items-center gap-1 text-link font-semibold">
            View
            <ArrowRightIcon width={14} height={14} strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
