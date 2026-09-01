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
    <Link
      href={`/blog/${card.slug}`}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      className="block w-80 shrink-0 group cursor-grab active:cursor-grabbing select-none"
    >
      <Card className="h-110 border border-accent-100/10 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent-200/25 active:shadow-md active:translate-y-0">
        <div className="h-48 rounded-md overflow-hidden bg-bg-200">
          <Image
            src={imageSrc}
            alt={card.title}
            width={320}
            height={192}
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] select-none"
            onError={() => setImgError(true)}
          />
        </div>

        <div className="mt-4 flex-1">
          <h3 className="text-xl text-headline font-semibold line-clamp-2 transition-colors duration-200 group-hover:text-accent-200">
            {card.title}
          </h3>
          {card.snippet ? <p className="text-sm text-paragraph mt-2 line-clamp-3">{card.snippet}</p> : null}
        </div>

        <div className="mt-4">
          <span className="inline-flex items-center gap-1.5 text-link font-semibold transition-colors duration-200 group-hover:text-accent-200">
            View
            <ArrowRightIcon
              width={14}
              height={14}
              strokeWidth={2.5}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Card>
    </Link>
  );
}
