import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import googlePlayBadge from "@/assets/badges/google-play.png";
import qrAndroid from "@/assets/qr/android.svg";
import { faqJsonLd, FaqList } from "@/components/FaqList";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { SectionTitle } from "@/components/SectionTitle";
import {
  ANDROID_APK,
  ANDROID_PATH,
  androidRequirement,
  androidVersion,
  apkSize,
  apkUrl,
  only64Bit,
  type AndroidApk,
} from "@/lib/android";
import { formatReleaseDate } from "@/lib/app-store";
import { pageMetadata } from "@/lib/seo";
import { APP_NAME, APP_STORE_URL, PLAY_PACKAGE, PLAY_URL, SITE_URL, type Faq } from "@/lib/site";

// plantalk.ai/android: Google Play, or the app file (APK) to install directly. The file and
// its details come from lib/android.ts; with no APK on the site, this page is a 404.

const TITLE = `${APP_NAME} for Android: Google Play or APK Download`;
const DESCRIPTION_TEXT =
  "Get Plantalk AI for Android from Google Play, or download the APK from plantalk.ai and install it yourself. Same free app, with install steps and the file's checksum.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  shareTitle: TITLE,
  description: DESCRIPTION_TEXT,
  path: ANDROID_PATH,
});

const STEP_TONES = ["bg-sky", "bg-sun", "bg-blush", "bg-mint"];

const STEPS = [
  {
    title: "Download the file",
    body: "On your Android phone, tap Download APK. If your browser asks whether to keep the file, choose to download it.",
  },
  {
    title: "Open it",
    body: "When the download finishes, tap Open. You can also find the file in the Files app, under Downloads.",
  },
  {
    title: "Allow the install",
    body: "The first time, Android asks you to allow installs from your browser. Tap Settings, turn on Allow from this source, then go back.",
  },
  {
    title: "Install",
    body: "Tap Install, then Open. Sign in, or continue as a guest, and add your first plant.",
  },
];

// What the page can promise depends on the file: whether Google Play signs its copy with the same
// key (so the two can replace each other) and whether it runs on 32-bit phones.
function faqsFor(apk: AndroidApk): Faq[] {
  const play = apk.sameKeyAsPlay;
  return [
    {
      q: "Google Play or the APK: which should I use?",
      a: "If your phone has Google Play, use it. It installs the app in one tap and keeps it up to date for you. The APK is for phones without Google Play, or for anyone who would rather install apps themselves.",
    },
    {
      q: "Is the APK the same app as on Google Play?",
      a:
        play === true
          ? "Yes. It's the same app, signed with the same key Google Play uses, so you can move between the two without reinstalling. Your phone checks the signature when it installs the app, and Google Play Protect, if your phone has it, scans the app as usual."
          : play === false
            ? "It's the same app, made and signed by Plantalk LLC, but Google Play signs its copy with a different key. So Android won't install this file over the Google Play version, or the other way round. To switch, uninstall the copy you have first."
            : "Yes, it's the same app, made and signed by Plantalk LLC. Your phone checks the signature when it installs the app, and Google Play Protect, if your phone has it, scans the app as usual.",
    },
    ...(only64Bit(apk)
      ? [
          {
            q: "Will it work on my phone?",
            a: `It works on phones with ${androidVersion(apk)} and a 64-bit processor, which covers almost all phones from recent years. Some older and budget phones run 32-bit Android and can't install this file. On those, try Google Play instead.`,
          },
        ]
      : []),
    {
      q: "Will the app update itself?",
      a: "Not from the APK. When there's a new version, it's posted on this page. Download it and install it over the old one; your plants and settings stay. If you'd rather get updates automatically, install Plantalk AI from Google Play.",
    },
    {
      q: "I already have Plantalk AI from Google Play. Do I need this?",
      a:
        play === false
          ? "No. Keep the Google Play version, which updates on its own. This file won't install over it."
          : "No. Keep the Google Play version, which updates on its own.",
    },
    {
      q: "My phone says the app wasn't installed. What now?",
      a: `First, download the file again: a download that didn't finish can't be installed. If the message says the package conflicts with an existing package, another copy of Plantalk AI is already on the phone${play === true ? "" : ", such as the one from Google Play"}. Keep that copy, or uninstall it and try again. If your phone already has a newer version than the one on this page, you don't need this file. Still stuck? Email hi@plantalk.ai.`,
      links: { "hi@plantalk.ai": "mailto:hi@plantalk.ai" },
    },
  ];
}

export default function AndroidPage() {
  const apk = ANDROID_APK;
  if (!apk) notFound();
  const url = `${SITE_URL}${ANDROID_PATH}`;
  const faqs = faqsFor(apk);
  const facts = [
    { label: "Version", value: apk.version },
    { label: "Updated", value: formatReleaseDate(apk.updated) },
    { label: "File size", value: apkSize(apk) },
    { label: "Works on", value: androidRequirement(apk) },
    { label: "File name", value: apk.file },
    { label: "Package name", value: PLAY_PACKAGE },
  ];

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: TITLE,
    description: DESCRIPTION_TEXT,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@type": "MobileApplication", "@id": `${SITE_URL}/#app`, name: APP_NAME },
    dateModified: apk.updated,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: APP_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Android", item: url },
      ],
    },
  };

  return (
    <>
      <section aria-labelledby="android-title" className="hero-sky rounded-b-[32px] md:rounded-b-[48px]">
        <div className="wrap pt-10 pb-14 md:pt-14 md:pb-20">
          <div className="mx-auto max-w-[1120px]">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <li>
                  <Link href="/" className="hover:text-ink hover:underline">
                    {APP_NAME}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-ink">
                  Android
                </li>
              </ol>
            </nav>
            <h1 id="android-title" className="h-hero mt-5">
              {APP_NAME} for <span className="hl">Android</span>{" "}
              <span aria-hidden="true" className="font-normal">
                📲
              </span>
            </h1>
            <p className="t-body mt-5 max-w-[640px]">
              Get the free app from Google Play, or download the app file (APK) here and install it yourself. It&apos;s
              the same app either way.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <article className="flex flex-col rounded-card bg-white p-7 shadow-[0_14px_34px_-26px_rgb(20_30_15/0.5)] sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime">
                    <Icon name="refresh" className="h-5 w-5" />
                  </span>
                  <h2 className="h-card">Google Play</h2>
                  <span className="rounded-full bg-lime/60 px-2.5 py-1 text-xs font-bold text-ink">Recommended</span>
                </div>
                <p className="t-small mt-4 flex-1 text-[15px]">
                  Installs in one tap, and Google Play keeps the app up to date for you.
                </p>
                <a href={PLAY_URL} className="mt-6 self-start rounded-[10px]">
                  <Image src={googlePlayBadge} alt="Get it on Google Play" height={52} width={Math.round((52 * 564) / 168)} />
                </a>
              </article>

              <article className="flex flex-col rounded-card bg-white p-7 shadow-[0_14px_34px_-26px_rgb(20_30_15/0.5)] sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-2">
                    <Icon name="download" className="h-5 w-5" />
                  </span>
                  <h2 className="h-card">Direct download (APK)</h2>
                </div>
                <p className="t-small mt-4 flex-1 text-[15px]">
                  For phones without Google Play, or if you&apos;d rather install the app yourself. New versions are
                  posted on this page.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <a href={apkUrl(apk)} download className="btn btn-black">
                    <Icon name="download" className="h-5 w-5" />
                    Download APK
                  </a>
                  <span className="text-sm text-muted">
                    Version {apk.version} · {apkSize(apk)} · {androidRequirement(apk)}
                  </span>
                </div>
              </article>
            </div>

            {/* Desktop only: the file is for the phone, so offer the page to the phone. */}
            <div className="mt-6 hidden items-center gap-4 md:flex">
              <Image src={qrAndroid} alt="" width={88} height={88} unoptimized className="rounded-[10px] bg-white p-1.5" />
              <p className="text-sm text-muted">
                On a computer? Scan this code with your Android phone to open this page there.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="install-title" className="wrap py-20 md:py-24">
        <SectionTitle id="install-title" sub="It takes about a minute. Your phone shows each step as you go.">
          How to Install the APK
        </SectionTitle>
        <ol className="mx-auto mt-12 grid max-w-[1120px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className={`rounded-card p-7 sm:row-span-3 sm:grid sm:grid-rows-subgrid sm:gap-y-0 ${STEP_TONES[i % STEP_TONES.length]}`}
            >
              <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-lg font-bold text-lime">
                {i + 1}
              </span>
              <h3 className="h-card mt-5">{step.title}</h3>
              <p className="t-small mt-2 text-[15px]">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="t-small mx-auto mt-8 max-w-[640px] text-center text-[15px]">
          Afterwards you can turn Allow from this source off again. It&apos;s under Install unknown apps in your
          phone&apos;s settings.
        </p>
      </section>

      <section aria-labelledby="file-title" className="bg-cream">
        <div className="wrap py-20 md:py-24">
          <SectionTitle id="file-title">About This Download</SectionTitle>
          {/* 800 px keeps the 64-character checksum on one line on desktop. */}
          <div className="mx-auto mt-10 max-w-[800px] rounded-card bg-white p-6 sm:p-8">
            <dl className="divide-y divide-line">
              {facts.map((f) => (
                <div key={f.label} className="grid gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-6">
                  <dt className="text-sm font-bold text-ink">{f.label}</dt>
                  <dd className="text-[15px] text-text">{f.value}</dd>
                </div>
              ))}
              <div className="grid gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-6">
                <dt className="text-sm font-bold text-ink">SHA-256 of the file</dt>
                <dd className="font-mono text-[13px] leading-relaxed break-all text-text">{apk.sha256}</dd>
              </div>
              <div className="grid gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-6">
                <dt className="text-sm font-bold text-ink">Signing certificate (SHA-256)</dt>
                <dd className="font-mono text-[13px] leading-relaxed break-all text-text">{apk.certSha256}</dd>
              </div>
            </dl>
          </div>
          <p className="t-small mx-auto mt-6 max-w-[800px] text-[15px]">
            To check a download, compare its SHA-256 checksum with the one above.{" "}
            {apk.sameKeyAsPlay
              ? `The signing certificate is the same one Google Play uses for ${APP_NAME}.`
              : "The file is signed by Plantalk LLC."}
          </p>
        </div>
      </section>

      <section aria-labelledby="android-faq-title" className="wrap py-20 md:py-24">
        <SectionTitle id="android-faq-title">Questions About the APK</SectionTitle>
        <FaqList faqs={faqs} className="mx-auto mt-10 max-w-[880px]" />
        <p className="mt-10 text-center text-[15px]">
          On iPhone or iPad?{" "}
          <a href={APP_STORE_URL} className="prose-link">
            Get {APP_NAME} on the App Store
          </a>
          .
        </p>
      </section>

      <JsonLd data={pageLd} />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
