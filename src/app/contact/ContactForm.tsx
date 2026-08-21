"use client";

import { useState, FormEvent } from "react";
import { IconCheck, IconSend, IconX } from "@tabler/icons-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = {
    name: formData.name.trim().length > 0,
    email: emailRegex.test(formData.email),
    message: formData.message.trim().length > 0
  };

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

      let data: { error?: string } = {};
      try {
        data = await response.json();
      } catch {
        // non-JSON response from server
      }

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to send message");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg bg-bg-200 border border-accent-100/20 p-8 text-center space-y-4">
        <h2 className="text-2xl font-semibold font-serif text-headline">Message Sent!</h2>
        <p className="text-paragraph">Thanks for reaching out. I&apos;ll get back to you as soon as I can.</p>
        <button
          onClick={() => setStatus("idle")}
          className="bg-button text-buttonText font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot: hidden from humans, filled by bots. The API silently
          accepts these without sending email. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
        />
      </div>
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
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            required
            aria-invalid={formData.email.length > 0 && !isValid.email}
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className="peer w-full pl-4 pr-10 py-3 bg-bg-200 border border-accent-100/20 rounded-lg text-paragraph focus:outline-none focus:ring-2 focus:ring-accent-100 focus:border-transparent"
            placeholder="your@email.com"
          />
          {formData.email.length > 0 &&
            (isValid.email ? (
              <IconCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent-100" stroke={2.5} aria-hidden="true" />
            ) : (
              <IconX className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" stroke={2.5} aria-hidden="true" />
            ))}
        </div>
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
            maxLength={500}
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            className="w-full px-4 py-3 bg-bg-200 border border-accent-100/20 rounded-lg text-paragraph focus:outline-none focus:ring-2 focus:ring-accent-100 focus:border-transparent resize-none"
            placeholder="Hey! I wanted to know more about..."
          />
          <p className="text-xs text-paragraph/40 mt-1.5 text-right tabular-nums">
            {formData.message.length} / 500
          </p>
      </div>

      {status === "error" && (
        <div className="rounded-lg bg-bg-200 border border-red-500/30 p-4 text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group w-full bg-button text-buttonText font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2.5">
        {status === "loading" ? (
          <>
            <IconSend className="w-4 h-4 animate-pulse" stroke={2} />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <IconSend className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" stroke={2} />
          </>
        )}
      </button>
    </form>
  );
}
