import { IconBriefcase, IconChecklist, IconLanguage, IconWorld } from "@tabler/icons-react";
import ExperienceTimeline from "./ExperienceTimeline";

export default function LanguageServicesPage() {
  const services = [
    {
      index: "01",
      title: "Translation",
      icon: IconLanguage,
      titleHover: "group-hover:text-accent-100",
      iconHover: "group-hover:border-accent-100 group-hover:text-accent-100",
      rowHover: "hover:border-accent-100/60",
      description:
        "5+ years of experience working with a diverse range of clients and industries providing translations for technical, academic and clients dealing with the arts and history."
    },
    {
      index: "02",
      title: "Localization",
      icon: IconWorld,
      titleHover: "group-hover:text-accent-200",
      iconHover: "group-hover:border-accent-200 group-hover:text-accent-200",
      rowHover: "hover:border-accent-200/60",
      description:
        "After 10 years of living in Korea and experience with a vast array of Korean content and media, I can provide effective localizations for the web, games, film and more."
    },
    {
      index: "03",
      title: "Proofreading & Editing",
      icon: IconChecklist,
      titleHover: "group-hover:text-accent-300",
      iconHover: "group-hover:border-accent-300 group-hover:text-accent-300",
      rowHover: "hover:border-accent-300/60",
      description:
        "Experienced freelance proofreader/editor, working with clients including LG, POSCO, POSTECH, and more."
    },
    {
      index: "04",
      title: "Consulting",
      icon: IconBriefcase,
      titleHover: "group-hover:text-accent-100",
      iconHover: "group-hover:border-accent-100 group-hover:text-accent-100",
      rowHover: "hover:border-accent-100/60",
      description:
        "I provide strategic guidance for individuals and organizations looking to expand their international reach."
    }
  ];

  const experienceItems = [
    {
      client: "Korea Atomic Industrial Forum",
      yearLabel: "2026",
      description:
        "Translation and editing of application documents for seventeen companies submitted to a national nuclear forum with the goal of securing funding and investment."
    },
    {
      client: "STRONG Korea",
      yearLabel: "2026",
      description:
        "Korean to English translation and proofreading for the 2026 STRONG (Science, Technology, and Research are Our National Goal) KOREA forum opening remarks."
    },
    {
      client: "K-EXPO France",
      yearLabel: "2026",
      description:
        "Korean to English translation and proofreading for the proposal slides for the 2026 K-EXPO held in Paris, France."
    },
    {
      client: "POSTECH (Pohang University of Science and Technology)",
      yearLabel: "2025 ~ Ongoing",
      description:
        "Translation, proofreading and editing of various academic materials such as administrative documentation and program materials for undergraduate, graduate and Ph.D. students as well as brochures and promotional materials for the university."
    },
    {
      client: "Ministry of Unification Promotional Materials",
      yearLabel: "2025 ~ Ongoing",
      description:
        "Proofreading and subtitle consulting for multiple promotional video materials for the Ministry of Unification, a government ministry responsible for inter-Korean relations and reunification efforts on the Korean peninsula."
    },
    {
      client: "Korea Environment Corporation",
      yearLabel: "2025",
      description:
        "Provided professional proofreading and editing for the 2025 brochure for the Korea Environment Corporation document 'Korea's Recycled Material Management Framework'."
    },
    {
      client: "LG Human Development Center",
      yearLabel: "2025",
      description:
        "Provided translation and proofreading consulting for over twenty hours of video content for the LG Human Development Center AI Training Program."
    },
    {
      client: "Suwon G-Quantum Summit",
      yearLabel: "2025",
      description:
        "Provided translation, proofreading and edits for the 2025 G-Quantum Summit promotional slides and materials."
    },
    {
      client: "Nakwon Offshore Wind Farm Program",
      yearLabel: "2025",
      description:
        "Translated the financial documentation and project briefing documentation for the Nakwon Offshore Wind Farm project."
    },
    {
      client: "Songpa Festival",
      yearLabel: "2025",
      description:
        "Provided the translations for the Songpa Festival brochure and promotional materials for the 2025 Songpa Festival, a local cultural event in Seoul. I also translated the Seoul Festival Poem Competition winner's poem from Korean in to English."
    },
    {
      client: "Jeju National University Marine Litter",
      yearLabel: "2025",
      description:
        "Provided Korean to English proofreading and editing for the Jeju National University Marine Litter promotional slides."
    },
    {
      client: "APEC Summit",
      yearLabel: "2025",
      description:
        "Worked as the solo proofreader for the 2025 APEC Summit English language guidebook, a major international event held with prominent world leaders in attendance."
    },
    {
      client: "Ministry of Unification White Paper",
      yearLabel: "2025",
      description:
        "Provided proofreading and editing for the 2025 Ministry of Unification White Paper, an annual publication that provides an overview of the current state of inter-Korean relations and the ministry's efforts to promote peace and reunification on the Korean peninsula."
    },
    {
      client: "Seoul National University",
      yearLabel: "2022",
      description:
        "Translated and subtitled over fifteen hours of educational material for incoming foreign students as part of SNU's Korean Education Program for Foreigners for the Center of Korean Academics."
    }
  ];

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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-serif text-headline mb-6">Language Services</h1>
        <p className="text-lg text-paragraph mb-8">
          Professional language services including translation, localization, proofreading, editing and consulting.
        </p>

        <div className="space-y-12">
          {/* description of available services */}
          <section className="my-8">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-serif text-headline">
                <span className="block font-mono text-xs font-medium uppercase tracking-[0.4em] text-paragraph/70 mb-3">
                  What I offer
                </span>
                <span className="block text-4xl md:text-5xl font-bold tracking-tight leading-none">Services</span>
              </h2>
              <span className="hidden md:block font-mono text-xs text-paragraph/60 tracking-widest pb-1">
                ( 01 — 04 )
              </span>
            </div>

            <div className="mt-10">
              {services.map((service, i) => (
                <div
                  key={service.title}
                  className={`group relative border-t ${
                    i === services.length - 1 ? "border-b" : ""
                  } border-paragraph/15 ${
                    service.rowHover
                  } py-7 md:py-9 grid grid-cols-[auto_1fr] md:grid-cols-12 gap-x-5 gap-y-3 items-start transition-all duration-500 md:hover:pl-3 animate-in fade-in slide-in-from-bottom-4 animation-duration-[700ms] fill-mode-backwards`}
                  style={{ animationDelay: `${150 + i * 150}ms` }}>
                  <span className="font-mono text-xs text-paragraph/50 tracking-widest pt-2 md:pt-3 md:col-span-1">
                    {service.index}
                  </span>

                  <div className="md:col-span-5 flex items-center gap-4">
                    <span
                      className={`hidden md:flex w-12 h-12 shrink-0 items-center justify-center rounded-full border border-paragraph/25 text-headline transition-all duration-500 group-hover:rotate-360 ${service.iconHover}`}>
                      <service.icon className="w-5 h-5" stroke={1.5} />
                    </span>
                    <h3
                      className={`font-serif text-2xl md:text-3xl font-semibold tracking-tight text-headline transition-colors duration-300 ${service.titleHover}`}>
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
