"use client";

import { useState } from "react";
import { IconBriefcase2, IconChevronDown, IconMapPin } from "@tabler/icons-react";

const roleResponsibilities = [
  "Design, build, and ship sites across a multi-site WordPress suite, turning Figma designs into polished, production-ready experiences.",
  "Own hosting and server diagnostics across DigitalOcean and Cloudflare, maintain company GitHub operations, and streamline delivery with clearer workflows and documentation.",
  "Manage the company CRM and build or unblock workflows for the patient management team.",
  "Debug technical issues across company services, resolving problems for both staff and customers.",
  "Research and apply AI in day-to-day work, turning useful experiments into practical integrations that improve company processes."
];

export default function CurrentRoleCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative isolate mb-5 overflow-hidden border border-accent-100/20 border-l-4 border-l-accent-200 bg-bg-200/80 px-5 py-5 shadow-sm sm:px-7 sm:py-6">
      <div aria-hidden="true" className="absolute -right-8 -top-10 -z-10 size-36 rounded-full bg-accent-100/15 blur-3xl" />

      <div className="flex items-start gap-4 sm:items-center">
        <span className="inline-flex size-11 shrink-0 items-center justify-center border border-accent-200/30 bg-bg-100/80 text-accent-200 sm:size-12">
          <IconBriefcase2 className="size-5" stroke={1.7} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-200">Current role</p>
          <h2 className="mt-1 text-lg font-semibold leading-snug text-headline sm:text-2xl">
            Software Engineer <span className="text-accent-200">·</span> AI-assisted Engineer
          </h2>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-paragraph sm:text-base">
            <span className="font-medium text-headline">ASTUTR. Co.</span>
            <span aria-hidden="true" className="text-accent-100">/</span>
            <span className="inline-flex items-center gap-1.5">
              <IconMapPin className="size-4 text-accent-100" stroke={1.8} aria-hidden="true" />
              Gangnam, Seoul
            </span>
          </p>
        </div>
        <button
          type="button"
          aria-label={isOpen ? "Hide role details" : "Show role details"}
          aria-expanded={isOpen}
          aria-controls="current-role-details"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center self-center border border-accent-200/25 bg-bg-100/70 text-accent-200 transition-colors hover:border-accent-200/50 hover:bg-accent-200/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-200">
          <IconChevronDown
            className={`size-5 transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : "rotate-0"}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        id="current-role-details"
        aria-hidden={!isOpen}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0 overflow-hidden">
          <div
            className={`mt-5 border-t border-accent-100/15 pt-4 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
              isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent-200">Day-to-day</p>
            <ul className="mt-3 columns-1 gap-x-8 sm:columns-2">
              {roleResponsibilities.map((responsibility) => (
                <li
                  key={responsibility}
                  className="mb-3 flex break-inside-avoid items-start gap-2.5 text-sm leading-relaxed text-paragraph sm:text-[0.95rem]">
                  <span aria-hidden="true" className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-accent-200" />
                  {responsibility}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
