import React, { type ReactNode } from "react";
import { getTextContent } from "@/lib/postContent";

export type HeadingLevel = 2 | 3 | 4 | 5 | 6;

const levelStyles: Record<HeadingLevel, { heading: string; wrapper: string }> = {
  2: {
    heading: "text-2xl font-semibold font-serif text-headline scroll-mt-24",
    wrapper: "group relative mt-12 mb-4 flex items-start gap-2"
  },
  3: {
    heading: "text-xl font-semibold font-serif text-headline scroll-mt-24",
    wrapper: "group relative mt-9 mb-3 flex items-start gap-2"
  },
  4: {
    heading: "text-lg font-semibold font-serif text-headline scroll-mt-24",
    wrapper: "group relative mt-7 mb-2 flex items-start gap-2"
  },
  5: {
    heading: "text-base font-semibold text-headline scroll-mt-24",
    wrapper: "group relative mt-6 mb-2 flex items-start gap-2"
  },
  6: {
    heading: "text-sm font-semibold uppercase tracking-wide text-paragraph scroll-mt-24",
    wrapper: "group relative mt-6 mb-2 flex items-start gap-2"
  }
};

type HeadingAnchorProps = {
  level: HeadingLevel;
  id: string;
  children: ReactNode;
};

export default function HeadingAnchor({ level, id, children }: HeadingAnchorProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const { heading, wrapper } = levelStyles[level];
  const label = getTextContent(children).trim() || "Section";

  return (
    <div className={wrapper}>
      <Tag id={id} className={heading}>
        {children}
      </Tag>
      <a
        href={`#${id}`}
        aria-label={`Link to section: ${label}`}
        className="inline-flex items-center rounded-sm px-1 text-link opacity-0 transition-opacity group-hover:opacity-100 hover:text-accent-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-100">
        <span aria-hidden="true">§</span>
      </a>
    </div>
  );
}
