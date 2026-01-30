export default function Header() {
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl font-bold tracking-tight text-indigo-600 leading-tight">Hi, I&apos;m Will</h1>

      <div className="mt-1 space-y-1 md:space-y-2 text-sm md:text-base leading-relaxed text-slate-700">
        <div className="font-semibold">Fullstack Developer</div>
        <div className="font-medium">KR‑EN Translator</div>
        <div className="font-medium">Professor, Seoul University of Foreign Studies</div>
        <div className="text-xs md:text-sm text-slate-500">Seoul · wjbeast@gmail.com</div>
      </div>
    </div>
  );
}
