"use client";

import { useEffect, useRef, useState } from "react";

interface ExperienceItem {
  client: string;
  yearLabel: string;
  description: string;
}

interface YearGroup {
  year: string;
  items: ExperienceItem[];
}

interface ExperienceTimelineProps {
  groups: YearGroup[];
}

export default function ExperienceTimeline({ groups }: ExperienceTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeYear, setActiveYear] = useState(groups[0]?.year ?? "");

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const readingLine = window.innerHeight * 0.5;
      const sectionRect = sectionRef.current.getBoundingClientRect();

      const rawProgress = (readingLine - sectionRect.top) / sectionRect.height;
      const clampedProgress = Math.min(1, Math.max(0, rawProgress));
      setProgress(clampedProgress);

      let activeIndex = -1;
      for (let i = 0; i < groupRefs.current.length; i++) {
        const ref = groupRefs.current[i];
        if (!ref) continue;
        const rect = ref.getBoundingClientRect();
        if (rect.top <= readingLine && rect.bottom > readingLine) {
          activeIndex = i;
          break;
        }
      }

      if (activeIndex !== -1) {
        setActiveYear(groups[activeIndex].year);
      } else if (rawProgress <= 0) {
        setActiveYear(groups[0]?.year ?? "");
      } else if (rawProgress >= 1) {
        setActiveYear(groups[groups.length - 1]?.year ?? "");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [groups]);

  return (
    <div ref={sectionRef} className="relative">
      {/* Desktop Timeline */}
      <div className="hidden md:block">
        {/* Rail */}
        <div className="absolute left-0 top-0 bottom-0 w-20">
          {/* Permanent lowered opacity track */}
          <div className="absolute top-0 bottom-0 left-1 w-0.5 -translate-x-1/2 bg-accent-100/40" />

          {/* Active fill */}
          <div
            className="absolute top-0 left-1 w-1 -translate-x-1/2 bg-accent-100 rounded-full transition-all duration-300 ease-out"
            style={{ height: `${progress * 100}%` }}
          />

          {/* Year pill at the tip */}
          <div
            className="absolute left-3 bg-bg-200 text-headline text-sm font-bold px-2 py-0.5 rounded-full whitespace-nowrap z-10 -translate-y-1/2 transition-all duration-300 ease-out"
            style={{ top: `${progress * 100}%` }}
          >
            {activeYear}
          </div>
        </div>

        {/* Content */}
        <div className="pl-20">
          {groups.map((group, groupIndex) => (
            <div
              key={group.year}
              ref={(el) => {
                groupRefs.current[groupIndex] = el;
              }}
              className="pb-12 last:pb-0"
            >
              <ul className="space-y-4">
                {group.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="first:mt-8">
                    <p className="font-bold text-headline">
                      {item.client}{" "}
                      <span className="text-accent-100 text-sm ml-1">
                        {item.yearLabel}
                      </span>
                    </p>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Fallback */}
      <div className="md:hidden">
        {groups.map((group) => (
          <div key={group.year} className="mb-8">
            <ul className="space-y-4">
              {group.items.map((item, itemIndex) => (
                <li key={itemIndex} className="">
                  <p className="font-bold text-headline">
                    {item.client}{" "}
                    {itemIndex === 0 ? (
                      <span className="text-accent-100 text-sm ml-1">
                        {group.year}
                      </span>
                    ) : (
                      <span className="text-accent-100 text-sm ml-1">
                        {item.yearLabel}
                      </span>
                    )}
                  </p>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
