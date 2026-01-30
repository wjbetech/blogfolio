import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-32">
        <Link href="/" className="text-lg font-bold">
          William East
        </Link>
        <nav className="space-x-8 text-sm">
          <Link href="/">
            <span className="font-bold">1 </span>Home
          </Link>
          <Link href="/portfolio">
            <span className="font-bold">2 </span>Dev Portfolio
          </Link>
          <Link href="/contact">
            <span className="font-bold">3 </span>Contact
          </Link>

          <Link href="/language-work">
            <span className="font-bold">4 </span>Translation // Editing
          </Link>
        </nav>
      </div>
    </header>
  );
}
