import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { SectionTitle } from "@/components/SectionTitle";
import { StoreBadges } from "@/components/StoreBadges";
import { GUIDE_METHOD, GUIDE_REVIEWER, GUIDES, GUIDES_PATH, type Guide } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";
import { APP_NAME, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Plant Care Guides",
  shareTitle: "Expert-reviewed plant care guides",
  description:
    "Expert-reviewed guides to common houseplants and plant problems: watering, light, yellow leaves, brown tips and root rot, each with its sources.",
  path: GUIDES_PATH,
});

const TONES = ["bg-sky-2", "bg-sun-2", "bg-blush-2", "bg-lime", "bg-[#d9c6ff]"];

function GuideCards({ guides }: { guides: Guide[] }) {
  return (
    <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((g, i) => (
        <li key={g.slug}>
          <Link
            href={g.path}
            className="group flex h-full flex-col rounded-card bg-white p-7 shadow-[0_10px_30px_-24px_rgb(60_40_10/0.5)] ring-1 ring-black/[0.04] transition-transform hover:-translate-y-0.5"
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
  );
}

export default function GuidesPage() {
  const plants = GUIDES.filter((g) => g.kind === "plant");
  const problems = GUIDES.filter((g) => g.kind === "problem");
  const url = `${SITE_URL}${GUIDES_PATH}`;

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: "Plant Care Guides",
    description: metadata.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: APP_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: url },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: GUIDES.map((g, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}${g.path}`, name: g.label })),
    },
  };

  return (
    <>
      <section aria-labelledby="guides-title" className="hero-sky rounded-b-[32px] md:rounded-b-[48px]">
        <div className="wrap pt-10 pb-14 md:pt-14 md:pb-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/" className="hover:text-ink hover:underline">
                  {APP_NAME}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-ink">
                Guides
              </li>
            </ol>
          </nav>
          <h1 id="guides-title" className="h-hero mt-5">
            Plant Care <span className="hl">Guides</span>
          </h1>
          <p className="t-body mt-5 max-w-[680px]">
            Clear answers for common houseplants and plant problems, with the numbers that matter. Every guide lists its
            sources and is reviewed by {GUIDE_REVIEWER.name} of {GUIDE_REVIEWER.affiliation}.
          </p>
        </div>
      </section>

      <section aria-labelledby="plants-title" className="wrap py-20 md:py-24">
        <SectionTitle id="plants-title">Houseplants</SectionTitle>
        <GuideCards guides={plants} />
      </section>

      <section aria-labelledby="problems-title" className="bg-cream">
        <div className="wrap py-20 md:py-24">
          <SectionTitle id="problems-title">Plant Problems</SectionTitle>
          <GuideCards guides={problems} />
        </div>
      </section>

      <section aria-labelledby="method-title" className="wrap py-20 md:py-24">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 id="method-title" className="h-section">
            How These Guides Are Made
          </h2>
          <p className="t-body mt-5">
            {GUIDE_METHOD} The sources are university extension services, botanical gardens, the Royal Horticultural
            Society and the ASPCA&apos;s plant lists. {GUIDE_REVIEWER.name}, of {GUIDE_REVIEWER.affiliation}, reviews
            every guide before it goes live, and each guide is reviewed again at least once a year.
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
    </>
  );
}
