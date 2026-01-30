import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-26">
        <Link href="/" className="text-lg font-bold">
          William East
        </Link>
        <nav className="space-x-4 text-sm">
          <Link href="/">
            <span>1 </span>Home
          </Link>
          <Link href="/portfolio">
            <span>2 </span>Portfolio
          </Link>
          <Link href="/contact">
            <span>3 </span>Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
