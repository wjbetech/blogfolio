"use client";

import { useState, useEffect } from "react";

/**
 * Scrolling table of contents for a blog article.
 *
 * Reads headings (h2/h3) from the rendered `.article-body` and highlights the
 * active section on scroll via IntersectionObserver. Caller is responsible for
 * positioning (fixed/sticky wrapper). Returns null when there are < 2 headings.
 */
export default function BlogToc() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const article = document.querySelector(".article-body");
    if (!article) return;

    const els = Array.from(article.querySelectorAll("h2, h3")) as HTMLElement[];
    const items = els.map((el) => ({
      id: el.id,
      text: el.textContent?.replace(/^#/, "").trim() ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(items);
    if (els.length > 0) setActiveId(els[0].id);

    // Robust "currently reading" detection: highlight the last heading that has
    // scrolled past ~120px from the viewport top (just below the sticky header).
    // Using scroll + getBoundingClientRect is more reliable than
    // IntersectionObserver order, which is non-deterministic.
    let ticking = false;
    const updateActive = () => {
      let current = "";
      // Walk headings in reverse so the last one above the threshold wins
      for (let i = els.length - 1; i >= 0; i--) {
        const rect = els[i].getBoundingClientRect();
        if (rect.top <= 120) {
          current = els[i].id;
          break;
        }
      }
      // At the very top (before first heading crosses threshold) keep first active
      if (!current && els.length > 0) {
        const firstTop = els[0].getBoundingClientRect().top;
        if (firstTop > 120 && window.scrollY < 200) current = els[0].id;
      }
      if (current) setActiveId(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Initial check after layout
    requestAnimationFrame(updateActive);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
