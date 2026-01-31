"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ColorPaletteIcon from "../Icons/ColorPalette";
import ThemeDrawer from "../ThemeDrawer/ThemeDrawer";

const navLinks = [
  { id: "1", href: "/", label: "Home" },
  { id: "2", href: "/portfolio", label: "Blog" },
  { id: "3", href: "/language-work", label: "Lang. Services" },
  { id: "4", href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activePalette, setActivePalette] = useState<string | null>(null);

  return (
    <header className="">
      <div className="max-w-7xl mx-auto px-16 flex items-center align-middle justify-between h-32">
        <Link href="/" className="text-2xl font-bold">
          William East
        </Link>
        <nav className="flex gap-4 items-center align-middle">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link key={link.label} href={link.href}>
                <span className="font-bold">{link.id}</span>{" "}
                <span className={isActive ? "text-primary underline underline-offset-2" : "text-slate-900"}>
                  {link.label}
                </span>
              </Link>
            );
          })}

          <button
            onClick={() => setOpen(true)}
            className="ml-6 rounded-full p-3 bg-slate-100 shadow-lg cursor-pointer"
            aria-label="Open theme palettes"
            aria-expanded={open}>
            <ColorPaletteIcon className="w-6 h-6 text-primary" />
          </button>
        </nav>
      </div>

      <ThemeDrawer
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(id) => {
          setActivePalette(id);
          setOpen(false);
          // TODO: apply theme -> hook into app theme logic later
        }}
        active={activePalette}
      />
    </header>
  );
}
