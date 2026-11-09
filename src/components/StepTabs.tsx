"use client";

import type { StaticImageData } from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { Emoji, type Face } from "@/components/Decor";
import { Phone } from "@/components/Phone";

export type Step = {
  act: string;
  title: string;
  body: string;
  screen: StaticImageData;
  alt: string;
  faces: [Face, Face];
  /** CSS background for this step's panel. */
  tint: string;
};

// "Act I / II / III" switch from the Plantiemoji product page, showing the app
// screen for each step. Keyboard: arrow keys move between tabs.
export function StepTabs({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + steps.length) % steps.length;
    setActive(next);
    refs.current[next]?.focus();
  };
  const s = steps[active];
  return (
    <div>
      <div
        id="step-panel"
        role="tabpanel"
        aria-labelledby={`step-tab-${active}`}
        style={{ background: s.tint }}
        className="relative mx-auto flex h-[440px] max-w-[920px] items-end justify-center overflow-hidden rounded-card transition-[background] duration-500 sm:h-[500px]"
      >
        <div className="absolute -bottom-[38%] left-1/2 h-[118%] w-[62%] -translate-x-1/2 rounded-full bg-white/50" />
        <Emoji key={`a${active}`} face={s.faces[0]} size={72} className="absolute top-10 left-[9%] -rotate-12 drop-shadow-md sm:left-[16%]" />
        <Emoji key={`b${active}`} face={s.faces[1]} size={54} className="absolute top-24 right-[9%] rotate-6 drop-shadow-md sm:right-[17%]" />
        <Phone
          key={active}
          src={s.screen}
          alt={s.alt}
          className="relative w-[220px] translate-y-[14%] sm:w-[262px]"
          sizes="(min-width: 640px) 242px, 203px"
        />
      </div>

      <div
        role="tablist"
        aria-label="How Plantalk AI works"
        onKeyDown={onKey}
        className="relative z-10 mx-auto -mt-8 flex w-fit gap-1 rounded-[20px] bg-white p-1.5 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.25)] ring-1 ring-ink/5"
      >
        {steps.map((step, i) => {
          const on = i === active;
          return (
            <button
              key={step.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`step-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="step-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`flex min-w-[88px] flex-col items-center rounded-[14px] px-4 py-2 transition-colors sm:min-w-[104px] ${
                on ? "bg-ink text-white" : "text-text hover:bg-tile"
              }`}
            >
              <span className={`text-xs ${on ? "text-white/80" : "text-muted"}`}>{step.act}</span>
              <span className="text-sm font-bold">{step.title}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="t-small mx-auto mt-5 max-w-xl text-center text-[15px]">
        {s.body}
      </p>
    </div>
  );
}
