import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/lib/guide-content";

// Renders a guide's Markdown blocks (lib/guide-content.ts) in the site's type styles.
// Citation markers become small superscript links to the numbered sources at the end.

const TOKEN = /(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*)|(\[[^\]]+\]\([^)\s]+\))|(\[\d+(?:\s*[,–-]\s*\d+)*\])/g;

function Citation({ marker }: { marker: string }) {
  const parts = marker.slice(1, -1).split(/(\d+)/);
  return (
    <sup className="ml-px text-[0.68em] font-semibold">
      {parts.map((part, i) =>
        /^\d+$/.test(part) ? (
          <a key={i} href={`#source-${part}`} aria-label={`Source ${part}`} className="text-forest hover:underline">
            {part}
          </a>
        ) : (
          part.replace(/\s+/g, "")
        ),
      )}
    </sup>
  );
}

export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = new RegExp(TOKEN.source, "g");
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    let before = text.slice(last, m.index);
    // "schedule [1,5]" reads as "schedule¹˒⁵": drop the space before a citation.
    if (m[4]) before = before.replace(/\s+$/, "");
    if (before) out.push(before);
    const key = m.index;
    if (m[1]) {
      out.push(
        <strong key={key} className="font-semibold text-ink">
          <Inline text={m[1].slice(2, -2)} />
        </strong>,
      );
    } else if (m[2]) {
      out.push(
        <em key={key}>
          <Inline text={m[2].slice(1, -1)} />
        </em>,
      );
    } else if (m[3]) {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(m[3])!;
      const [, label, href] = link;
      out.push(
        href.startsWith("/") ? (
          <Link key={key} href={href} className="prose-link">
            {label}
          </Link>
        ) : (
          <a key={key} href={href} className="prose-link">
            {label}
          </a>
        ),
      );
    } else {
      out.push(<Citation key={key} marker={m[4]} />);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

// "**Symptom.** Likely cause: … Fix: …" items (the plant guides' Common Problems) get the
// cause and the fix on lines of their own, so a problem can be scanned like the problem guides'
// "How to tell" and "What to do". The words stay exactly as written.
const CAUSE_FIX = /^(\*\*[^*]+\*\*)\s+Likely cause:\s+([\s\S]+?)\s+Fix:\s+([\s\S]+)$/;

function ListItem({ text }: { text: string }) {
  const m = CAUSE_FIX.exec(text);
  if (!m) return <Inline text={text} />;
  const [, lead, cause, fix] = m;
  return (
    <>
      <Inline text={lead} />
      <span className="mt-1 block">
        <span className="font-semibold text-ink">Likely cause:</span> <Inline text={cause} />
      </span>
      <span className="mt-1 block">
        <span className="font-semibold text-ink">Fix:</span> <Inline text={fix} />
      </span>
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "heading":
      return block.level === 3 ? (
        <h3 id={block.id} className="mt-8 scroll-mt-24 text-lg leading-snug font-bold text-ink">
          <Inline text={block.text} />
        </h3>
      ) : (
        <h2 id={block.id} className="mt-14 scroll-mt-24 text-2xl leading-tight font-bold text-ink first:mt-0 md:text-[28px]">
          <Inline text={block.text} />
        </h2>
      );
    case "paragraph":
      return (
        <p className="mt-4">
          <Inline text={block.text} />
        </p>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      const structured = block.items.some((item) => CAUSE_FIX.test(item));
      return (
        <List
          className={`mt-4 pl-6 ${structured ? "space-y-4" : "space-y-2.5"} ${block.ordered ? "list-decimal marker:font-semibold" : "list-disc"} marker:text-sage`}
        >
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              <ListItem text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "table": {
      // Tables of three or more columns stack on phones: each row becomes a block, and each
      // cell after the first is labeled with its column name, so no column hides off-screen.
      const stack = block.header.length > 2;
      return (
        <div className="mt-6 overflow-x-auto rounded-card ring-1 ring-line">
          <table className="w-full border-collapse text-left text-[15px] leading-snug">
            <thead className={`bg-mint ${stack ? "max-sm:hidden" : ""}`}>
              <tr>
                {block.header.map((cell, i) => (
                  <th key={i} scope="col" className="px-4 py-3 font-bold text-ink">
                    <Inline text={cell} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr
                  key={r}
                  className={`border-t border-line align-top ${stack ? "max-sm:block max-sm:px-4 max-sm:py-3 max-sm:first:border-t-0" : ""}`}
                >
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row" className={`px-4 py-3 font-semibold text-ink ${stack ? "max-sm:block max-sm:p-0" : ""}`}>
                        <Inline text={cell} />
                      </th>
                    ) : (
                      <td
                        key={c}
                        data-label={stack ? `${block.header[c]}:` : undefined}
                        className={`px-4 py-3 ${stack ? "max-sm:block max-sm:p-0 max-sm:pt-1.5 max-sm:before:mr-1 max-sm:before:font-semibold max-sm:before:text-ink max-sm:before:content-[attr(data-label)]" : ""}`}
                      >
                        <Inline text={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

/**
 * The guide's sections. `after` adds content at the end of a section, keyed by the id of the
 * section's H2 (for example the app screen under "How Plantalk AI Helps").
 */
export function GuideBody({ blocks, after = {} }: { blocks: Block[]; after?: Record<string, ReactNode> }) {
  const out: ReactNode[] = [];
  let section: string | null = null;
  blocks.forEach((block, i) => {
    if (block.kind === "heading" && block.level === 2) {
      if (section && after[section]) out.push(<div key={`after-${section}`}>{after[section]}</div>);
      section = block.id;
    }
    out.push(<BlockView key={i} block={block} />);
  });
  if (section && after[section]) out.push(<div key={`after-${section}`}>{after[section]}</div>);
  return <>{out}</>;
}
