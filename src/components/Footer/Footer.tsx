import Link from "next/link";
import GithubIcon from "../Icons/GitHubIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer bottom-0">
      <div className="max-w-7xl mx-auto px-4 md:px-14 flex items-center justify-between h-16">
        <div className="text-paragraph font-bold">© 2020-{year} William East</div>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="https://github.com/wjbetech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            aria-label="GitHub">
            <GithubIcon className="w-5 h-5 text-paragraph" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/wjbetech/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            aria-label="LinkedIn">
            <LinkedInIcon className="w-5 h-5 text-paragraph" />
          </Link>
        </nav>
      </div>
    </footer>
  );
}
