import fs from "node:fs";
import path from "node:path";

// Reads a guide's Markdown (src/content/guides/<slug>.md) at build time and splits it into
// blocks for components/GuideBody.tsx. Only the Markdown the guides use is supported:
// headings (#, ##, ###), paragraphs, "- " and "1. " lists, pipe tables, **bold**, *italic*,
// [links](url) and citation markers such as [2], [1][5], [1,5] or [1–3].
// next.config.ts copies the folder into the standalone server build.

const DIR = path.join(process.cwd(), "src/content/guides");

export type Block =
  | { kind: "heading"; level: 1 | 2 | 3; text: string; id: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; header: string[]; rows: string[][] };

export type GuideContent = {
  /** The H1, as plain text. */
  title: string;
  /** The opening paragraph that answers the guide's question (inline Markdown). */
  lead: string;
  /** Everything after the lead, up to the Sources section. */
  blocks: Block[];
  /** The Sources list items (inline Markdown), numbered from 1. */
  sources: string[];
  toc: { id: string; text: string }[];
  /** The Common Questions section, as plain text, for FAQ structured data. */
  faqs: { q: string; a: string }[];
};

export const CITATION = /\[\d+(?:\s*[,–-]\s*\d+)*\]/;

export function slugify(text: string) {
  return plainText(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Markdown inline text without formatting, links or citation markers. */
export function plainText(md: string) {
  return md
    .replace(new RegExp(`\\s?${CITATION.source}`, "g"), "")
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .trim();
}

function splitRow(line: string) {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

const UL = /^- (.*)$/;
const OL = /^\d+\. (.*)$/;
const STARTS_BLOCK = /^(#{1,3} |\||- |\d+\. )/;

export function parseBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const heading = /^(#{1,3}) (.+)$/.exec(line);
    if (heading) {
      const text = heading[2].trim();
      blocks.push({ kind: "heading", level: heading[1].length as 1 | 2 | 3, text, id: slugify(text) });
      i++;
      continue;
    }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) rows.push(splitRow(lines[i++]));
      const [header, , ...body] = rows;
      blocks.push({ kind: "table", header, rows: body });
      continue;
    }
    if (UL.test(line) || OL.test(line)) {
      const ordered = OL.test(line);
      const marker = ordered ? OL : UL;
      const items: string[] = [];
      while (i < lines.length && marker.test(lines[i])) {
        items.push(marker.exec(lines[i++])![1]);
        // Indented lines continue the item above.
        while (i < lines.length && /^\s+\S/.test(lines[i])) items[items.length - 1] += ` ${lines[i++].trim()}`;
      }
      blocks.push({ kind: "list", ordered, items });
      continue;
    }
    const text: string[] = [];
    while (i < lines.length && lines[i].trim() && !STARTS_BLOCK.test(lines[i])) text.push(lines[i++].trim());
    blocks.push({ kind: "paragraph", text: text.join(" ") });
  }
  return blocks;
}

export function loadGuide(slug: string): GuideContent {
  const blocks = parseBlocks(fs.readFileSync(path.join(DIR, `${slug}.md`), "utf8"));
  const [h1, lead, ...rest] = blocks;
  if (h1?.kind !== "heading" || h1.level !== 1 || lead?.kind !== "paragraph") {
    throw new Error(`Guide ${slug}: expected a title and an opening paragraph`);
  }
  const sourcesAt = rest.findIndex((b) => b.kind === "heading" && b.level === 2 && b.text === "Sources");
  const sourcesList = rest[sourcesAt + 1];
  if (sourcesAt < 0 || sourcesList?.kind !== "list") throw new Error(`Guide ${slug}: no Sources list`);
  const body = rest.slice(0, sourcesAt);

  const toc = body.flatMap((b) => (b.kind === "heading" && b.level === 2 ? [{ id: b.id, text: plainText(b.text) }] : []));

  const faqs: { q: string; a: string }[] = [];
  const faqAt = body.findIndex((b) => b.kind === "heading" && b.level === 2 && b.text === "Common Questions");
  if (faqAt >= 0) {
    for (const b of body.slice(faqAt + 1)) {
      if (b.kind === "heading" && b.level === 2) break;
      if (b.kind === "heading" && b.level === 3) faqs.push({ q: plainText(b.text), a: "" });
      else if (b.kind === "paragraph" && faqs.length) {
        const last = faqs[faqs.length - 1];
        last.a = `${last.a} ${plainText(b.text)}`.trim();
      }
    }
  }

  return { title: plainText(h1.text), lead: lead.text, blocks: body, sources: sourcesList.items, toc, faqs };
}

/** The URL of each source, for the guide's citation structured data. */
export function sourceUrls(sources: string[]) {
  return sources.flatMap((s) => {
    const m = /\]\((https?:\/\/[^)\s]+)\)/.exec(s);
    return m ? [m[1]] : [];
  });
}
