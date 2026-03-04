"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ColorPaletteIcon from "../Icons/ColorPaletteIcon";

export default function Navbar({
  onToggle,
  isDrawerOpen
}: {
  onToggle?: () => void;
  isDrawerOpen?: boolean;
  activePalette?: string | null;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavId = "primary-navigation-mobile";

  const navLinks = [
    { id: "1", href: "/", label: "Home" },
    { id: "2", href: "/blog", label: "Blog" },
    { id: "3", href: "/dev", label: "Dev" },
    { id: "4", href: "/language-services", label: "Language" },
    { id: "5", href: "/contact", label: "Contact" }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const menu = mobileMenuRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusable = menu?.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menu) return;

      const focusable = Array.from(menu.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusable.length === 0) return;

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
      mobileButtonRef.current?.focus();
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className="isolate z-50 px-4 sm:px-6 lg:px-8"
      style={{ contain: "paint", willChange: "transform", backfaceVisibility: "hidden" }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 sm:h-32">
        <Link href="/" className="text-xl sm:text-2xl font-bold font-serif text-headline">
          William East
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const isBlogLink = link.href === "/blog";
              const active = isBlogLink
                ? pathname === "/blog" || pathname?.startsWith("/blog/")
                : pathname === link.href;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  style={{
                    transition: "none",
                    color: active ? "var(--headline)" : "var(--accent-200)"
                  }}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-baseline gap-2 relative pb-1 text-sm lg:text-lg font-serif ${
                    active
                      ? "font-semibold after:absolute after:bottom-px after:left-0 after:right-0 after:h-3 after:bg-accent-100/50 after:origin-left after:transform after:scale-x-100 after:-z-10"
                      : "after:absolute after:bottom-px after:left-0 after:right-0 after:h-3 after:bg-accent-200/50 after:origin-left after:transform after:scale-x-0 after:invisible hover:after:scale-x-100 hover:after:visible after:-z-10"
                  }`}>
                  <span className="text-xs font-normal text-paragraph" style={{ transition: "none" }}>
                    0{link.id}
                  </span>
                  <span style={{ transition: "none" }}>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button - visible on mobile only */}
          <button
            ref={mobileButtonRef}
            type="button"
            aria-label="Toggle mobile menu"
            aria-controls={mobileNavId}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 cursor-pointer">
            <span
              className={`block h-0.5 w-full bg-headline transition-transform ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-headline transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-full bg-headline transition-transform ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            aria-label="Theme settings"
            aria-expanded={isDrawerOpen}
            aria-controls="theme-drawer"
            onClick={() => onToggle?.()}
            className="rounded-full flex items-center justify-center cursor-pointer">
            <ColorPaletteIcon className="text-accent-100" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Modal - full width, half screen height */}
      {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-20 h-[50vh] z-50 bg-bg-100 border-b border-accent-200/20 shadow-xl">
          <nav
            id={mobileNavId}
            ref={mobileMenuRef}
            aria-label="Mobile navigation"
            className="flex flex-col h-full justify-center items-start px-8 gap-8">
            {navLinks.map((link) => {
              const isBlogLink = link.href === "/blog";
              const active = isBlogLink
                ? pathname === "/blog" || pathname?.startsWith("/blog/")
                : pathname === link.href;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={handleLinkClick}
                  style={{ transition: "none" }}
                  className={`flex items-baseline gap-4 text-4xl font-bold relative pb-2 ${
                    active
                      ? "text-headline after:absolute after:bottom-1 after:left-0 after:right-0 after:h-6 after:bg-accent-100 after:origin-left after:transform after:scale-x-100 after:-z-10"
                      : "text-paragraph after:absolute after:bottom-1 after:left-0 after:right-0 after:h-6 after:bg-accent-200 after:origin-left after:transform after:scale-x-0 after:invisible hover:after:scale-x-100 hover:after:visible after:-z-10"
                  }`}
                  aria-current={active ? "page" : undefined}>
                  <span className="text-sm font-normal text-paragraph opacity-60" style={{ transition: "none" }}>
                    0{link.id}
                  </span>
                  <span style={{ transition: "none" }}>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
