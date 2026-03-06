"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { trackAnalyticsEvent, type AnalyticsEventName, type AnalyticsProps } from "@/lib/analytics";

interface TrackedLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  eventName?: AnalyticsEventName;
  eventProps?: AnalyticsProps;
}

const isInternalRoute = (href: string) => href.startsWith("/") || href.startsWith("#");

export default function TrackedLink({
  href,
  children,
  eventName,
  eventProps,
  onClick,
  ...rest
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (!event.defaultPrevented && eventName) {
      trackAnalyticsEvent(eventName, eventProps);
    }
  };

  if (isInternalRoute(href) && !href.startsWith("#")) {
    return (
      <Link href={href} onClick={handleClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}