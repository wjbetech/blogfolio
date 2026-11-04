"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ThemeDrawer from "@/components/ThemeSelector/ThemeDrawer/ThemeDrawer";
import ColorPaletteIcon from "@/components/Icons/ColorPaletteIcon";
import { useTheme } from "@/lib/theme";

export default function ThemeAside({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { themeId, setThemeById } = useTheme();
  const activePalette = themeId ?? null;
  const drawerContentRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const root = document.documentElement;
    const element = drawerContentRef.current;
    if (!element) return;

    // Measure the intrinsic content once; CSS animates the shared distance.
    const update = () => root.style.setProperty("--theme-drawer-height", `${open ? element.offsetHeight : 0}px`);
    update();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    observer?.observe(element);

    return () => observer?.disconnect();
  }, [open]);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => root.style.setProperty("--theme-drawer-scroll", `${window.scrollY}px`);
    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      root.style.removeProperty("--theme-drawer-height");
      root.style.removeProperty("--theme-drawer-scroll");
    };
  }, []);

  return (<>
    <aside className={className} data-open={open} aria-label="Theme settings">
      <button type="button" aria-label="Theme settings" aria-expanded={open} aria-controls="theme-drawer" onClick={() => setOpen(v => !v)} className="cursor-pointer rounded-full p-2 text-link hover:text-headline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-link"><ColorPaletteIcon className="size-6" /></button>
    </aside>
    <div className="theme-drawer-flow"><ThemeDrawer
        contentRef={drawerContentRef}
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(id) => {
          setThemeById(id);
        }}
        active={activePalette}
      /></div>
  </>);
}
