export default function LanguageServicesPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-16">
        <h1 className="text-5xl font-bold text-headline mb-6">Language Services</h1>
        <p className="text-lg text-paragraph mb-8">
          Professional language services including translation, localization, and consulting.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-semibold text-headline mb-4">Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-bg200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-headline mb-2">Translation</h3>
                <p className="text-paragraph">High-quality translation services for technical and creative content.</p>
              </div>
              <div className="bg-bg200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-headline mb-2">Localization</h3>
                <p className="text-paragraph">Adapt your content for global markets with cultural sensitivity.</p>
              </div>
              <div className="bg-bg200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-headline mb-2">Consulting</h3>
                <p className="text-paragraph">Strategic guidance for international content and communications.</p>
              </div>
              <div className="bg-bg200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-headline mb-2">More Info</h3>
                <p className="text-paragraph">Contact me to discuss your language needs and project requirements.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
