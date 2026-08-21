import ContactForm from "./ContactForm";
import TrackedLink from "@/components/Analytics/TrackedLink";
import { createContactMetadata } from "@/lib/metadata";

export const metadata = createContactMetadata();

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto py-16">
        <h1 className="text-4xl font-bold font-serif text-headline mb-6">Get in Touch</h1>
        <p className="text-lg text-paragraph mb-12">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you.
        </p>

        <ContactForm />

        <div className="mt-12 pt-12 border-t border-accent-100/20">
          <h2 className="text-2xl font-semibold font-serif text-headline mb-4">Other Ways to Connect</h2>
          <div className="space-y-3 text-paragraph">
            <p>
              Email:{" "}
              <TrackedLink
                href="mailto:wjbetech@gmail.com"
                className="text-accent-200 hover:underline"
                eventName="Contact Click"
                eventProps={{ surface: "contact_email", target: "mailto" }}>
                wjbetech@gmail.com
              </TrackedLink>
            </p>
            <p>
              GitHub:{" "}
              <TrackedLink
                href="https://github.com/wjbetech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-200 hover:underline"
                eventName="Contact Click"
                eventProps={{ surface: "contact_github", target: "github" }}>
                @wjbetech
              </TrackedLink>
            </p>
            <p>
              LinkedIn:{" "}
              <TrackedLink
                href="https://linkedin.com/in/wjbetech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-200 hover:underline"
                eventName="Contact Click"
                eventProps={{ surface: "contact_linkedin", target: "linkedin" }}>
                William East
              </TrackedLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
