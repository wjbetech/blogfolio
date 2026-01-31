export default function DevPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-16">
        <h1 className="text-5xl font-bold text-headline mb-6">Dev Projects</h1>
        <p className="text-lg text-paragraph mb-8">
          A collection of my development work, experiments, and open source contributions.
        </p>

        <div className="grid gap-8">
          {/* Projects will go here */}
          <div className="border border-accent2/20 rounded-lg p-6 hover:border-accent2 transition-colors">
            <h2 className="text-2xl font-semibold text-headline mb-2">Projects Coming Soon</h2>
            <p className="text-paragraph">Development projects will be showcased here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
