import { IconArrowRight, IconMapPin } from "@tabler/icons-react";
import styles from "./CurrentRoleCard.module.css";
import Link from "next/link";

const roleAreas = [
  {
    label: "Software & data",
    description:
      "Clinic websites, internal patient-service tools, and a clinical and patient data platform."
  },
  {
    label: "Infrastructure",
    description:
      "DigitalOcean hosting, Cloudflare, GitHub delivery workflows, and CRM operations."
  },
  {
    label: "Applied AI",
    description:
      "Research and integrate AI capabilities into internal tools and team workflows."
  }
];

export default function CurrentRoleCard() {
  return (
    <section aria-labelledby="current-role-title" className="mb-10 pb-5 sm:pb-6">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <h1 id="current-role-title" className="text-lg font-semibold leading-snug text-headline sm:text-xl">
            AI Engineer <span className="text-accent-200">·</span> ASTUTR. Co.
          </h1>
          <Link href="/dev/astutr" className="inline-flex items-center gap-1.5 text-sm font-semibold text-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-link">Find Out More<IconArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <p className="inline-flex items-center gap-1.5 text-sm text-paragraph">
          <IconMapPin className="size-4 text-link" stroke={1.8} aria-hidden="true" />
          Gangnam, Seoul
        </p>
      </div>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-paragraph sm:text-base">
        Engineering customer-facing platforms & building internal systems for ASTUTR, an intl. medical tourism company.
      </p>

      <ul className={styles.details}>
        {roleAreas.map((area) => (
          <li key={area.label} className={styles.area}>
            <h2 className={styles.label}>{area.label}</h2>
            <p className={styles.description}>{area.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
