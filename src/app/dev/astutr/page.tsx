import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/metadata";

const description = "My work as an AI Engineer at ASTUTR: clinic websites, internal tooling, clinical and patient data, infrastructure, and applied AI.";

export const metadata: Metadata = {
  title: "Engineering at ASTUTR | William East",
  description,
  alternates: { canonical: `${SITE_URL}/dev/astutr` },
  openGraph: { title: "Engineering at ASTUTR", description, url: `${SITE_URL}/dev/astutr`, type: "website" }
};

const areas = [
  {
    title: "Web platforms & internal tools",
    detail: "Design, build, and maintain the company’s WordPress Multisite network of websites for clinics across Seoul. The work spans turning designs into production experiences and maintaining the sites as clinic and business needs change.",
    supporting: "Alongside the public websites, I build and maintain internal tooling that supports the patient services team and its day-to-day work."
  },
  {
    title: "Clinical & patient data",
    detail: "Architect and develop a data platform using clinical and patient data. This work extends my role beyond the public-facing websites into the systems that support the company’s internal operations."
  },
  {
    title: "Infrastructure & delivery",
    detail: "Manage hosting and server diagnostics across DigitalOcean and Cloudflare, maintain company GitHub operations, and improve delivery workflows.",
    supporting: "Support the patient management team by maintaining CRM processes and investigating technical issues across company services."
  },
  {
    title: "Applied AI",
    detail: "Research practical AI applications and bring useful experiments into day-to-day work. Identify opportunities to simplify internal processes and integrate AI capabilities into internal tools and team workflows."
  }
];

export default function AstutrPage() {
  return (
    <article className="max-w-3xl pb-12">
      <Link href="/dev" className="text-sm font-semibold text-link underline-offset-4 hover:underline">← Back to Projects</Link>
      <header className="mt-8 mb-10">
        <p className="mb-3 text-sm text-paragraph">AI Engineer · Gangnam, Seoul</p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-headline sm:text-4xl">Engineering at ASTUTR.</h1>
        <p className="mt-5 text-base leading-7 text-paragraph">ASTUTR is an international medical tourism company. I engineer customer-facing platforms and build internal systems, working across software, data, infrastructure, and applied AI.</p>
      </header>
      <div className="space-y-8">
        {areas.map((area) => (
          <section key={area.title} className="border-t border-paragraph/10 pt-6">
            <h2 className="font-serif text-xl font-semibold text-headline">{area.title}</h2>
            <p className="mt-3 text-base leading-7 text-paragraph">{area.detail}</p>
            {area.supporting && <p className="mt-3 text-base leading-7 text-paragraph">{area.supporting}</p>}
          </section>
        ))}
      </div>
    </article>
  );
}
