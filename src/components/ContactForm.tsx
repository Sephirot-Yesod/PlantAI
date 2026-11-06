"use client";

import { useState, type FormEvent } from "react";
import { LIMITS, TOPICS } from "@/lib/contact";
import { PRIVACY_PATH, SUPPORT_EMAIL } from "@/lib/site";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

const inputClass =
  "mt-2 block w-full rounded-chip border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-2 focus:ring-lime";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "We couldn't send your message.");
      form.reset();
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : undefined });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="rounded-card bg-pale p-8">
        <h3 className="text-xl font-bold">Thanks, your message is on its way</h3>
        <p className="mt-2">We&apos;ll reply to the email address you gave us.</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="btn btn-black mt-6">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm font-semibold">
            Your name
          </label>
          <input
            id="cf-name"
            name="name"
            required
            maxLength={LIMITS.name}
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={LIMITS.email}
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-topic" className="text-sm font-semibold">
          Topic
        </label>
        <select id="cf-topic" name="topic" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Choose a topic
          </option>
          {Object.entries(TOPICS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="text-sm font-semibold">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          maxLength={LIMITS.message}
          className={inputClass}
          placeholder="Tell us what's happening. For app problems, include your phone model and app version."
        />
      </div>

      {/* Spam trap, hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm text-muted">
        We&apos;ll use your details to reply to you. See our{" "}
        <a href={PRIVACY_PATH} className="prose-link">
          privacy policy
        </a>
        .
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status.state === "sending"} className="btn btn-black caret disabled:opacity-60">
          {status.state === "sending" ? "Sending…" : "Send message"}
        </button>
        <p aria-live="polite" className="text-sm">
          {status.state === "error" && (
            <span className="font-semibold text-[#9b1c1c]">
              {status.message || "We couldn't send your message."} You can also email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">
                {SUPPORT_EMAIL}
              </a>
              .
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
