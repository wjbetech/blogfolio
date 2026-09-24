"use client";
import Image from "next/image";
import { useState } from "react";

type Pairing = { id: string; name: string; headingName: string; bodyName: string; headingClass: string; bodyClass: string; note: string };

export default function FontPairingPlayground({ pairings }: { pairings: Pairing[] }) {
  const [selectedId, setSelectedId] = useState(pairings[0]?.id ?? "");
  const selected = pairings.find((pairing) => pairing.id === selectedId) ?? pairings[0];
  if (!selected) return null;

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:pt-12">
      <header className="mb-8 border-b border-palette-border/60 pb-7 sm:mb-10 sm:pb-9">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paragraph/65">
          <span>Blogfolio type study</span><span aria-hidden="true" className="text-accent-200">/</span><span>Developer × translator</span>
        </div>
        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-[1.04] tracking-tight text-headline sm:text-5xl lg:text-6xl">Two disciplines. One clear voice.</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-paragraph sm:text-lg">Compare three heading and paragraph pairings against the same homepage introduction. The work stays constant; only the type changes.</p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-8">
        <aside className="rounded-2xl border border-palette-border/70 bg-bg-200/60 p-4 sm:p-5">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div><h2 className="text-sm font-semibold text-headline">Choose a pairing</h2><p className="mt-1 text-xs leading-5 text-paragraph/70">Same copy, different character.</p></div>
            <span aria-hidden="true" className="font-mono text-[11px] text-accent-200">Aa · {} · 한</span>
          </div>
          <div role="group" aria-label="Font pairings" className="grid gap-2">
            {pairings.map((pairing) => {
              const isSelected = pairing.id === selected.id;
              return (
                <button key={pairing.id} type="button" aria-pressed={isSelected} onClick={() => setSelectedId(pairing.id)}
                  className={"w-full rounded-xl border px-3.5 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-100 " + (isSelected ? "border-accent-200/70 bg-bg-100 shadow-sm" : "border-transparent bg-transparent hover:border-palette-border/70 hover:bg-bg-100/70")}>
                  <span className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-headline">{pairing.name}</span><span aria-hidden="true" className={"h-2 w-2 rounded-full " + (isSelected ? "bg-accent-200" : "bg-paragraph/20")} /></span>
                  <span className="mt-1.5 block text-xs leading-5 text-paragraph/70">{pairing.headingName} + {pairing.bodyName}</span>
                  <span className="mt-2 block" aria-hidden="true">
                    <span className={"block text-xl leading-tight text-headline " + pairing.headingClass}>Ag · 01</span>
                    <span className={"mt-1 block text-xs leading-5 text-paragraph/75 " + pairing.bodyClass}>Clear words, careful code.</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 border-t border-palette-border/60 pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paragraph/55">Selected direction</p>
            <p className="mt-2 text-sm leading-6 text-paragraph">{selected.note}</p>
          </div>
        </aside>

        <section aria-label={selected.name + " homepage mockup"} className="min-w-0 overflow-hidden rounded-2xl border border-palette-border/70 bg-bg-100 shadow-lg shadow-black/5">
          <div className="grid min-h-12 grid-cols-[1fr_auto] items-center gap-3 border-b border-palette-border/60 bg-bg-200/60 px-4 sm:grid-cols-[1fr_minmax(10rem,20rem)_1fr] sm:px-6">
            <div className="flex items-center gap-2.5"><span className="flex gap-1.5" aria-hidden="true"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span><span className="font-semibold text-xs text-headline">William East</span></div>
            <div className="hidden h-7 items-center justify-center rounded-md border border-palette-border/55 bg-bg-100/80 px-3 font-mono text-[9px] text-paragraph/55 sm:flex">staging.wjbeast.com/</div>
            <span className="justify-self-end font-mono text-[10px] text-headline">Home</span>
            <div className="col-span-2 -mt-1 pb-2 font-mono text-[9px] text-paragraph/50 sm:hidden">staging.wjbeast.com/</div>
          </div>

          <div className="px-5 py-6 sm:px-8 sm:py-9 lg:px-10 lg:py-11">
            <div className="mb-8 flex items-center justify-between border-b border-palette-border/60 pb-4">
              <span className="font-serif text-base font-bold tracking-tight text-headline">William East</span>
              <nav aria-label="Preview navigation" className="flex gap-3 font-mono text-[9px] uppercase tracking-[0.1em] text-paragraph/65 sm:gap-5 sm:text-[10px]"><span className="text-headline">Home</span><span>Dev</span><span>Language</span><span>Blog</span></nav>
            </div>
            <div className="grid items-center gap-6 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
              <div className="flex items-center gap-4 sm:block">
                <Image src="/images/assets/avatar.png" width={160} height={160} alt="Portrait of Will" className="h-20 w-20 rounded-full object-cover ring-1 ring-palette-border sm:h-32 sm:w-32 lg:h-40 lg:w-40" />
                <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.13em] text-paragraph/60 sm:mt-4">Seoul, Korea<br />EN ↔ KO</p>
              </div>
              <div className="min-w-0">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.19em] text-accent-200">Software · Language · Teaching</p>
                <h2 className={"text-4xl font-bold leading-[1.03] tracking-tight text-headline sm:text-5xl lg:text-6xl " + selected.headingClass}>Hey, I’m Will.</h2>
                <p className={"mt-5 max-w-2xl text-base leading-7 text-paragraph sm:text-lg sm:leading-8 " + selected.bodyClass}>I build thoughtful software and help ideas travel clearly between Korean and English. From full-stack products to editing and translation, I care about how things work and how they read.</p>
                <div className="mt-6 flex flex-wrap gap-3"><span className="rounded-full bg-button px-4 py-2 text-sm font-semibold text-buttonText">Explore development</span><span className="rounded-full border border-palette-border px-4 py-2 text-sm font-semibold text-headline">Language services</span></div>
              </div>
            </div>
            <div className="mt-9 grid gap-3 border-t border-palette-border/60 pt-5 sm:grid-cols-2 sm:gap-5">
              <div className="rounded-xl bg-bg-200/55 p-4 sm:p-5"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-200">Development</p><h3 className={"mt-2 text-xl font-semibold leading-tight text-headline " + selected.headingClass}>Products with a point of view.</h3><p className={"mt-2 text-sm leading-6 text-paragraph " + selected.bodyClass}>Full-stack applications, AI systems, and small tools built around real problems.</p></div>
              <div className="rounded-xl bg-bg-200/55 p-4 sm:p-5"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-200">Translation &amp; editing</p><h3 className={"mt-2 text-xl font-semibold leading-tight text-headline " + selected.headingClass}>Meaning, carried with care.</h3><p className={"mt-2 text-sm leading-6 text-paragraph " + selected.bodyClass}>Korean ↔ English translation, editing, and proofreading for clear communication.</p></div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
