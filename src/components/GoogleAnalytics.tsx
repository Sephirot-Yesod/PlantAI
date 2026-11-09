"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_KEY, OPEN_SETTINGS_EVENT } from "@/lib/analytics";
import { PRIVACY_PATH } from "@/lib/site";

// Loads Google Analytics, shows the cookie banner and counts store-button clicks. The consent
// defaults themselves are set in <head> by consentBootstrap (lib/analytics.ts).

type Choice = "granted" | "denied";

// Time zones of the places where analytics cookies wait for consent (the EEA, the UK and
// Switzerland). Visitors there see the banner, and Google's script only loads once they accept.
// Consent Mode's IP-based regions still deny cookies for anyone the time zone misses.
const EUROPEAN_ZONES = [
  "Atlantic/Reykjavik",
  "Atlantic/Canary",
  "Atlantic/Madeira",
  "Atlantic/Azores",
  "Atlantic/Faroe",
  "Arctic/Longyearbyen",
];

function inEurope() {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    return zone.startsWith("Europe/") || EUROPEAN_ZONES.includes(zone);
  } catch {
    return false;
  }
}

function savedChoice(): Choice | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function gtag(...args: unknown[]) {
  (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(...args);
}

// Google Analytics keeps its cookies (_ga and _ga_<id>) on the site's top domain.
function clearAnalyticsCookies() {
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const domain of ["", `; domain=.${location.hostname}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

// Which store a link leads to, for the store_click event. /download sends each phone to its
// own store; /downloads/*.apk is the Android app file offered at /android.
function storeOf(link: HTMLAnchorElement) {
  const url = new URL(link.href, location.href);
  if (url.hostname === "apps.apple.com") return "app_store";
  if (url.hostname === "play.google.com") return "google_play";
  if (url.origin === location.origin && url.pathname === "/download") return "download_link";
  if (url.origin === location.origin && /^\/downloads\/[^/]+\.apk$/.test(url.pathname)) return "android_apk";
  return null;
}

export function GoogleAnalytics({ id }: { id: string }) {
  const [load, setLoad] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    // Read on the client only: the server can't see the visitor's choice or time zone.
    const choice = savedChoice();
    const europe = inEurope();
    if (choice === "granted" || (choice === null && !europe)) setLoad(true);
    if (choice === null && europe) setBannerOpen(true);

    const openSettings = () => setBannerOpen(true);
    const countStoreClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const store = storeOf(link);
      if (store) gtag("event", "store_click", { store, link_url: link.href });
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    document.addEventListener("click", countStoreClick, { capture: true });
    return () => {
      window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
      document.removeEventListener("click", countStoreClick, { capture: true });
    };
  }, []);

  const decide = (choice: Choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // Private browsing can block storage; the choice then lasts for this page only.
    }
    gtag("consent", "update", { analytics_storage: choice });
    if (choice === "granted") setLoad(true);
    else clearAnalyticsCookies();
    setBannerOpen(false);
  };

  return (
    <>
      {load && <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />}
      {bannerOpen && (
        <section
          aria-label="Cookie choice"
          className="fixed inset-x-3 bottom-3 z-50 rounded-card bg-white p-5 text-sm text-text shadow-[0_18px_40px_-16px_rgb(20_30_15/0.45)] ring-1 ring-black/[0.06] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[440px]"
        >
          <p className="font-bold text-ink">Can we count your visit?</p>
          <p className="mt-1.5 leading-relaxed">
            With your OK, Google Analytics sets cookies so we can see which pages help people find the app. We
            don&apos;t use them for ads.{" "}
            <a href={PRIVACY_PATH} className="prose-link">
              Privacy policy
            </a>
          </p>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={() => decide("granted")} className="btn btn-sm btn-black">
              Accept
            </button>
            <button type="button" onClick={() => decide("denied")} className="btn btn-sm btn-white">
              Reject
            </button>
          </div>
        </section>
      )}
    </>
  );
}
