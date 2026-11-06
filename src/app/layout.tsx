import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  APP_NAME,
  APP_STORE_ID,
  COMPANY,
  COMPANY_ADDRESS,
  META_DESCRIPTION,
  SITE_URL,
  SUPPORT_EMAIL,
} from "@/lib/site";
import "./globals.css";

// Poppins: the app's type and the Plantiemoji brand guide (Bold headings, Regular text).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Plantalk AI: AI Plant Care App for iPhone, iPad & Android",
    template: "%s · Plantalk AI",
  },
  description: META_DESCRIPTION,
  applicationName: APP_NAME,
  // Canonical URLs are set per page, so new pages never inherit the home page's.
  // Pages should not override openGraph: that drops the shared share image.
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    locale: "en_US",
    title: "Plantalk AI: your AI plant care companion",
    description: META_DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
  // Smart App Banner in Safari on iPhone and iPad.
  itunes: { appId: APP_STORE_ID },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#c2f277",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Plantalk",
  legalName: COMPANY,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  email: SUPPORT_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY_ADDRESS.street,
    addressLocality: COMPANY_ADDRESS.city,
    addressRegion: COMPANY_ADDRESS.region,
    postalCode: COMPANY_ADDRESS.postalCode,
    addressCountry: COMPANY_ADDRESS.country,
  },
  brand: [
    { "@type": "Brand", name: "Plantalk AI" },
    { "@type": "Brand", name: "Plantiemoji" },
  ],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: APP_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={organization} />
        <JsonLd data={website} />
        {/* Vercel Web Analytics only exists on Vercel (VERCEL=1 there). On Cloud Run its
            script URL 404s on every page, so it's left out. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
