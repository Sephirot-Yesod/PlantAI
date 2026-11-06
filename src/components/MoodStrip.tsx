"use client";

import { useState } from "react";
import { Emoji, type Face } from "@/components/Decor";

// The mood strip under the hero, as on the Plantiemoji store. Labels are the status
// tags Plantalk AI shows on plant cards; faces follow the store's own legend
// (orange = thirsty, purple = uncomfortable, teal = happy).
const MOODS: { face: Face; label: string; quote: string; action: string }[] = [
  { face: "orange", label: "Too dry!", quote: "My soil is drying out.", action: "Water me today" },
  { face: "purple", label: "Mild issues", quote: "Something feels a little off.", action: "Check my visual health" },
  { face: "teal", label: "Healthy!", quote: "I'm happy here, everything is on target.", action: "Keep your routine" },
];

export function MoodStrip() {
  const [active, setActive] = useState(2);
  const m = MOODS[active];
  return (
    <div className="relative z-10 mx-auto -mt-[92px] w-full max-w-[560px] px-5">
      <div className="rounded-t-[48px] bg-white px-4 pt-5 pb-2 sm:px-8">
        <div role="group" aria-label="Example plant moods" className="flex items-start justify-around gap-2">
          {MOODS.map((mood, i) => {
            const on = i === active;
            return (
              <button
                key={mood.label}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(i)}
                className="group flex w-28 flex-col items-center gap-2 rounded-2xl p-1"
              >
                <Emoji
                  face={mood.face}
                  size={56}
                  className={`transition-all duration-300 ${on ? "scale-110 drop-shadow-md" : "opacity-45 saturate-[0.8] group-hover:opacity-80"}`}
                />
                <span className={`text-sm ${on ? "font-bold text-ink" : "text-muted"}`}>{mood.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <p aria-live="polite" className="mt-3 text-center text-[15px] text-text">
        &ldquo;{m.quote}&rdquo; <strong className="block font-bold text-ink sm:inline">{m.action}</strong>
      </p>
    </div>
  );
}
