import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-16 flex items-center justify-between h-16">
        <div className="text-sm text-slate-700">© 2021-{year} William East</div>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="https://github.com/wjbetech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
            aria-label="GitHub">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.7.5.8 5.4.8 11.7c0 4.7 3 8.7 7 10.1.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1.1-2.8-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .9.9-.2 1.9-.4 2.9-.4s2 .1 2.9.4c2.1-1.2 3-.9 3-.9.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 2.8 0 3.9-2.3 4.6-4.5 4.9.3.3.6.8.6 1.6v2.4c0 .3.2.6.7.5 4-1.4 7-5.4 7-10.1C23.2 5.4 18.3.5 12 .5z" />
            </svg>
          </Link>

          <Link
            href="https://www.linkedin.com/in/wjbetech/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
            aria-label="LinkedIn">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v13h-4V8zM8.5 8h3.8v1.8h.1c.5-.9 1.8-1.8 3.8-1.8 4 0 4.7 2.6 4.7 6v8h-4v-7.1c0-1.7-.1-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8V21h-4V8z" />
            </svg>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
