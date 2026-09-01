"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "../../ui/card";
import type { BlogCardData } from "@/lib/homeCards";
import ArrowRightIcon from "@/components/Icons/ArrowRightIcon";
import { formatShortDate } from "@/lib/date";

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
      <Card className="h-110 p-6 gap-0 bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 active:shadow-sm active:translate-y-0">
        <div className="h-48 rounded-lg overflow-hidden bg-bg-200 shrink-0">
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

        <div className="mt-4 flex-1 min-h-0">
          <div className="flex items-center gap-2 text-[11px] tracking-wide text-paragraph/55 mb-2.5">
            <time dateTime={card.publishedAt} className="tabular-nums">
              {formatShortDate(card.publishedAt)}
            </time>
            <span className="text-paragraph/20">·</span>
            <span>{card.readingTime} min</span>
            {card.tags[0] ? (
              <>
                <span className="text-paragraph/20">·</span>
                <span className="truncate max-w-[7rem]">{card.tags[0]}</span>
              </>
            ) : null}
          </div>
          <h3 className="text-[1.15rem] leading-snug text-headline font-semibold line-clamp-2 transition-colors duration-200 group-hover:text-accent-200">
            {card.title}
          </h3>
          {card.snippet ? <p className="text-[13px] leading-relaxed text-paragraph/75 mt-2.5 line-clamp-3">{card.snippet}</p> : null}
        </div>

        <div className="mt-4 pt-3 border-t border-accent-100/10">
          <span className="inline-flex items-center gap-1.5 text-[13px] text-link font-semibold transition-colors duration-200 group-hover:text-accent-200">
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
