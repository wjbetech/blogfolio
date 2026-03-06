import { SITE_URL } from "@/lib/metadata";

export const ANALYTICS_PROVIDER = "plausible";
export const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "";
export const PLAUSIBLE_SCRIPT_SRC = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC ?? "https://plausible.io/js/script.manual.js";
export const ANALYTICS_ENABLED = PLAUSIBLE_DOMAIN.length > 0;

export type AnalyticsValue = string | number | boolean;
export type AnalyticsProps = Record<string, AnalyticsValue>;
export type AnalyticsEventName = "Contact Click" | "Project CTA Click";

export const buildAnalyticsPath = (pathname: string, search = "") => `${SITE_URL}${pathname}${search}`;

export const trackPageView = (pathname: string, search = "") => {
  if (typeof window === "undefined" || typeof window.plausible !== "function") return;

  window.plausible("pageview", {
    u: buildAnalyticsPath(pathname, search)
  });
};

export const trackAnalyticsEvent = (eventName: AnalyticsEventName, props?: AnalyticsProps) => {
  if (typeof window === "undefined" || typeof window.plausible !== "function") return;

  window.plausible(eventName, props ? { props } : undefined);
};