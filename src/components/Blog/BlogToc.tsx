"use client";

import { useState, useEffect } from "react";

/**
 * Scrolling table of contents for a blog article.
 *
 * Reads headings (h2/h3) from the rendered `.article-body` and highlights the
 * active section on scroll. Remount per post via `key={post.slug}` so state
 * resets on client navigation. Caller is responsible for
 * positioning (fixed/sticky wrapper). Returns null when there are < 2 headings.
 */
export default function BlogToc() {
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
      // If we're at the very bottom, force last heading active (covers short final section)
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
      // Also respect hash if user clicked a TOC link
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
        // Retry next frame if article not yet mounted (client nav race)
        rafId = requestAnimationFrame(init);
        return;
      }
      els = Array.from(article.querySelectorAll("h2, h3")) as HTMLElement[];
      const items = els.map((el) => ({
        id: el.id,
        text: el.textContent?.replace(/^#/, "").trim() ?? "",
        level: el.tagName === "H2" ? 2 : 3,
      }));
      // Filter empties (HeadingAnchor always sets id via createHeadingSlug)
      const valid = items.filter((h) => h.id);
      setHeadings(valid);
      if (els.length > 0) setActiveId(els[0].id);

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      requestAnimationFrame(updateActive);

      // If MDX hydrates slightly after effect, catch late h2/h3
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
    <nav aria-label="Table of contents">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-paragraph/40">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-accent-100/15 pl-3">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block text-[13px] leading-snug transition-colors hover:text-headline ${
                h.level === 3 ? "pl-3" : ""
              } ${activeId === h.id ? "text-accent-200 font-medium" : "text-paragraph/55"}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
