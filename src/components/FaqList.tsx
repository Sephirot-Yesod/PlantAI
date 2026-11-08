import type { Faq } from "@/lib/site";

// Turns exact phrases in a text into links: { "plantiemoji.com": "https://…" }.
export function withLinks(text: string, links?: Faq["links"]) {
  if (!links) return text;
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(${Object.keys(links).map(escape).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    links[part] ? (
      <a key={i} href={links[part]} className="prose-link">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

// FAQ accordion, styled like the store's product page. The answers are in the HTML even
// when closed, so search engines and AI assistants read them all.
export function FaqList({ faqs, className = "" }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={`divide-y divide-ink/10 rounded-card bg-mint px-6 sm:px-8 ${className}`}>
      {faqs.map((faq) => (
        <details key={faq.q} className="faq py-5">
          <summary className="flex cursor-pointer items-start justify-between gap-6 rounded-lg">
            <h3 className="text-base font-bold">{faq.q}</h3>
            <svg
              viewBox="0 0 24 24"
              className="faq-chevron mt-1 h-5 w-5 flex-none transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <p className="t-small mt-3 text-[15px]">{withLinks(faq.a, faq.links)}</p>
        </details>
      ))}
    </div>
  );
}

/** FAQPage structured data for a list of questions. */
export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
