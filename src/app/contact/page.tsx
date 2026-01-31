export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto py-16">
        <h1 className="text-5xl font-bold text-headline mb-6">Get in Touch</h1>
        <p className="text-lg text-paragraph mb-12">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you.
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-headline mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 bg-bg200 border border-accent2/20 rounded-lg text-paragraph focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-headline mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 bg-bg200 border border-accent2/20 rounded-lg text-paragraph focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-headline mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="w-full px-4 py-3 bg-bg200 border border-accent2/20 rounded-lg text-paragraph focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-buttonText font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
            Send Message
          </button>
        </form>

        <div className="mt-12 pt-12 border-t border-accent2/20">
          <h2 className="text-2xl font-semibold text-headline mb-4">Other Ways to Connect</h2>
          <div className="space-y-3 text-paragraph">
            <p>
              Email:{" "}
              <a href="mailto:hello@williameast.com" className="text-accent hover:underline">
                hello@williameast.com
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/wjbetech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline">
                @wjbetech
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/williameast"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline">
                William East
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
