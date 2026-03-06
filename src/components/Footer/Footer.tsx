import TrackedLink from "@/components/Analytics/TrackedLink";
import GithubIcon from "../Icons/GitHubIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer mt-auto w-full flex-shrink-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="text-paragraph font-serif font-bold">© 2020-{year} William East</div>

        <nav className="flex items-center gap-4 text-sm">
          <TrackedLink
            href="https://github.com/wjbetech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            aria-label="GitHub"
            eventName="Contact Click"
            eventProps={{ surface: "footer_github", target: "github" }}>
            <GithubIcon className="w-5 h-5 text-paragraph" />
          </TrackedLink>

          <TrackedLink
            href="https://www.linkedin.com/in/wjbetech/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            aria-label="LinkedIn"
            eventName="Contact Click"
            eventProps={{ surface: "footer_linkedin", target: "linkedin" }}>
            <LinkedInIcon className="w-5 h-5 text-paragraph" />
          </TrackedLink>
        </nav>
      </div>
    </footer>
  );
}
