import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full pb-12">
      <div className="max-w-7xl mx-auto align-middle flex flex-col md:flex-row items-center gap-6">
        <div className="shrink-0">
          <Image width={300} height={300} className="rounded-full" src="/images/wjbe.png" alt="Will" />
        </div>

        <div className="flex-1 text-right">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-accent-100 leading-tight font-serif">
            Hey, I&apos;m Will.
          </h1>

          <div className="mt-4 space-y-2 text-lg md:text-xl leading-relaxed">
            <h5 className="font-bold text-headline">Fullstack Developer</h5>
            <p className="text-sm md:text-base text-paragraph leading-0">
              Next.js, Node, TypeScript, Prisma, TailwindCSS, and{" "}
              <Link
                href="/dev"
                className="relative pb-1 text-link font-bold transition-colors after:absolute after:bottom-px after:-left-0.5 after:right-0 after:h-2 after:bg-accent-100/50 after:-z-10 font-serif">
                more
              </Link>
            </p>
            <h5 className="font-bold text-headline mt-6">Translation and Editing</h5>
            <p className="text-sm md:text-base text-paragraph leading-0">Korean & English</p>
            <h5 className="font-bold text-headline mt-6">Adjunct Professor</h5>
            <p className="text-sm md:text-base text-paragraph leading-0">Seoul University of Foreign Studies</p>
          </div>
        </div>
      </div>
    </section>
  );
}
