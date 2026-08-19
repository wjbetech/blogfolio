import { type ReactNode } from "react";

import { getCompiledMdxComponent } from "@/lib/mdx";
import { createHeadingSlug, getTextContent } from "@/lib/postContent";
import HeadingAnchor, { type HeadingLevel } from "@/components/Blog/HeadingAnchor";

type PostContentProps = {
  code: string;
};

/**
 * Renders a blog post body from Contentlayer's compiled MDX output through a
 * controlled Blogfolio component map. Each supported Markdown/MDX element is
 * mapped to a styled component so posts render consistently and stay
 * authorable as plain Markdown.
 *
 * Supported elements (natively compiled by the Contentlayer pipeline):
 * headings, paragraphs, unordered/ordered lists, links, strong, emphasis,
 * inline and fenced code, blockquotes, thematic breaks (dividers), and images.
 *
 * GFM-only features (tables, task lists, strikethrough) are not produced by
 * the current Contentlayer pipeline and are intentionally not claimed here.
 */
export default function PostContent({ code }: PostContentProps) {
  const Content = getCompiledMdxComponent(code);
  const headingCounts = new Map<string, number>();

  const renderHeading = (level: HeadingLevel) =>
    function ArticleHeading({ children }: { children?: ReactNode }) {
      const text = getTextContent(children).trim();
      const baseSlug = createHeadingSlug(text);
      const count = (headingCounts.get(baseSlug) ?? 0) + 1;
      headingCounts.set(baseSlug, count);

      return (
        <HeadingAnchor level={level} id={count === 1 ? baseSlug : `${baseSlug}-${count}`}>
          {children}
        </HeadingAnchor>
      );
    };

  const components = {
    // Blog bodies treat `#`/`#1` as section headings; the document `<h1>` is
    // reserved for the article title rendered by the page itself.
    h1: renderHeading(2),
    h2: renderHeading(2),
    h3: renderHeading(3),
    h4: renderHeading(4),
    h5: renderHeading(5),
    h6: renderHeading(6),

    p: (props: Record<string, unknown>) => (
      <p className="my-6 leading-8 text-paragraph" {...props} />
    ),

    a: (props: Record<string, unknown>) => (
      <a
        className="text-link underline decoration-accent-100/40 underline-offset-4 transition-colors hover:text-accent-200 hover:decoration-accent-200"
        {...props}
      />
    ),

    strong: (props: Record<string, unknown>) => (
      <strong className="font-semibold text-[1.02em]" {...props} />
    ),

    em: (props: Record<string, unknown>) => <em className="italic" {...props} />,

    ul: (props: Record<string, unknown>) => (
      <ul className="my-6 list-disc space-y-2 pl-6 text-paragraph marker:text-accent-200" {...props} />
    ),

    ol: (props: Record<string, unknown>) => (
      <ol
        className="my-6 list-decimal space-y-2 pl-6 text-paragraph marker:font-semibold marker:text-accent-200"
        {...props}
      />
    ),

    li: (props: Record<string, unknown>) => <li className="leading-relaxed" {...props} />,

    code: (props: Record<string, unknown>) => {
      const block = typeof props.className === "string" && props.className.startsWith("language-");
      return block ? (
        <code className="font-mono text-[0.925em] text-headline" {...props} />
      ) : (
        <code className="rounded-md bg-bg-200 px-[5px] py-0.5 font-mono text-[0.875em] text-headline" {...props} />
      );
    },

    pre: (props: Record<string, unknown>) => (
      <pre
        className="my-6 overflow-x-auto rounded-lg border border-accent-100/10 bg-bg-200 p-4 font-mono text-sm leading-6 [&>code]:bg-transparent [&>code]:px-0 [&>code]:py-0 [&>code]:text-sm"
        {...props}
      />
    ),

    blockquote: (props: Record<string, unknown>) => (
      <blockquote
        className="my-8 border-l-4 border-accent-200/50 pl-5 italic text-paragraph/90"
        {...props}
      />
    ),

    hr: () => (
      <hr
        aria-hidden="true"
        className="my-12 h-px border-0 bg-gradient-to-r from-transparent via-accent-200/40 to-transparent"
      />
    ),

    img: ({ alt = "", ...props }: Record<string, unknown>) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={String(alt)}
        className="my-8 h-auto w-full max-w-full rounded-lg border border-accent-100/10"
        {...props}
      />
    )
  };

  return (
    <div className="mx-auto w-full max-w-3xl text-base text-paragraph">
      {/* Compiled MDX components are intentionally created from trusted build output. */}
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Content components={components} />
    </div>
  );
}
