"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { IconX } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

interface ProjectImageSliderProps {
  images: string[];
  title: string;
  fallback: string;
  variant?: "card" | "gallery";
}

const LIGHTBOX_ANIMATION_MS = 200;

type LightboxState = "closed" | "open" | "closing";

export default function ProjectImageSlider({
  images,
  title,
  fallback,
  variant = "card"
}: ProjectImageSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxState, setLightboxState] = useState<LightboxState>("closed");
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [fallback];
  const lightboxMounted = lightboxState !== "closed";
  const isGallery = variant === "gallery";

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const target = index * container.clientWidth;
    container.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  const openLightbox = useCallback((index: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setLightboxIndex(index);
    setLightboxState("open");
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxState((current) => {
      if (current === "closed" || current === "closing") return current;

      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }

      closeTimeoutRef.current = setTimeout(() => {
        setLightboxState("closed");
        closeTimeoutRef.current = null;
      }, LIGHTBOX_ANIMATION_MS);

      return "closing";
    });
  }, []);

  const stepLightboxImage = useCallback(
    (direction: -1 | 1) => {
      if (displayImages.length <= 1) return;

      setLightboxIndex((current) => {
        const next = (current + direction + displayImages.length) % displayImages.length;
        setActiveIndex(next);
        scrollToIndex(next);
        return next;
      });
    },
    [displayImages.length, scrollToIndex]
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || displayImages.length <= 1) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.clientWidth;
      if (slideWidth === 0) return;
      const newIndex = Math.round(scrollLeft / slideWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < displayImages.length) {
        setActiveIndex(newIndex);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeIndex, displayImages.length]);

  useEffect(() => {
    if (!lightboxMounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      if (lightboxState !== "open" || displayImages.length <= 1) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepLightboxImage(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        stepLightboxImage(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, displayImages.length, lightboxMounted, lightboxState, stepLightboxImage]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          "w-full rounded-sm",
          isGallery ? "mx-auto flex max-w-[900px] flex-col" : "relative h-64 md:h-full overflow-hidden"
        )}>
        <div
          className={cn(
            isGallery ? "relative h-[440px] overflow-hidden" : "relative h-full overflow-hidden"
          )}>
          <div
            ref={scrollRef}
            className={cn(
              "flex snap-x snap-mandatory no-scrollbar overflow-x-auto",
              isGallery ? "h-full w-full" : "h-full"
            )}>
            {displayImages.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => openLightbox(idx)}
                className={cn(
                  "group/slide shrink-0 w-full snap-center cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-100 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-200",
                  isGallery
                    ? "flex h-full items-center justify-center"
                    : "relative h-full"
                )}
                aria-label={`View ${title} image ${idx + 1} full size`}>
                {isGallery ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt={`${title} - image ${idx + 1}`}
                    draggable={false}
                    className="block h-auto w-auto max-h-[440px] max-w-[900px]"
                  />
                ) : (
                  <>
                    <Image src={src} alt={`${title} - image ${idx + 1}`} fill className="object-cover" />
                    <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-200 group-hover/slide:bg-black/10 group-focus-visible/slide:bg-black/10" />
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {displayImages.length > 1 && (
          <div
            className={cn(
              "flex items-center justify-center gap-3 px-3 py-2 rounded-full border border-accent-100/15 bg-bg-200/95 shadow-sm",
              isGallery
                ? "mx-auto mt-8 w-fit"
                : "absolute bottom-4 left-1/2 z-20 -translate-x-1/2"
            )}>
            {displayImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className={cn(
                  "h-4 w-4 cursor-pointer rounded-full border-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-100 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-200",
                  idx === activeIndex
                    ? "bg-accent-100 border-accent-100 shadow-[0_0_0_2px_rgba(0,0,0,0.15)]"
                    : "border-transparent bg-bg-100/70 hover:border-accent-100/60 hover:bg-bg-100"
                )}
                aria-label={`Go to image ${idx + 1}`}
                aria-current={idx === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {lightboxMounted && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image preview, ${lightboxIndex + 1} of ${displayImages.length}`}>
          <button
            type="button"
            onClick={closeLightbox}
            className={cn(
              "absolute inset-0 z-0 bg-black/80",
              lightboxState === "open" && "animate-in fade-in duration-200",
              lightboxState === "closing" && "animate-out fade-out duration-200"
            )}
            aria-label="Close image preview"
          />

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImages[lightboxIndex]}
              alt={`${title} - image ${lightboxIndex + 1}`}
              draggable={false}
              className="pointer-events-auto block h-auto w-auto max-h-[80vh] max-w-[80vw]"
            />
          </div>

          <button
            type="button"
            onClick={closeLightbox}
            className={cn(
              "absolute top-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
              lightboxState === "open" && "animate-in fade-in duration-200",
              lightboxState === "closing" && "animate-out fade-out duration-200"
            )}
            aria-label="Close image preview">
            <IconX className="h-5 w-5" stroke={2} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
