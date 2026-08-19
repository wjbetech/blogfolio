import { isValidElement, type ReactNode } from "react";

import { getCompiledMdxComponent } from "@/lib/mdx";
import { createHeadingSlug } from "@/lib/postContent";
import HeadingAnchor from "@/components/Blog/HeadingAnchor";

type PostContentProps = {
  code: string;
};

function getTextContent(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (isValidElement<{ children?: ReactNode }>(children)) return getTextContent(children.props.children);
  return "";
}

export default function PostContent({ code }: PostContentProps) {
  const Content = getCompiledMdxComponent(code);
  const headingCounts = new Map<string, number>();

  const createHeading = (level: 2 | 3 | 4) =>
    function PostHeading({ children }: { children?: ReactNode }) {
      const text = getTextContent(children).trim();
      const baseSlug = createHeadingSlug(text);
      const count = (headingCounts.get(baseSlug) ?? 0) + 1;
      headingCounts.set(baseSlug, count);

      return <HeadingAnchor level={level} id={count === 1 ? baseSlug : `${baseSlug}-${count}`} text={text} />;
    };

  return (
    <div
      className="space-y-4 text-base leading-8 text-paragraph sm:text-lg [&_a]:text-link [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-bg-200 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-bg-200 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
    >
      {/* Compiled MDX components are intentionally created from trusted build output. */}
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Content
        components={{
          h1: createHeading(2),
          h2: createHeading(3),
          h3: createHeading(4),
          h4: createHeading(4),
          h5: createHeading(4),
          h6: createHeading(4)
        }}
      />
    </div>
  );
}
