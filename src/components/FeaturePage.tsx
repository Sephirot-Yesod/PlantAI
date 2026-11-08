import Image from "next/image";
import Link from "next/link";
import { Emoji, Squiggle } from "@/components/Decor";
import { faqJsonLd, FaqList } from "@/components/FaqList";
import { Fragment } from "@/components/Fragment";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Phone } from "@/components/Phone";
import { SectionTitle } from "@/components/SectionTitle";
import { StoreBadges } from "@/components/StoreBadges";
import { formatReleaseDate } from "@/lib/app-store";
import { FEATURES, type Feature } from "@/lib/features";
import { APP_NAME, SITE_URL } from "@/lib/site";

// One layout for the feature pages (content in lib/features.ts): the answer first, then
// how it works, what you get, questions, related features and the download links.

const STEP_TONES = ["bg-sky", "bg-sun", "bg-blush", "bg-mint"];
const ICON_TONES = ["bg-sky-2", "bg-sun-2", "bg-blush-2", "bg-lime", "bg-[#d9c6ff]", "bg-[#ffc9a3]"];

function Hero({ hero }: { hero: Feature["hero"] }) {
  if (hero.kind === "phone") {
    return (
      <div className="relative mx-auto w-full max-w-[380px]">
        <div aria-hidden="true" className="absolute top-[8%] right-[6%] h-[80%] w-[70%] rotate-6 rounded-[40px] bg-blush-2/70" />
        {/* The largest thing in the first view, so it's preloaded. */}
        <Phone src={hero.src} alt={hero.alt} preload sizes="(min-width: 768px) 260px, 62vw" className="relative mx-auto w-[62%] -rotate-2 md:w-[260px]" />
        <Emoji face="teal" size={72} className="absolute -top-2 right-[8%] drop-shadow-md" />
        <Squiggle width={56} className="absolute bottom-[12%] left-0 -rotate-12" />
      </div>
    );
  }
  if (hero.kind === "photo") {
    return (
      <div className="relative mx-auto w-full max-w-[460px] pb-8">
        <div className="overflow-hidden rounded-card bg-[#f3f3f3]">
          <Image src={hero.src} alt={hero.alt} preload placeholder="blur" sizes="(min-width: 768px) 460px, 90vw" className="h-auto w-full" />
        </div>
        {hero.phone && (
          <Phone src={hero.phone.src} alt={hero.phone.alt} sizes="145px" className="absolute right-0 bottom-0 w-[34%] rotate-3" />
        )}
      </div>
    );
  }
  return (
    <ul className="relative mx-auto w-full max-w-[420px] space-y-4" aria-label="Example questions for Plantie">
      {hero.questions.map((item, i) => (
        <li
          key={item.q}
          className={`flex items-start gap-3 rounded-[22px] rounded-bl-[6px] bg-white p-5 shadow-[0_14px_30px_-20px_rgb(20_30_15/0.35)] ring-1 ring-black/[0.04] ${i === 1 ? "ml-8" : ""}`}
        >
          <Emoji face={item.face} size={36} className="h-9 w-9 flex-none" />
          <p className="text-[15px] leading-relaxed text-text">{item.q}</p>
        </li>
      ))}
      <li className="flex items-center gap-2 pl-2 text-xs text-muted">
        <span aria-hidden="true" className="tracking-widest">
          •••
        </span>{" "}
        Plantie is typing…
      </li>
    </ul>
  );
}

export function FeaturePage({ feature }: { feature: Feature }) {
  const url = `${SITE_URL}${feature.path}`;
  const related = feature.related.map((slug) => FEATURES.find((f) => f.slug === slug)).filter((f) => f !== undefined);
  const heading = feature.h1.map((part) => part.text).join("");

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: heading,
    description: feature.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@type": "MobileApplication", "@id": `${SITE_URL}/#app`, name: APP_NAME },
    dateModified: feature.updated,
    publisher: { "@id": `${SITE_URL}/#organization` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: APP_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: feature.label, item: url },
      ],
    },
  };

  return (
    <>
      <section aria-labelledby="feature-title" className="hero-sky rounded-b-[32px] md:rounded-b-[48px]">
        <div className="wrap grid items-center gap-12 pt-10 pb-16 md:grid-cols-[1.1fr_0.9fr] md:pt-14 md:pb-20">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <li>
                  <Link href="/" className="hover:text-ink hover:underline">
                    {APP_NAME}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-ink">
                  {feature.label}
                </li>
              </ol>
            </nav>
            <h1 id="feature-title" className="h-hero mt-5">
              {feature.h1.map((part) =>
                part.hl ? (
                  <span key={part.text} className="hl">
                    {part.text}
                  </span>
                ) : (
                  part.text
                ),
              )}
            </h1>
            <p className="t-body mt-5 max-w-[560px]">{feature.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a href="/download" className="btn btn-black caret">
                Get the app
              </a>
              <a
                href="#how"
                className="font-bold text-ink underline decoration-ink/30 decoration-2 underline-offset-[6px] hover:decoration-ink"
              >
                See how it works
              </a>
            </div>
            <p className="mt-6 text-sm text-muted">
              Free on iPhone, iPad and Android · Updated {formatReleaseDate(feature.updated)} by the {APP_NAME} team
            </p>
          </div>
          <Hero hero={feature.hero} />
        </div>
      </section>

      <section id="how" aria-labelledby="how-title" className="wrap scroll-mt-24 py-20 md:py-24">
        <SectionTitle id="how-title">{feature.stepsTitle}</SectionTitle>
        <ol className="mx-auto mt-12 grid max-w-[1120px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {feature.steps.map((step, i) => (
            <li key={step.title} className={`rounded-card p-7 ${STEP_TONES[i % STEP_TONES.length]}`}>
              <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-lg font-bold text-lime">
                {i + 1}
              </span>
              <h3 className="h-card mt-5">{step.title}</h3>
              <p className="t-small mt-2 text-[15px]">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="highlights-title" className="bg-cream">
        <div className="wrap py-20 md:py-24">
          <SectionTitle id="highlights-title">{feature.highlightsTitle}</SectionTitle>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {feature.highlights.map((h, i) => (
              <li key={h.title} className="flex gap-4 rounded-card bg-white p-6 shadow-[0_10px_30px_-24px_rgb(60_40_10/0.5)]">
                <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-full ${ICON_TONES[i % ICON_TONES.length]}`}>
                  <Icon name={h.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-ink">{h.title}</h3>
                  <p className="t-small mt-1">{h.body}</p>
                </div>
              </li>
            ))}
          </ul>
          {feature.gallery && (
            <ul className="mt-16 flex flex-wrap items-start justify-center gap-10">
              {feature.gallery.map((g) => (
                <li key={g.caption} className="w-[300px] max-w-full">
                  <Fragment src={g.src} alt={g.alt} width={300} className="mx-auto" />
                  <p className="t-small mt-4 text-center text-sm">{g.caption}</p>
                </li>
              ))}
            </ul>
          )}
          {feature.note && <p className="t-small mx-auto mt-12 max-w-[640px] text-center text-sm">{feature.note}</p>}
        </div>
      </section>

      {feature.glossary && (
        <section aria-labelledby="glossary-title" className="wrap pt-20 md:pt-24">
          <SectionTitle id="glossary-title">VPD and DLI, in Plain Words</SectionTitle>
          <dl className="mx-auto mt-10 grid max-w-[960px] gap-5 md:grid-cols-2">
            {feature.glossary.map((g) => (
              <div key={g.term} className="rounded-card border border-line p-7">
                <dt className="h-card">{g.term}</dt>
                <dd className="t-small mt-3 text-[15px]">
                  {g.body}{" "}
                  <span className="text-sm">
                    Source:{" "}
                    <a href={g.source.href} className="prose-link">
                      {g.source.label}
                    </a>
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {feature.callout && (
        <section aria-labelledby="callout-title" className="wrap pt-20 md:pt-24">
          <div className="grid items-center gap-8 overflow-hidden rounded-card bg-lime p-8 sm:p-12 md:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 id="callout-title" className="h-section">
                {feature.callout.title}
              </h2>
              <p className="t-body mt-4">{feature.callout.body}</p>
              {feature.callout.buttons && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {feature.callout.buttons.map((b, i) => (
                    <a key={b.href} href={b.href} className={`btn caret ${i === 0 ? "btn-black" : "btn-white"}`}>
                      {b.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {feature.callout.image && (
              <Fragment src={feature.callout.image.src} alt={feature.callout.image.alt} width={260} className="mx-auto rotate-2" />
            )}
          </div>
        </section>
      )}

      <section aria-labelledby="faq-title" className="wrap py-20 md:py-24">
        <SectionTitle id="faq-title">
          Common <span className="hl [--hl:#d9c6ff]">Questions</span>
        </SectionTitle>
        <FaqList faqs={feature.faqs} className="mx-auto mt-10 max-w-[880px]" />
      </section>

      <section aria-labelledby="related-title" className="bg-lilac">
        <div className="wrap py-20 md:py-24">
          <SectionTitle id="related-title">More in {APP_NAME}</SectionTitle>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((f, i) => (
              <li key={f.slug}>
                <Link
                  href={f.path}
                  className="group flex h-full flex-col rounded-card bg-white p-7 shadow-[0_10px_30px_-24px_rgb(60_40_10/0.5)] transition-transform hover:-translate-y-0.5"
                >
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full ${ICON_TONES[i % ICON_TONES.length]}`}>
                    <Icon name={f.icon} className="h-5 w-5" />
                  </span>
                  <span className="h-card mt-5">{f.label}</span>
                  <span className="t-small mt-2 flex-1">{f.summary}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-ink group-hover:underline">
                    Learn more <Icon name="arrow" className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="get-title" className="lime-glow">
        <div className="wrap flex flex-col items-center py-16 text-center md:py-20">
          <h2 id="get-title" className="h-section">
            Get {APP_NAME} <span className="hl [--hl:white]">Free</span>
          </h2>
          <p className="t-body mt-4 max-w-[600px]">
            On iPhone and iPad with iOS 15 or later, and on Android. Pro is an optional subscription in the app.
          </p>
          <StoreBadges className="mt-8 justify-center" />
        </div>
      </section>

      <JsonLd data={pageLd} />
      <JsonLd data={faqJsonLd(feature.faqs)} />
    </>
  );
}
