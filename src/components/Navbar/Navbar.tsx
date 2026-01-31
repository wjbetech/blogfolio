"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ColorPaletteIcon from "../Icons/ColorPaletteIcon";

export default function Navbar({
  onToggle,
  isDrawerOpen
  // activePalette IMPLEMENT THIS
}: {
  onToggle?: () => void;
  isDrawerOpen?: boolean;
  activePalette?: string | null;
}) {
  const pathname = usePathname();

  const navLinks = [
    { id: "1", href: "/", label: "Home" },
    { id: "2", href: "/portfolio", label: "Blog" },
    { id: "3", href: "/projects", label: "Dev" },
    { id: "4", href: "/language-work", label: "Lang" },
    { id: "5", href: "/contact", label: "Contact" }
  ];

  return (
    <header>
      <div className="max-w-7xl mx-auto px-16 flex items-center justify-between h-32">
        <Link href="/" className="text-2xl font-bold text-headline">
          William East
        </Link>

        <div className="flex items-center">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`text-sm ${pathname === link.href ? "font-semibold text-headline" : "text-paragraph"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Theme settings"
            aria-expanded={isDrawerOpen}
            onClick={() => onToggle?.()}
            className="ml-6 rounded-full flex items-center justify-center cursor-pointer">
            <ColorPaletteIcon className="text-accent" />
          </button>
        </div>
      </div>
    </header>
  );
}
