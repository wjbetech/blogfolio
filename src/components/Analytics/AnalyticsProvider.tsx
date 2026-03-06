"use client";

import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { ANALYTICS_ENABLED, PLAUSIBLE_DOMAIN, PLAUSIBLE_SCRIPT_SRC, trackPageView } from "@/lib/analytics";

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  const search = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.search ?? "";
  }, [pathname]);

  useEffect(() => {
    if (!ANALYTICS_ENABLED || !isReady || !pathname) return;

    trackPageView(pathname, search);
  }, [isReady, pathname, search]);

  if (!ANALYTICS_ENABLED) return null;

  return (
    <Script
      defer
      data-domain={PLAUSIBLE_DOMAIN}
      src={PLAUSIBLE_SCRIPT_SRC}
      strategy="afterInteractive"
      onLoad={() => setIsReady(true)}
    />
  );
}