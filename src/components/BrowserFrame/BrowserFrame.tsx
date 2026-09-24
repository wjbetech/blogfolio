"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

const directoryFor = (pathname: string) => {
  if (pathname === "/") return "blogfolio/home";
  if (pathname === "/font-playground") return "blogfolio/type-study";
  if (pathname === "/contact") return "blogfolio/contact";
  if (pathname === "/language-services" || pathname.startsWith("/language-services/")) return "blogfolio/language";
  if (pathname === "/dev" || pathname.startsWith("/dev/")) return `blogfolio${pathname}`;
  if (pathname === "/blog" || pathname.startsWith("/blog/")) return `blogfolio${pathname}`;
  return `blogfolio${pathname}`;
};

export default function BrowserFrame({ children, origin }: { children: ReactNode; origin: string }) {
  const pathname = usePathname() ?? "/";
  const directory = directoryFor(pathname);
  const address = `${origin}${pathname}`;

  return (
    <div className="flex min-h-screen w-full flex-1 flex-col bg-bg-100">
      <div className="grid min-h-14 grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-palette-border/50 bg-bg-200/45 px-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden="true" className="flex shrink-0 gap-1.5">
            <i className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <i className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <i className="h-3 w-3 rounded-full bg-[#28c840]" />
          </span>
          <span className="truncate text-xs font-semibold tracking-tight text-headline sm:text-sm">@wjbetech</span>
        </div>
        <span title={address} className="max-w-full justify-self-center truncate font-mono text-xs font-medium text-paragraph/80 sm:text-sm">{address}</span>
        <span className="max-w-full justify-self-end truncate font-mono text-xs text-paragraph/80 sm:text-sm">{directory}</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}