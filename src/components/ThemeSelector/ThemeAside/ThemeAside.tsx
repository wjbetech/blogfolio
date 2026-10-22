"use client";

import { useEffect, useRef, useState } from "react";
import ThemeDrawer from "@/components/ThemeSelector/ThemeDrawer/ThemeDrawer";
import useTheme from "@/hooks/useThemeHook";
import ColorPaletteIcon from "@/components/Icons/ColorPaletteIcon";

export default function ThemeAside({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { themeId, setThemeById } = useTheme();
  const activePalette = themeId ?? null;
  const drawerFlowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = drawerFlowRef.current;
    if (!element) return;
    const update = () => document.documentElement.style.setProperty("--theme-drawer-height", `${element.offsetHeight}px`);
    update();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (<>
    <aside className={className} data-open={open} aria-label="Theme settings">
      <button type="button" aria-label="Theme settings" aria-expanded={open} aria-controls="theme-drawer" onClick={() => setOpen(v => !v)} className="cursor-pointer rounded-full p-2 text-accent-100 hover:text-accent-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-100"><ColorPaletteIcon className="size-6" /></button>
    </aside>
    <div ref={drawerFlowRef} className="theme-drawer-flow"><ThemeDrawer
        open={open}
        onClose={() => setOpen((v) => !v)}
        onSelect={(id) => {
          setThemeById(id);
        }}
        active={activePalette}
      /></div>
  </>);
}
