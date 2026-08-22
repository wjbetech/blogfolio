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
 * strikethrough, inline and fenced code, blockquotes, thematic breaks
 * (dividers), images, and GFM tables and task lists (via remark-gfm).
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
      <p className="my-6 leading-8 text-pretty text-paragraph" {...props} />
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

    del: (props: Record<string, unknown>) => (
      <del className="text-paragraph/60 line-through decoration-accent-200/60" {...props} />
    ),

    table: (props: Record<string, unknown>) => (
      <div className="my-8 overflow-x-auto rounded-xl border border-accent-100/15">
        <table className="w-full border-collapse text-left text-sm" {...props} />
      </div>
    ),

    thead: (props: Record<string, unknown>) => (
      <thead className="bg-bg-200/70 text-headline" {...props} />
    ),

    th: (props: Record<string, unknown>) => (
      <th
        className="border-b border-accent-100/20 px-4 py-3 text-xs font-semibold uppercase tracking-wider"
        {...props}
      />
    ),

    td: (props: Record<string, unknown>) => (
      <td className="border-b border-accent-100/10 px-4 py-3 align-top leading-relaxed" {...props} />
    ),

    input: (props: Record<string, unknown>) => {
      const { type, ...rest } = props;
      const inputType = typeof type === "string" ? type : "text";

      if (inputType !== "checkbox") {
        return <input type={inputType} {...rest} />;
      }

      // GFM task-list checkboxes are display-only in articles
      return (
        <input
          type="checkbox"
          readOnly
          className="mr-2 h-4 w-4 translate-y-0.5 cursor-default accent-[color:var(--accent-200)]"
          {...rest}
        />
      );
    },

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
        <code className="font-mono text-[0.925em]" {...props} />
      ) : (
        <code className="rounded-md bg-bg-200 px-[5px] py-0.5 font-mono text-[0.875em] text-headline" {...props} />
      );
    },

    pre: (props: Record<string, unknown>) => (
      <div className="my-8 overflow-hidden rounded-xl border border-[#e5e7eb]/70 bg-[#f6f8fa]/85">
        <div className="flex items-center justify-between border-b border-[#e5e7eb]/70 bg-[#eef2f7]/70 px-4 py-2 text-xs text-[#57606a]">
          <span className="font-mono lowercase tracking-wide">code</span>
          <span className="h-2 w-2 rounded-full bg-accent-200/60" aria-hidden="true" />
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-sm leading-6 text-[#24292e] [&>code]:bg-transparent [&>code]:px-0 [&>code]:py-0 [&>code]:text-sm" {...props} />
      </div>
    ),

    blockquote: (props: Record<string, unknown>) => (
      <blockquote
        className="my-10 border-l-4 border-accent-200 bg-accent-100/8 pl-6 pr-4 py-5 rounded-r-lg italic leading-relaxed text-paragraph/90"
        {...props}
      />
    ),

    hr: () => (
      <div aria-hidden="true" className="my-12 flex items-center justify-center gap-3 text-accent-200/50">
        <span className="h-px w-8 bg-accent-200/25" />
        <span className="text-sm tracking-[0.35em]">* * *</span>
        <span className="h-px w-8 bg-accent-200/25" />
      </div>
    ),

    img: ({ alt = "", ...props }: Record<string, unknown>) => {
      const caption = String(alt).trim();
      const showCaption = caption.length > 0 && caption !== "";
      return (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={caption}
            className="h-auto w-full max-w-full rounded-lg border border-accent-100/10 object-cover"
            {...props}
          />
          {showCaption && <figcaption className="mt-3 text-center text-sm italic leading-relaxed text-paragraph/60">{caption}</figcaption>}
        </figure>
      );
    }
  };

  return (
    <div className="article-body mx-auto w-full max-w-3xl text-base text-paragraph">
      {/* Compiled MDX components are intentionally created from trusted build output. */}
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Content components={components} />
    </div>
  );
}
