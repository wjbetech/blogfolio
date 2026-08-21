"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { ANALYTICS_ENABLED, PLAUSIBLE_DOMAIN, PLAUSIBLE_SCRIPT_SRC, trackPageView } from "@/lib/analytics";

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!ANALYTICS_ENABLED || !isReady || !pathname) return;

    const search = typeof window === "undefined" ? "" : (window.location.search ?? "");
    trackPageView(pathname, search);
  }, [isReady, pathname]);

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