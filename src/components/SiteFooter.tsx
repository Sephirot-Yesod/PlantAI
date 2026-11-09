import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { EmojiRowStrip } from "@/components/Decor";
import { StoreBadges } from "@/components/StoreBadges";
import { FEATURES } from "@/lib/features";
import {
  COMPANY,
  COMPANY_ADDRESS,
  DELETE_ACCOUNT_PATH,
  INSTAGRAM_URL,
  PLANTIEMOJI_MANUAL_URL,
  PLANTIEMOJI_URL,
  PRIVACY_PATH,
  SUPPORT_EMAIL,
  TERMS_PATH,
} from "@/lib/site";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

// Pages on this site use client navigation; redirect paths (/privacy, /terms,
// /delete-account) and external links are plain anchors.
const FEATURE_PATHS = new Set(FEATURES.map((f) => f.path));
const isPage = (href: string) =>
  href.startsWith("/#") || href.startsWith("/support") || href.startsWith("/guides") || FEATURE_PATHS.has(href);

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Features",
    links: FEATURES.map((f) => ({ label: f.label, href: f.path })),
  },
  {
    title: "App",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "What's new", href: "/#whats-new" },
      { label: "FAQs", href: "/#faq" },
      { label: "Plant care guides", href: "/guides" },
    ],
  },
  {
    title: "Plantiemoji",
    links: [
      { label: "Shop Plantiemoji", href: PLANTIEMOJI_URL },
      { label: "Setup guide", href: PLANTIEMOJI_MANUAL_URL },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "/support" },
      { label: "Contact us", href: "/support#contact" },
      { label: "Delete your account", href: DELETE_ACCOUNT_PATH },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: PRIVACY_PATH },
      { label: "Terms of Use", href: TERMS_PATH },
    ],
  },
];

// Footer from the Plantiemoji store design: lime block with rounded bottom corners,
// the row of emoji faces on white, then a slim legal bar.
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="rounded-b-[40px] bg-lime text-ink">
        <div className="wrap grid gap-12 pt-14 pb-16 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="max-w-md text-2xl leading-snug font-bold">
              Plantalk AI is free on iPhone, iPad and Android.
            </h2>
            <StoreBadges size="sm" className="mt-6" />
            <div className="mt-6 flex items-center gap-5">
              <a href={INSTAGRAM_URL} aria-label="Plantiemoji on Instagram" className="rounded-md hover:opacity-70">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-block py-2 text-sm font-semibold underline underline-offset-4">
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>

          {/* Three columns at most: at five, labels such as "Plant health check" wrapped. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-lg font-bold">{col.title}</h2>
                <ul className="mt-4 space-y-3 text-[15px] text-text">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {isPage(l.href) ? (
                        <Link href={l.href} className="hover:text-ink hover:underline">
                          {l.label}
                        </Link>
                      ) : (
                        <a href={l.href} className="hover:text-ink hover:underline">
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap pt-10 pb-4" aria-hidden="true">
        <EmojiRowStrip />
      </div>

      <div className="wrap space-y-1.5 pt-4 pb-8 text-[13px] leading-relaxed text-muted">
        <p>
          © {year} {COMPANY}, {COMPANY_ADDRESS.city}, Texas. All rights reserved.
        </p>
        {GA_MEASUREMENT_ID ? (
          <p>
            <CookieSettingsButton />
          </p>
        ) : null}
        <p>
          Apple, the Apple logo, iPhone and iPad are trademarks of Apple Inc., registered in the U.S. and other
          countries and regions. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are
          trademarks of Google LLC.
        </p>
      </div>
    </footer>
  );
}
