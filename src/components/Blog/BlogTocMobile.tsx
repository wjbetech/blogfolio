"use client";

import { useState, useEffect } from "react";

/**
 * Mobile/tablet table of contents — collapsible, visible below xl.
 * Reuses the same heading extraction as BlogToc but renders as <details>.
 * Hidden on xl+ (where the sticky sidebar takes over) and when <2 headings.
 */
export default function BlogTocMobile() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    let els: HTMLElement[] = [];
    let ticking = false;
    let rafId = 0;
    let observer: MutationObserver | null = null;

    const updateActive = () => {
      if (els.length === 0) {
        ticking = false;
        return;
      }
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (nearBottom) {
        setActiveId(els[els.length - 1].id);
        ticking = false;
        return;
      }
      let current = "";
      for (let i = els.length - 1; i >= 0; i--) {
        const rect = els[i].getBoundingClientRect();
        if (rect.top <= 120) {
          current = els[i].id;
          break;
        }
      }
      if (!current && els.length > 0) {
        const firstTop = els[0].getBoundingClientRect().top;
        if (firstTop > 120 && window.scrollY < 200) current = els[0].id;
      }
      if (!current && window.location.hash) {
        const hashId = window.location.hash.slice(1);
        if (els.some((e) => e.id === hashId)) current = hashId;
      }
      if (current) setActiveId(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(updateActive);
      }
    };

    const init = () => {
      const article = document.querySelector(".article-body");
      if (!article) {
        rafId = requestAnimationFrame(init);
        return;
      }
      els = Array.from(article.querySelectorAll("h2, h3")) as HTMLElement[];
      const items = els.map((el) => ({
        id: el.id,
        text: el.textContent?.replace(/^#/, "").trim() ?? "",
        level: el.tagName === "H2" ? 2 : 3,
      }));
      const valid = items.filter((h) => h.id);
      setHeadings(valid);
      if (els.length > 0) setActiveId(els[0].id);

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      requestAnimationFrame(updateActive);

      observer = new MutationObserver(() => {
        const next = Array.from(article.querySelectorAll("h2, h3")) as HTMLElement[];
        if (next.length !== els.length) {
          els = next;
          const nextItems = els.map((el) => ({
            id: el.id,
            text: el.textContent?.replace(/^#/, "").trim() ?? "",
            level: el.tagName === "H2" ? 2 : 3,
          }));
          setHeadings(nextItems.filter((h) => h.id));
          requestAnimationFrame(updateActive);
        }
      });
      observer.observe(article, { childList: true, subtree: true });
    };

    rafId = requestAnimationFrame(init);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer?.disconnect();
    };
  }, []);

  if (headings.length < 2) return null;

  return (
    <details className="group rounded-xl border border-accent-100/15 bg-bg-200/40 open:bg-bg-200/60 transition-colors">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-headline [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-paragraph/40">Sections</span>
          <span className="rounded-full bg-accent-100/15 px-1.5 py-0.5 text-[11px] text-paragraph/60">{headings.length}</span>
        </span>
        <span className="text-paragraph/40 transition-transform group-open:rotate-180" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </summary>
      <nav aria-label="Table of contents" className="border-t border-accent-100/10 px-4 py-3">
        <ul className="space-y-1.5">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block py-1 text-[13px] leading-snug transition-colors hover:text-headline ${h.level === 3 ? "pl-4" : ""} ${activeId === h.id ? "text-accent-200 font-medium" : "text-paragraph/70"}`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
