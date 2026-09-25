"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ArrowLeftIcon from "../Icons/ArrowLeftIcon";
import ColorPaletteIcon from "../Icons/ColorPaletteIcon";
import HamburgerIcon from "../Icons/HamburgerIcon";

const navLinks = [
  { id: "blog", href: "/blog", label: "Blog" },
  { id: "dev", href: "/dev", label: "Dev" },
  { id: "language", href: "/language-services", label: "Language" },
  { id: "contact", href: "/contact", label: "Contact" }
];

function getRouteFallback(pathname: string) {
  if (pathname === "/") return "William East";
  if (pathname.startsWith("/dev")) return "Dev";
  if (pathname.startsWith("/language-services")) return "Language Services";
  if (pathname.startsWith("/blog")) return "Blog";
  if (pathname.startsWith("/contact")) return "Get in Touch";
  if (pathname.startsWith("/font-playground")) return "Font Playground";
  return "Blogfolio";
}

export default function Navbar({ onToggle, isDrawerOpen }: { onToggle?: () => void; isDrawerOpen?: boolean; activePalette?: string | null }) {
  const pathname = usePathname() ?? "";
  const isBlogPost = pathname.startsWith("/blog/");
  const isDevProject = pathname.startsWith("/dev/");
  const hasBackLink = isBlogPost || isDevProject;
  const [heading, setHeading] = useState<{ pathname: string; text: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const mobileNavId = useId();
  const isActiveLink = (href: string) =>
    href === "/blog" || href === "/dev" || href === "/language-services"
      ? pathname === href || pathname.startsWith(`${href}/`)
      : pathname === href;

  const handleLinkClick = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (pathname === "/") return;

    const main = document.querySelector("main");
    if (!main) return;

    const updateHeading = () => {
      const text = main.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim();
      if (text) setHeading((current) => (current?.pathname === pathname && current.text === text ? current : { pathname, text }));
    };

    const frame = requestAnimationFrame(updateHeading);
    const observer = new MutationObserver(updateHeading);
    observer.observe(main, { childList: true, characterData: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const menu = mobileMenuRef.current;
    const mobileButton = mobileButtonRef.current;
    const focusableSelector = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    menu?.querySelector<HTMLElement>(focusableSelector)?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menu) return;
      const focusable = Array.from(menu.querySelectorAll<HTMLElement>(focusableSelector));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
      if (event.shiftKey && document.activeElement === first) {
        last.focus();
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      mobileButton?.focus();
    };
  }, [mobileMenuOpen]);

  return (
    <header className="relative isolate z-50 px-4 sm:px-6" style={{ willChange: "transform", backfaceVisibility: "hidden" }}>
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between">
        <Link
          href={isBlogPost ? "/blog" : isDevProject ? "/dev" : "/"}
          onClick={handleLinkClick}
          aria-label={isBlogPost ? "Back to all blogs" : isDevProject ? "Back to all projects" : pathname === "/" ? "William East home" : `Return home from ${heading?.pathname === pathname ? heading.text : getRouteFallback(pathname)}`}
          title={isBlogPost ? "Back to all blogs" : isDevProject ? "Back to all projects" : heading?.pathname === pathname ? heading.text : getRouteFallback(pathname)}
          className={`inline-flex min-w-0 items-center gap-2 truncate font-bold tracking-tight text-headline ${
            hasBackLink ? "max-w-[60%] text-base sm:text-lg" : "max-w-[50%] text-xl sm:text-2xl"
          }`}>
          {hasBackLink ? (
            <>
              <ArrowLeftIcon className="size-4 shrink-0" />
              <span className="truncate">{isBlogPost ? "Back to all blogs" : "Back to all projects"}</span>
            </>
          ) : (
            heading?.pathname === pathname ? heading.text : getRouteFallback(pathname)
          )}
        </Link>
        <div className="relative z-50 flex items-center gap-3">
          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              return <Link key={link.id} href={link.href} onClick={handleLinkClick} aria-current={active ? "page" : undefined} className={`relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:bottom-px after:left-2 after:right-3 after:h-3 after:origin-left after:transition-transform after:-z-10 ${active ? "font-semibold text-headline after:scale-x-100 after:bg-accent-100/50" : "text-accent-200 after:scale-x-0 after:invisible after:bg-accent-200/50 hover:after:scale-x-100 hover:after:visible"}`}>{link.label}</Link>;
            })}
          </nav>
          <button ref={mobileButtonRef} type="button" aria-label="Toggle mobile menu" aria-controls={mobileNavId} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="cursor-pointer p-0 md:hidden">
            <HamburgerIcon open={mobileMenuOpen} />
          </button>
          <button type="button" aria-label="Theme settings" aria-expanded={isDrawerOpen} aria-controls="theme-drawer" onClick={() => onToggle?.()} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full p-0">
            <ColorPaletteIcon className="h-full w-full -translate-y-px text-accent-100" />
          </button>
        </div>
      </div>
      <div className={`fixed left-0 right-0 top-[4.5rem] z-40 h-[50vh] border-b border-accent-200/20 bg-bg-100 transition duration-300 ease-out md:hidden ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full pointer-events-none opacity-0"}`} role="presentation" aria-hidden={!mobileMenuOpen} onClick={(event) => { if (event.target === event.currentTarget) setMobileMenuOpen(false); }}>
        <nav id={mobileNavId} ref={mobileMenuRef} aria-label="Mobile navigation" aria-hidden={!mobileMenuOpen} className="mx-auto flex h-full max-w-7xl flex-col justify-center gap-3 px-6 sm:px-8">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);
            return <Link key={link.id} href={link.href} onClick={handleLinkClick} tabIndex={mobileMenuOpen ? undefined : -1} aria-current={active ? "page" : undefined} className={`rounded-xl border px-5 py-4 text-xl font-semibold transition-colors ${active ? "border-accent-200/40 bg-bg-200 text-headline" : "border-palette-border/50 text-paragraph hover:bg-bg-200/70"}`}>{link.label}</Link>;
          })}
        </nav>
      </div>
    </header>
  );
}
