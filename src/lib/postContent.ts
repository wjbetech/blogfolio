import { isValidElement, type ReactNode } from "react";

export type ParsedPostBlock =
  | { kind: "heading"; level: number; text: string; id: string }
  | { kind: "paragraph"; text: string };

export function createHeadingSlug(text: string) {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "section"
  );
}

export function parsePostContent(raw: string): ParsedPostBlock[] {
  const headingCounts = new Map<string, number>();

  return raw
    .replace(/\r\n/g, "\n")
    .trim()
    .split(/\n{2,}/)
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const headingMatch = segment.match(/^(#{1,6})\s+(.*)$/);

      if (!headingMatch) {
        return { kind: "paragraph", text: segment };
      }

      const [, hashes, text] = headingMatch;
      const cleanedText = text.trim();
      const level = Math.min(hashes.length + 1, 6);

      const baseSlug = createHeadingSlug(cleanedText);
      const seenCount = (headingCounts.get(baseSlug) ?? 0) + 1;
      headingCounts.set(baseSlug, seenCount);

      const id = seenCount === 1 ? baseSlug : `${baseSlug}-${seenCount}`;

      return {
        kind: "heading",
        level,
        text: cleanedText,
        id
      };
    });
}

/**
 * Extracts the plain text from a React tree (e.g. heading children that may
 * contain inline elements such as `<code>` or `<em>`). Used to derive stable
 * heading slugs and anchor labels from compiled Markdown/MDX output.
 */
export function getTextContent(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (isValidElement<{ children?: ReactNode }>(children)) return getTextContent(children.props.children);
  return "";
}
