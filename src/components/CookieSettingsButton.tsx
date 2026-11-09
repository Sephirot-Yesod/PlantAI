"use client";

import { OPEN_SETTINGS_EVENT } from "@/lib/analytics";

// Reopens the cookie banner (components/GoogleAnalytics.tsx) so anyone can change their choice.
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className="inline-block py-1.5 underline decoration-ink/30 underline-offset-2 hover:text-ink"
    >
      Cookie settings
    </button>
  );
}
