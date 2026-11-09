"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

// The header's menu below 1024 px, where the centred nav is hidden. A button opens a panel
// under the header bar; a link, Escape or the button again closes it.
export function MobileMenu({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-tile"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          )}
        </svg>
      </button>
      <nav
        id={panelId}
        aria-label="Menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_18px_30px_-20px_rgb(20_30_15/0.35)]"
      >
        <ul className="wrap py-2">
          {items.map((item) => (
            <li key={item.href} className="border-b border-line/70 last:border-0">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-13 items-center text-lg font-bold text-ink hover:underline hover:underline-offset-8"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
