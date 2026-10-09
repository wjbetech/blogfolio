import Image from "next/image";
import Link from "next/link";

type Entry = { href: string; title: string; description: string; image: string };

export default function CompactCard({ entry, className = "", divider = true }: { entry: Entry; className?: string; divider?: boolean }) {
  return <Link href={entry.href} className={`group block min-w-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-100 ${className}`}>
    <article className={`flex h-52 items-start gap-4 pb-6 ${divider ? "border-b border-paragraph/20" : ""}`}>
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg bg-bg-200">
        <Image src={entry.image || "/images/assets/placeholder.png"} alt="" fill sizes="96px" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 self-stretch flex-col gap-3">
        <h3 className="line-clamp-4 shrink-0 font-serif text-lg font-semibold leading-snug tracking-tight text-headline group-hover:underline decoration-accent-100/60 underline-offset-4">{entry.title}</h3>
        <p className="line-clamp-3 shrink-0 text-sm leading-relaxed text-paragraph">{entry.description}</p>
      </div>
    </article>
  </Link>;
}
