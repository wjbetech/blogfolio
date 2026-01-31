"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { id: "1", href: "/", label: "Home" },
  { id: "2", href: "/portfolio", label: "Blog" },
  { id: "3", href: "/language-work", label: "Translation // Editing" },
  { id: "4", href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header>
      <div className="max-w-7xl mx-auto px-16 flex items-center justify-between h-32">
        <Link href="/" className="text-2xl font-bold">
          William East
        </Link>
        <nav className="flex gap-4">
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
        </nav>
      </div>
    </header>
  );
}
