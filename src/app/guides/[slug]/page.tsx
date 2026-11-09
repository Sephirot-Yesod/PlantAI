import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideBody, Inline } from "@/components/GuideBody";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Phone } from "@/components/Phone";
import { StoreBadges } from "@/components/StoreBadges";
import { formatReleaseDate } from "@/lib/app-store";
import { loadGuide, sourceUrls } from "@/lib/guide-content";
import { GUIDE_APP_SCREEN, GUIDE_METHOD, GUIDE_REVIEWER, GUIDES, GUIDES_PATH, getGuide } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";
import { APP_NAME, SITE_URL } from "@/lib/site";

// One page per guide in lib/guides.ts, built at deploy time from src/content/guides/<slug>.md.

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const { title } = loadGuide(slug);
  return pageMetadata({ title, shareTitle: title, description: guide.description, path: guide.path });
}

const TONES = ["bg-sky-2", "bg-sun-2", "bg-blush-2"];

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const content = loadGuide(guide.slug);
  const url = `${SITE_URL}${guide.path}`;
  const reviewed = formatReleaseDate(guide.reviewed);
  const screen = GUIDE_APP_SCREEN[guide.kind];
  const related = [
    ...GUIDES.filter((g) => g.kind === guide.kind && g.slug !== guide.slug),
    ...GUIDES.filter((g) => g.kind !== guide.kind),
  ].slice(0, 3);

  const reviewerId = `${SITE_URL}${GUIDES_PATH}#reviewer`;
  const pageLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: content.title,
        description: guide.description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${url}#article` },
        reviewedBy: { "@id": reviewerId },
        lastReviewed: guide.reviewed,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: APP_NAME, item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}${GUIDES_PATH}` },
            { "@type": "ListItem", position: 3, name: guide.label, item: url },
          ],
        },
      },
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: content.title,
        description: guide.description,
        inLanguage: "en",
        datePublished: guide.published,
        dateModified: guide.reviewed,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: { "@id": `${url}#webpage` },
        image: `${SITE_URL}/opengraph-image`,
        ...(guide.botanicalName ? { about: { "@type": "Thing", name: guide.botanicalName } } : {}),
        citation: sourceUrls(content.sources),
      },
      {
        "@type": "Person",
        "@id": reviewerId,
        name: GUIDE_REVIEWER.name,
        affiliation: { "@type": "CollegeOrUniversity", name: GUIDE_REVIEWER.affiliation, url: GUIDE_REVIEWER.affiliationUrl },
      },
    ],
  };
  const faqLd = content.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const appFigure = (
    <figure className="mt-8 flex items-center gap-6 rounded-card bg-cream p-6">
      <Phone src={screen.src} alt={screen.alt} sizes="120px" className="w-[104px] flex-none sm:w-[120px]" />
      <figcaption className="t-small text-[15px]">
        {screen.caption}
        <span className="mt-4 flex flex-wrap gap-3">
          <a href="/download" className="btn btn-black btn-sm caret">
            Get the app
          </a>
        </span>
      </figcaption>
    </figure>
  );

  return (
    <>
      <section aria-labelledby="guide-title" className="hero-sky rounded-b-[32px] md:rounded-b-[48px]">
        <div className="wrap pt-10 pb-12 md:pt-14 md:pb-16">
          <div className="mx-auto max-w-[1080px]">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <li>
                  <Link href="/" className="hover:text-ink hover:underline">
                    {APP_NAME}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={GUIDES_PATH} className="hover:text-ink hover:underline">
                    Guides
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-ink">
                  {guide.label}
                </li>
              </ol>
            </nav>
            <p className="eyebrow mt-6">{guide.kind === "plant" ? "Plant care guide" : "Plant problem guide"}</p>
            <h1 id="guide-title" className="h-hero mt-3 max-w-[900px]">
              {content.title}
            </h1>
            <p className="t-body mt-5 max-w-[760px]">
              <Inline text={content.lead} />
            </p>
            <p className="mt-6 text-sm text-muted">
              By the {APP_NAME} team · Reviewed by {GUIDE_REVIEWER.name}, {GUIDE_REVIEWER.affiliation} · Last reviewed{" "}
              {reviewed}
            </p>
          </div>
        </div>
      </section>

      <div className="wrap py-14 md:py-20">
        <div className="mx-auto grid max-w-[1080px] gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
          <article className="min-w-0 max-w-[760px] text-base leading-relaxed text-text">
            <GuideBody blocks={content.blocks} after={{ "how-plantalk-ai-helps": appFigure }} />

            <h2 id="sources" className="mt-14 scroll-mt-24 text-2xl leading-tight font-bold text-ink md:text-[28px]">
              Sources
            </h2>
            <ol className="mt-4 list-decimal space-y-2.5 pl-6 text-[15px] marker:font-semibold marker:text-sage">
              {content.sources.map((source, i) => (
                <li key={i} id={`source-${i + 1}`} className="scroll-mt-24 pl-1">
                  <Inline text={source} />
                </li>
              ))}
            </ol>

            <p className="mt-12 rounded-card bg-tile p-6 text-sm leading-relaxed text-muted">
              <strong className="text-ink">About this guide.</strong> {GUIDE_METHOD} Reviewed by {GUIDE_REVIEWER.name},{" "}
              {GUIDE_REVIEWER.affiliation}, on {reviewed}. Spotted something that needs fixing?{" "}
              <Link href="/support#contact" className="prose-link">
                Tell us
              </Link>
              .
            </p>
          </article>

          <aside aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-sm font-bold text-ink">On this page</p>
              <ul className="mt-3 space-y-2 border-l border-line text-sm">
                {content.toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="-ml-px block border-l border-transparent pl-4 text-muted hover:border-ink hover:text-ink">
                      {item.text}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#sources" className="-ml-px block border-l border-transparent pl-4 text-muted hover:border-ink hover:text-ink">
                    Sources
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <section aria-labelledby="more-guides-title" className="bg-lilac">
        <div className="wrap py-16 md:py-20">
          <h2 id="more-guides-title" className="h-section text-center">
            More Plant Care Guides
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((g, i) => (
              <li key={g.slug}>
                <Link
                  href={g.path}
                  className="group flex h-full flex-col rounded-card bg-white p-7 shadow-[0_10px_30px_-24px_rgb(60_40_10/0.5)] transition-transform hover:-translate-y-0.5"
                >
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full ${TONES[i % TONES.length]}`}>
                    <Icon name={g.kind === "plant" ? "sprout" : "clinic"} className="h-5 w-5" />
                  </span>
                  <span className="h-card mt-5">{g.label}</span>
                  <span className="t-small mt-2 flex-1">{g.summary}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-ink group-hover:underline">
                    Read the guide <Icon name="arrow" className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center">
            <Link href={GUIDES_PATH} className="font-bold text-ink underline decoration-ink/30 decoration-2 underline-offset-[6px] hover:decoration-ink">
              All plant care guides
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="get-title" className="lime-glow">
        <div className="wrap flex flex-col items-center py-16 text-center md:py-20">
          <h2 id="get-title" className="h-section">
            Get {APP_NAME} <span className="hl [--hl:white]">Free</span>
          </h2>
          <p className="t-body mt-4 max-w-[600px]">
            Care reminders, a health score for every plant and answers to your plant questions. On iPhone, iPad and
            Android.
          </p>
          <StoreBadges className="mt-8 justify-center" />
        </div>
      </section>

      <JsonLd data={pageLd} />
      {faqLd && <JsonLd data={faqLd} />}
    </>
  );
}
