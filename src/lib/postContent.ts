import { isValidElement, type ReactNode } from "react";

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
