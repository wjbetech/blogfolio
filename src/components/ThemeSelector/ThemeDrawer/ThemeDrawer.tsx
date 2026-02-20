"use client";

import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeDrawerCarousel, { ThemeDrawerCarouselHandle } from "../ThemeCarousel/ThemeDrawerCarousel";
import UpArrowIcon from "../../Icons/UpArrowIcon";

export default function ThemeDrawer({
  open,
  onClose,
  onSelect,
  active
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  active?: string | null;
}) {
  const carouselRef = useRef<ThemeDrawerCarouselHandle | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const container = containerRef.current;
    const closeBtn = container?.querySelector<HTMLElement>("button[aria-label='Close theme drawer']");
    // focus the close button when drawer opens
    closeBtn?.focus();

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

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="theme-drawer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          ref={containerRef}
          id="theme-drawer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="theme-drawer-title"
          className="overflow-hidden border-b-2 bg-bg-200 border-b-accent-300">
          <div className="max-w-7xl mx-auto py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 mx-auto max-w-7xl">
              <button
                type="button"
                aria-label="Scroll themes left"
                onClick={() => carouselRef.current?.scrollLeft()}
                className="hidden md:inline-flex items-center text-xl p-1 cursor-pointer hover:opacity-80">
                ‹
              </button>

              <h3 id="theme-drawer-title" className="text-xl font-bold">
                Themes
              </h3>

              <button
                type="button"
                aria-label="Scroll themes right"
                onClick={() => carouselRef.current?.scrollRight()}
                className="hidden md:inline-flex items-center text-xl p-1 cursor-pointer hover:opacity-80">
                ›
              </button>
            </div>

            <div>
              <button
                onClick={onClose}
                aria-label="Close theme drawer"
                className="py-2 pr-6 cursor-pointer text-headline">
                <UpArrowIcon />
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <ThemeDrawerCarousel ref={carouselRef} active={active} onSelect={(id) => onSelect(id)} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
