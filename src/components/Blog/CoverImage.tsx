import Image from "next/image";
import React from "react";

type Props = {
  src?: string;
  title: string;
  className?: string;
};

export default function CoverImage({ src, title, className = "" }: Props) {
  // Simple presentational fallback for missing images
  if (!src) {
    return (
      <div className={`flex aspect-video w-full items-center justify-center bg-bg-200 text-paragraph/70 ${className}`}>
        <div className="text-center">
          <svg width="84" height="56" viewBox="0 0 84 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3 opacity-80">
            <rect width="84" height="56" rx="4" fill="#E6EEF0" />
            <path d="M8 36L24 20L40 36L56 20L76 40" stroke="#C7D7D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="text-sm">No cover image available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-video w-full ${className}`}>
      <Image src={src} alt={title} fill className="object-cover" sizes="(min-width:1024px) 1024px, 100vw" />
    </div>
  );
}
