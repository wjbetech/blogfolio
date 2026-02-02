import { getChangelogEntries } from "@/lib/changelog/entryParser";
import ChangelogEntry from "@/components/ChangelogEntry/ChangelogEntry";

export default function DevPage() {
  const entries = getChangelogEntries();
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2 text-headline">Changelog</h1>
      <p className="text-paragraph mb-8">Track all updates, improvements, and fixes to the application.</p>

      <div className="space-y-6">
        {entries.map((entry, idx) => (
          <ChangelogEntry key={`${entry.date}-${idx}`} entry={entry} />
        ))}
      </div>

      {entries.length === 0 && <p className="text-center text-paragraph/50 py-12">No changelog entries yet.</p>}
    </div>
  );
}
