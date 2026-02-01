"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeDrawerCarousel, { ThemeDrawerCarouselHandle } from "../ThemeCarousel/ThemeDrawerCarousel";
import UpArrowIcon from "../../Icons/UpArrowIcon";
import { ColorThemes } from "@/lib/themes";
import { applyTheme } from "@/lib/applyTheme";

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
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="theme-drawer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className="overflow-hidden border-b-2 bg-bg-200 border-b-accent-300">
          <div className="max-w-7xl mx-auto py-2 flex items-center justify-between px-16">
            <div className="flex items-center gap-2 mx-auto">
              <button
                type="button"
                aria-label="Scroll themes left"
                onClick={() => carouselRef.current?.scrollLeft()}
                className="hidden md:inline-flex items-center text-xl p-1 cursor-pointer hover:opacity-80">
                ‹
              </button>

              <h3 className="text-xl font-bold">Themes</h3>

              <button
                type="button"
                aria-label="Scroll themes right"
                onClick={() => carouselRef.current?.scrollRight()}
                className="hidden md:inline-flex items-center text-xl p-1 cursor-pointer hover:opacity-80">
                ›
              </button>
            </div>

            <div>
              <button onClick={onClose} aria-label="Close theme drawer" className="py-2 cursor-pointer text-headline">
                <UpArrowIcon />
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-12">
            <ThemeDrawerCarousel
              ref={carouselRef}
              active={active}
              onSelect={(id) => {
                const theme = ColorThemes.find((x) => x.id === id);
                if (theme) applyTheme(theme);
                onSelect(id);
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
