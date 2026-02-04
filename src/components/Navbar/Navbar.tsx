"use client";

import { useState } from "react";
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

  return (
    <header>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 sm:h-32">
        <Link href="/" className="text-xl sm:text-2xl font-bold font-serif text-headline">
          William East
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`flex items-baseline gap-2 relative pb-1 text-sm lg:text-lg transition-colors ${
                  pathname === link.href
                    ? "font-semibold text-headline after:absolute after:bottom-px after:left-0 after:right-0 after:h-3 after:bg-accent-100/50 after:origin-left after:transform after:scale-x-100 after:transition-transform after:duration-200 after:-z-10"
                    : "text-accent-200 after:absolute after:bottom-px after:left-0 after:right-0 after:h-3 after:bg-accent-200/50 after:origin-left after:transform after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 after:-z-10"
                }`}>
                <span className="text-xs font-normal text-paragraph opacity-60">0{link.id}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button - visible on mobile only */}
          <button
            type="button"
            aria-label="Toggle mobile menu"
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
            onClick={() => onToggle?.()}
            className="rounded-full flex items-center justify-center cursor-pointer">
            <ColorPaletteIcon className="text-accent-100" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Modal - full width, half screen height */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 h-[50vh] z-50 bg-bg-100 border-b border-accent-200/20 shadow-xl">
          <nav className="flex flex-col h-full justify-center items-start px-8 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={handleLinkClick}
                className={`flex items-baseline gap-4 text-4xl font-bold relative pb-2 transition-colors ${
                  pathname === link.href
                    ? "text-headline after:absolute after:bottom-1 after:left-0 after:right-0 after:h-6 after:bg-accent-100 after:origin-left after:transform after:scale-x-100 after:transition-transform after:duration-200 after:-z-10"
                    : "text-paragraph after:absolute after:bottom-1 after:left-0 after:right-0 after:h-6 after:bg-accent-200 after:origin-left after:transform after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 after:-z-10"
                }`}>
                <span className="text-sm font-normal text-paragraph opacity-60">0{link.id}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
