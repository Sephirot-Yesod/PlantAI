"use client";

import { useState } from "react";

type Message = { text: string; link: { label: string; href: string } };

// Lime announcement bar with arrows, as on the Plantiemoji store. It only changes
// when someone presses an arrow (no auto-rotation).
export function AnnouncementBar({ messages }: { messages: Message[] }) {
  const [i, setI] = useState(0);
  const go = (step: number) => setI((n) => (n + step + messages.length) % messages.length);
  const m = messages[i];
  return (
    <div className="bg-lime text-ink">
      <div className="wrap flex min-h-11 items-center justify-between gap-2 py-1.5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous announcement"
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full hover:bg-lime-2 md:ml-[14%]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p aria-live="polite" className="text-center text-[13px] leading-snug sm:text-sm">
          {m.text}{" "}
          <a href={m.link.href} className="font-semibold underline underline-offset-2 hover:no-underline">
            {m.link.label}
          </a>
        </p>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next announcement"
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full hover:bg-lime-2 md:mr-[14%]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
