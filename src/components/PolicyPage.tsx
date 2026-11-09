import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { storeUrl, type Block, type Inline, type Policy, type PolicyMeta } from "@/lib/policies";
import { SUPPORT_EMAIL } from "@/lib/site";

const EMAIL = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i;

/** Plain-text email addresses in a policy become mailto links. */
function linkEmails(text: string): ReactNode {
  const parts = text.split(EMAIL);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={`mailto:${part}`} className="prose-link">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function Runs({ runs }: { runs: Inline[] }) {
  return runs.map((r, i) => {
    if (r.kind === "br") return <br key={i} />;
    let node: ReactNode = r.href ? r.text : linkEmails(r.text);
    if (r.italic) node = <em>{node}</em>;
    if (r.bold) node = <strong className="font-semibold text-ink">{node}</strong>;
    if (r.href) {
      node = r.href.startsWith("/") ? (
        <Link href={r.href} className="prose-link">
          {node}
        </Link>
      ) : (
        <a href={r.href} className="prose-link">
          {node}
        </a>
      );
    }
    return <Fragment key={i}>{node}</Fragment>;
  });
}

/**
 * The store's policies mark sub-sections with an all-bold paragraph such as "A. Information
 * You Provide Directly". Those become real subheadings, so long sections don't read as one block.
 */
function subheading(b: Block): string | null {
  if (b.kind !== "paragraph" || !b.inlines.length) return null;
  if (!b.inlines.every((r) => r.kind === "text" && r.bold && !r.href)) return null;
  const text = b.inlines.map((r) => (r.kind === "text" ? r.text : "")).join("").trim();
  return text.length <= 90 && /^([A-Z]|\d+(\.\d+)*)\.\s+\S/.test(text) ? text : null;
}

function Body({ blocks }: { blocks: Block[] }) {
  return blocks.map((b, i) => {
    if (b.kind === "heading") {
      return (
        <h2 key={i} className="mt-12 text-2xl leading-tight font-bold first:mt-0">
          <Runs runs={b.inlines} />
        </h2>
      );
    }
    const sub = subheading(b);
    if (sub) {
      return (
        <h3 key={i} className="mt-8 text-lg leading-snug font-bold">
          {sub}
        </h3>
      );
    }
    if (b.kind === "list") {
      const List = b.ordered ? "ol" : "ul";
      return (
        <List key={i} className={`mt-4 space-y-2 pl-6 ${b.ordered ? "list-decimal" : "list-disc"} marker:text-sage`}>
          {b.items.map((item, j) => (
            <li key={j} className="pl-1">
              <Runs runs={item} />
            </li>
          ))}
        </List>
      );
    }
    return (
      <p key={i} className="mt-4">
        <Runs runs={b.inlines} />
      </p>
    );
  });
}

/** A legal page: the store's current policy, set in the site's type, with where it comes from. */
export function PolicyPage({ meta, policy }: { meta: PolicyMeta; policy: Policy | null }) {
  const source = storeUrl(meta);
  return (
    <>
      <section className="hero-sky rounded-b-[32px] md:rounded-b-[48px]">
        <div className="wrap pt-14 pb-12 md:pt-20 md:pb-14">
          <div className="mx-auto max-w-[680px]">
            <p className="eyebrow">Legal</p>
            <h1 className="h-hero mt-3">{policy?.title ?? meta.title}</h1>
          </div>
        </div>
      </section>

      <article className="wrap py-12 md:py-16">
        {/* 680 px keeps legal text near 75 characters a line. */}
        <div className="mx-auto max-w-[680px] text-base leading-relaxed text-text">
          {policy ? (
            <Body blocks={policy.blocks} />
          ) : (
            <p>
              We couldn&apos;t load this page just now. You can read the {meta.title.toLowerCase()} on the{" "}
              <a href={source} className="prose-link">
                Plantiemoji store
              </a>
              .
            </p>
          )}
          <p className="mt-14 rounded-card bg-tile p-6 text-sm leading-relaxed text-muted">
            This is the same text as the {meta.title.toLowerCase()} published at{" "}
            <a href={source} className="prose-link">
              plantiemoji.com/pages/{meta.handle}
            </a>
            . Questions? Email{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="prose-link">
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
      </article>
    </>
  );
}
