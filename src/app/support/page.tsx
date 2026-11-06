import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Emoji } from "@/components/Decor";
import { Icon, type IconName } from "@/components/Icon";
import {
  COMPANY,
  COMPANY_ADDRESS,
  DELETE_ACCOUNT_PATH,
  PLANTIEMOJI_MANUAL_URL,
  SUPPORT_EMAIL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Help with Plantalk AI: getting started, connecting a Plantiemoji sensor, subscriptions, deleting your account and contacting the team.",
  alternates: { canonical: "/support" },
};

// Pastel card with the matching saturated icon circle, as on the home page.
const TONES = {
  mint: ["bg-mint", "bg-lime"],
  sky: ["bg-sky", "bg-sky-2"],
  sun: ["bg-sun", "bg-sun-2"],
  blush: ["bg-blush", "bg-blush-2"],
} as const;

function HelpCard({
  icon,
  title,
  tone,
  children,
}: {
  icon: IconName;
  title: string;
  tone: keyof typeof TONES;
  children: React.ReactNode;
}) {
  const [card, dot] = TONES[tone];
  return (
    <article className={`rounded-card p-7 sm:p-8 ${card}`}>
      <span className={`flex h-12 w-12 items-center justify-center rounded-full ${dot}`}>
        <Icon name={icon} />
      </span>
      <h2 className="h-card mt-5">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed">{children}</div>
    </article>
  );
}

export default function SupportPage() {
  return (
    <>
      <section className="hero-sky rounded-b-[32px] md:rounded-b-[48px]">
        <div className="wrap flex flex-col items-center pt-14 pb-14 text-center md:pt-20 md:pb-20">
          <Emoji face="teal" size={72} className="drop-shadow-md" />
          <h1 className="h-hero mt-6">
            How can we <span className="hl">help?</span> <span aria-hidden="true" className="font-normal">🌱</span>
          </h1>
          <p className="t-body mt-4 max-w-2xl">
            Quick answers for Plantalk AI, and a direct line to the team when you need more.
          </p>
        </div>
      </section>

      <section aria-label="Help topics" className="wrap pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="grid gap-5 md:grid-cols-2">
          <HelpCard icon="sprout" title="Getting started" tone="mint">
            <ol className="list-decimal space-y-2 pl-5">
              <li>Open the app and sign in, or continue as a guest.</li>
              <li>Tap + on the Plants screen and take or choose a photo of your plant.</li>
              <li>Check what Plantalk AI detected, then save the plant to create its profile.</li>
              <li>
                Open the plant for its Overview, Environment and Visual health views, and check Care for
                today&apos;s tasks.
              </li>
            </ol>
          </HelpCard>

          <HelpCard icon="bluetooth" title="Connect a Plantiemoji sensor" tone="sky">
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Turn on Bluetooth and allow Plantalk AI to use it. Have your 2.4 GHz Wi-Fi name and password
                ready: the sensor can&apos;t join a 5 GHz-only network.
              </li>
              <li>Add the plant in the app first.</li>
              <li>
                Attach the emoji display to the sensor, place it in the pot and keep it on USB power during
                setup.
              </li>
              <li>
                In the app, open device setup, choose Plantiemoji, enter your Wi-Fi details, then pick the plant
                to link it to.
              </li>
            </ol>
            <p>
              Once it&apos;s linked, the plant&apos;s page shows light, temperature, humidity, air pressure and soil
              moisture. Keep your phone, the sensor and your router close together while you set up.
            </p>
            <p>
              For charging and troubleshooting, see the{" "}
              <a href={PLANTIEMOJI_MANUAL_URL} className="prose-link">
                Plantiemoji user manual
              </a>
              .
            </p>
          </HelpCard>

          <HelpCard icon="lock" title="Subscriptions and billing" tone="sun">
            <p>
              Pro access is billed by Apple or Google, so you change or cancel it in your store account:
            </p>
            <ul className="space-y-1.5">
              <li>
                <a href="https://apps.apple.com/account/subscriptions" className="prose-link">
                  Manage subscriptions on the App Store
                </a>
              </li>
              <li>
                <a href="https://play.google.com/store/account/subscriptions" className="prose-link">
                  Manage subscriptions on Google Play
                </a>
              </li>
            </ul>
            <p>New phone? Sign in with the same account and restore your purchase in the app.</p>
          </HelpCard>

          <HelpCard icon="trash" title="Delete your account" tone="blush">
            <p>
              In the app, sign in, open the side menu on the home screen and choose Delete Account. Can&apos;t sign
              in? Email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="prose-link">
                {SUPPORT_EMAIL}
              </a>{" "}
              from the address on your account.
            </p>
            <p>
              Deleting your account doesn&apos;t cancel an App Store or Google Play subscription, so cancel that in
              your store settings first. Our{" "}
              <a href={DELETE_ACCOUNT_PATH} className="prose-link">
                account deletion policy
              </a>{" "}
              lists what&apos;s deleted and what we have to keep.
            </p>
          </HelpCard>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="bg-lilac">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[0.85fr_1.15fr] md:py-24">
          <div>
            <h2 id="contact-title" className="h-section">
              Contact the team <span aria-hidden="true" className="font-normal">💬</span>
            </h2>
            <p className="mt-4 leading-relaxed">
              Send us a message and we&apos;ll reply by email. Prefer your own mail app? Write to{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="prose-link">
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
            <p className="mt-4 leading-relaxed">
              Looking for a quick answer? Try the{" "}
              <Link href="/#faq" className="prose-link">
                FAQ
              </Link>
              .
            </p>
            <address className="mt-8 rounded-card bg-white p-6 text-sm leading-relaxed not-italic">
              <span className="font-semibold text-ink">{COMPANY}</span>
              <br />
              {COMPANY_ADDRESS.street}
              <br />
              {COMPANY_ADDRESS.city}, {COMPANY_ADDRESS.region} {COMPANY_ADDRESS.postalCode}
              <br />
              United States
            </address>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
