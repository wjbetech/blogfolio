"use client";

import { useState, FormEvent } from "react";
import TrackedLink from "@/components/Analytics/TrackedLink";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to send message");
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto py-16">
        <h1 className="text-4xl font-bold font-serif text-headline mb-6">Get in Touch</h1>
        <p className="text-lg text-paragraph mb-12">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you.
        </p>

        {status === "success" ? (
          <div className="rounded-lg bg-bg-200 border border-accent-100/20 p-8 text-center space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-headline">Message Sent!</h2>
            <p className="text-paragraph">Thanks for reaching out. I&apos;ll get back to you as soon as I can.</p>
            <button
              onClick={() => setStatus("idle")}
              className="bg-button text-buttonText font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-headline mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-bg-200 border border-accent-100/20 rounded-lg text-paragraph focus:outline-none focus:ring-2 focus:ring-accent-100 focus:border-transparent"
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
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-bg-200 border border-accent-100/20 rounded-lg text-paragraph focus:outline-none focus:ring-2 focus:ring-accent-100 focus:border-transparent"
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
                required
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 bg-bg-200 border border-accent-100/20 rounded-lg text-paragraph focus:outline-none focus:ring-2 focus:ring-accent-100 focus:border-transparent resize-none"
                placeholder="Hey! I wanted to know more about..."
              />
            </div>

            {status === "error" && (
              <div className="rounded-lg bg-bg-200 border border-red-500/30 p-4 text-red-400 text-sm">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-button text-buttonText font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}

        <div className="mt-12 pt-12 border-t border-accent-100/20">
          <h2 className="text-2xl font-semibold font-serif text-headline mb-4">Other Ways to Connect</h2>
          <div className="space-y-3 text-paragraph">
            <p>
              Email:{" "}
              <TrackedLink
                href="mailto:hello@williameast.com"
                className="text-accent-200 hover:underline"
                eventName="Contact Click"
                eventProps={{ surface: "contact_email", target: "mailto" }}>
                wjbetech@gmail.com
              </TrackedLink>
            </p>
            <p>
              GitHub:{" "}
              <TrackedLink
                href="https://github.com/wjbetech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-200 hover:underline"
                eventName="Contact Click"
                eventProps={{ surface: "contact_github", target: "github" }}>
                @wjbetech
              </TrackedLink>
            </p>
            <p>
              LinkedIn:{" "}
              <TrackedLink
                href="https://linkedin.com/in/wjbetech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-200 hover:underline"
                eventName="Contact Click"
                eventProps={{ surface: "contact_linkedin", target: "linkedin" }}>
                William East
              </TrackedLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
