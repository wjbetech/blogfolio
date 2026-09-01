"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "../../ui/card";
import type { BlogCardData } from "@/lib/homeCards";
import ArrowRightIcon from "@/components/Icons/ArrowRightIcon";
import { formatShortDate } from "@/lib/date";

const FALLBACK = "/images/assets/placeholder.png";

export default function BlogPostCard({ card, priority = false }: { card: BlogCardData; priority?: boolean }) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = card.image && !imgError ? card.image : FALLBACK;

  return (
    <Link
      href={`/blog/${card.slug}`}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      className="block w-80 shrink-0 group cursor-grab active:cursor-grabbing select-none"
    >
      <Card className="h-110 p-0 gap-0 overflow-hidden bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 active:shadow-sm active:translate-y-0">
        <div className="h-56 w-full overflow-hidden bg-bg-200 shrink-0">
          <Image
            src={imageSrc}
            alt={card.title}
            width={320}
            height={224}
            sizes="(max-width: 640px) 80vw, 320px"
            priority={priority}
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] select-none"
            onError={() => setImgError(true)}
          />
        </div>
        <div className="p-6 flex flex-col flex-1 min-h-0">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-paragraph/45 mb-3">
            <time dateTime={card.publishedAt} className="tabular-nums">
              {formatShortDate(card.publishedAt)}
            </time>
            <span className="text-paragraph/20">·</span>
            <span>{card.readingTime} min</span>
          </div>
          <h3 className="font-serif text-[1.35rem] leading-tight font-semibold text-headline line-clamp-2 transition-colors duration-200 group-hover:text-accent-200">
            {card.title}
          </h3>
          {card.snippet ? <p className="text-[13px] leading-relaxed text-paragraph/70 mt-3 line-clamp-2">{card.snippet}</p> : null}
          <div className="mt-auto pt-5 flex items-center gap-2 text-link font-semibold text-sm">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-accent-200 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-300">
              Read
            </span>
            <ArrowRightIcon
              width={14}
              height={14}
              strokeWidth={2.5}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
