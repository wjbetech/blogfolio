"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "../../ui/card";
import type { BlogCardData } from "@/lib/homeCards";
import ArrowRightIcon from "@/components/Icons/ArrowRightIcon";

const FALLBACK = "/images/assets/placeholder.png";

export default function BlogPostCard({ card }: { card: BlogCardData }) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = card.image && !imgError ? card.image : FALLBACK;

  return (
    <Link href={`/blog/${card.slug}`} className="block w-80 shrink-0">
      <Card className="h-110">
        <div className="h-48 rounded-md overflow-hidden">
          <Image
            src={imageSrc}
            alt={card.title}
            width={320}
            height={192}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>

        <div className="mt-4 flex-1">
          <h3 className="text-xl text-headline font-semibold line-clamp-2">{card.title}</h3>
          {card.snippet ? <p className="text-sm text-paragraph mt-2 line-clamp-3">{card.snippet}</p> : null}
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
