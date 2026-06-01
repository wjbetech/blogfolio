import React from "react";

type HeadingAnchorProps = {
  level: 2 | 3 | 4;
  id: string;
  text: string;
};

const headingClasses = {
  2: "text-2xl font-semibold font-serif text-headline scroll-mt-24",
  3: "text-xl font-semibold text-headline scroll-mt-24",
  4: "text-base font-semibold text-headline scroll-mt-24"
};

const wrapperClasses = {
  2: "group relative mt-10 flex items-start gap-2",
  3: "group relative mt-8 flex items-start gap-2",
  4: "group relative mt-6 flex items-start gap-2"
};

export default function HeadingAnchor({ level, id, text }: HeadingAnchorProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  return (
    <div className={wrapperClasses[level]}>
      <Tag id={id} className={headingClasses[level]}>
        {text}
      </Tag>
      <a
        href={`#${id}`}
        aria-label={`Link to section: ${text}`}
        className="inline-flex items-center rounded-sm px-1 text-link opacity-0 transition-opacity group-hover:opacity-100 hover:text-headline focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-100">
        <span aria-hidden="true">§</span>
      </a>
    </div>
  );
}
