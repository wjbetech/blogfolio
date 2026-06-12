import { services } from "@/lib/servicesData";
import ExperienceTimeline from "./ExperienceTimeline";
import { experienceItems } from "@/lib/experiencesData";

export default function LanguageServicesPage() {
  const experienceGroups = [
    {
      year: "2026",
      items: experienceItems.filter((item) => item.yearLabel.startsWith("2026"))
    },
    {
      year: "2025",
      items: experienceItems.filter((item) => item.yearLabel.startsWith("2025"))
    },
    {
      year: "2022",
      items: experienceItems.filter((item) => item.yearLabel.startsWith("2022"))
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold font-serif text-headline mb-6">Language Services</h1>
        <p className="text-lg text-paragraph mb-8">
          Professional language services including translation, localization, proofreading, editing and consulting.
        </p>

        <div className="space-y-12">
          {/* description of available services */}
          <section className="my-8">
            <div className="flex items-end justify-between gap-6"></div>

            <div className="mt-4">
              {services.map((service, i) => (
                <div
                  key={service.title}
                  className="group relative border-t border-paragraph/15 hover:border-accent-300/60 py-7 md:py-9 grid grid-cols-[auto_1fr] md:grid-cols-12 gap-x-5 gap-y-3 items-start transition-all duration-500 md:hover:pl-3 animate-in fade-in slide-in-from-bottom-4 animation-duration-[700ms] fill-mode-backwards"
                  style={{ animationDelay: `${150 + i * 150}ms` }}>
                  <div className="md:col-span-5 flex items-center gap-4">
                    <span className="hidden md:flex w-12 h-12 shrink-0 items-center justify-center rounded-full border border-paragraph/25 text-headline transition-all duration-500 group-hover:rotate-360 group-hover:border-accent-300 group-hover:text-accent-300">
                      <service.icon className="w-5 h-5" stroke={1.5} />
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-headline transition-colors duration-300 group-hover:text-accent-300">
                      {service.title}
                    </h3>
                  </div>

                  <p className="col-span-2 md:col-span-6 text-paragraph leading-relaxed md:pt-2">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* experience */}
          <section className="mt-8 pt-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold font-serif text-headline">Experience</h2>
              <p className="text-paragraph/70">(Not exhaustive; some projects and clients are confidential)</p>
            </div>
            <ExperienceTimeline groups={experienceGroups} />
          </section>
        </div>
      </div>
    </div>
  );
}
