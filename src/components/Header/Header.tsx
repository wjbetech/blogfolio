import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-lg font-bold">
          BlogFolio
        </Link>
        <nav className="space-x-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
