"use client";

import { useRef, useEffect, type Ref } from "react";
import ThemeDrawerCarousel, { ThemeDrawerCarouselHandle } from "../ThemeCarousel/ThemeDrawerCarousel";
import UpArrowIcon from "../../Icons/UpArrowIcon";
import styles from "./ThemeDrawer.module.css";

export default function ThemeDrawer({
  open,
  onClose,
  onSelect,
  active,
  contentRef,
  className = ""
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  active?: string | null;
  contentRef?: Ref<HTMLDivElement>;
  className?: string;
}) {
  const carouselRef = useRef<ThemeDrawerCarouselHandle | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const container = containerRef.current;
    const closeBtn = container?.querySelector<HTMLElement>("button[aria-label='Close theme drawer']");
    // focus the close button when drawer opens
    closeBtn?.focus();

    // ensure the active palette is scrolled into view once the carousel is mounted
    // small timeout to allow children to render/layout
    setTimeout(() => {
      carouselRef.current?.scrollToActive?.();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Tab") {
        const focusable = container?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // return focus to theme toggle button if present
      const toggle = document.querySelector<HTMLElement>("button[aria-label='Theme settings']");
      toggle?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      carouselRef.current?.scrollToActive?.();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [open, active]);

  return (
    <div
      ref={containerRef}
      id="theme-drawer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-drawer-title"
      style={{ height: "var(--theme-drawer-height, 0px)" }}
      className={`${className} relative shrink-0 overflow-hidden bg-bg-200 shadow-[inset_0_-2px_0_var(--accent-300)] transition-opacity duration-[400ms] ease-in-out motion-reduce:transition-none ${
        open ? "opacity-100" : "opacity-0"
      }`}>
      <div ref={contentRef} className={styles.drawerGrid}>
        <div className={styles.carouselControls}>
          <button
            type="button"
            aria-label="Scroll themes left"
            onClick={() => carouselRef.current?.scrollLeft()}
            className="inline-flex items-center justify-center text-xl p-1 cursor-pointer hover:opacity-80 shrink-0">
            ‹
          </button>
          <h3 id="theme-drawer-title" className="text-xl font-semibold text-headline text-center">
            Themes
          </h3>
          <button
            type="button"
            aria-label="Scroll themes right"
            onClick={() => carouselRef.current?.scrollRight()}
            className="inline-flex items-center justify-center text-xl p-1 cursor-pointer hover:opacity-80 shrink-0">
            ›
          </button>
        </div>

        <div className={styles.carouselArea}>
          <ThemeDrawerCarousel ref={carouselRef} active={active} onSelect={(id) => onSelect(id)} />
        </div>
      </div>

      <button
        onClick={onClose}
        aria-label="Close theme drawer"
        className={`${styles.closeButton} flex items-center justify-center cursor-pointer text-headline shrink-0`}>
        <UpArrowIcon />
      </button>
    </div>
  );
}
