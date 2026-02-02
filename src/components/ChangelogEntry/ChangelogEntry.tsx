import type { ChangelogEntry } from "@/app/types/changelog";

export default function ChangelogEntry({ entry }: { entry: ChangelogEntry }) {
  const formattedDate = new Date(entry.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <article className="border-l-4 border-accent-300/50 pl-4 py-2">
      <header className="mb-2">
        <time className="text-sm text-paragraph/70" dateTime={entry.date}>
          {formattedDate}
        </time>
        <span className="ml-2 text-xs font-mono text-headline">v{entry.version}</span>
      </header>

      <ul className="space-y-1">
        {entry.changes.map((change, index) => (
          <li key={index} className="flex gap-2">
            <span className="text-paragraph font-semibold">{change.category}:</span>
            <span className="text-paragraph">{change.description}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
