export default function Hero() {
  return (
    <section className="w-full pb-12">
      <div className="max-w-7xl px-4 mx-auto flex flex-col md:flex-row items-center gap-6">
        <div className="shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-br from-indigo-200 via-pink-100 to-amber-100 shadow-lg" />
        </div>

        <div className="flex-1 text-right">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-indigo-600 leading-tight">
            Hey, I&apos;m Will
          </h1>

          <div className="mt-4 space-y-2 text-lg md:text-xl leading-relaxed text-slate-700">
            <h5 className="font-bold">Fullstack Developer</h5>
            <p className="text-sm md:text-base text-slate-500 leading-0">
              Next.js, Node, TypeScript, Prisma, TailwindCSS, and more
            </p>
            <h5 className="font-bold mt-6">Translation and Editing</h5>
            <p className="text-sm md:text-base text-slate-500 leading-0">Korean, English</p>
            <h5 className="font-bold mt-6">Interpretation and Culture Professor</h5>
            <p className="text-sm md:text-base text-slate-500 leading-0">Seoul University of Foreign Studies</p>
          </div>
        </div>
      </div>
    </section>
  );
}
