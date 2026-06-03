import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full pt-2 md:pt-4 pb-12 md:pb-16">
      <div className="mt-8 align-middle flex flex-col md:flex-row items-center gap-6">
        <div className="shrink-0">
          <Image
            width={300}
            height={300}
            className="rounded-full w-[270px] h-[270px] md:w-[300px] md:h-[300px]"
            src="/images/assets/avatar.png"
            alt="Will"
          />
        </div>

        <div className="flex-1 text-center md:text-right">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-accent-100 leading-tight font-serif mt-6 md:mt-0 mb-4 md:mb-0">
            Hey, I&apos;m Will.
          </h1>

          <div className="mt-4 space-y-4 md:space-y-2 text-lg md:text-xl leading-relaxed">
            <h5 className="text-base font-semibold text-headline">Fullstack Developer</h5>
            <p className="text-sm md:text-base text-paragraph leading-normal">
              Next.js, Node, TypeScript, Prisma, TailwindCSS, and{" "}
              <Link
                href="/dev"
                className="inline relative pb-1 text-link font-bold transition-colors after:absolute after:bottom-px after:-left-0.5 after:right-0 after:h-2 after:bg-accent-100/50 after:-z-10 font-serif">
                more
              </Link>
            </p>
            <h5 className="text-base font-semibold text-headline mt-6">Translation and Editing</h5>
            <p className="text-sm md:text-base text-paragraph leading-normal">Korean & English</p>
            <h5 className="text-base font-semibold text-headline mt-6">Adjunct Professor</h5>
            <p className="text-sm md:text-base text-paragraph leading-normal">
              Seoul University of Foreign Studies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
