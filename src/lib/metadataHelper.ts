import { SITE_URL } from "@/lib/metadata";

// cleanly handle a single URL
export function toAbsoluteStructuredDataUrl(value?: string | null) {
  const cleaned = value?.trim();

  if (!cleaned) return undefined;

  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) return cleaned;

  const normalized = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  return `${SITE_URL}${normalized}`;
}

// handle the image arrays
export function toAbsoluteStructuredDataUrls(values?: Array<string | null | undefined>) {
  return (values ?? [])
    .map((value) => toAbsoluteStructuredDataUrl(value))
    .filter((value): value is string => Boolean(value));
}

// give the exact string to drop into dangerouslySetInnerHTML
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
