// Legal pages on plantalk.ai show the policies published on the Plantiemoji store, so each
// text has one home (edit it in Shopify) and the two sites never drift apart. A page fetches
// its store page at most every 6 hours (ISR) and keeps only the structure: headings,
// paragraphs, lists, bold, italics and links. It renders that as React text, so no store
// HTML or script ever reaches plantalk.ai.
//
// The store rate-limits bursts of page requests, so fetches retry with a short backoff. If a
// background refresh still fails, getPolicy throws and Next keeps serving the last good copy.
// Only a build with no copy yet falls back to a link to the store page.

export const POLICIES = {
  privacy: { handle: "privacy-policy", path: "/privacy", title: "Privacy Policy" },
  terms: { handle: "terms-of-use", path: "/terms", title: "Terms of Use" },
  deletion: { handle: "account-deletion", path: "/delete-account", title: "Account Deletion" },
} as const;

export type PolicyKey = keyof typeof POLICIES;
export type PolicyMeta = (typeof POLICIES)[PolicyKey];

export type Inline =
  | { kind: "text"; text: string; bold: boolean; italic: boolean; href: string | null }
  | { kind: "br" };
export type Block =
  | { kind: "heading"; inlines: Inline[] }
  | { kind: "paragraph"; inlines: Inline[] }
  | { kind: "list"; ordered: boolean; items: Inline[][] };
export type Policy = { title: string; blocks: Block[]; sourceUrl: string };

const STORE = "https://www.plantiemoji.com";
const REVALIDATE = 21600;
const USER_AGENT = "Mozilla/5.0 (compatible; PlantalkAI-Site/1.0; +https://plantalk.ai)";
// Store pages that now live on this site, so links between policies stay on plantalk.ai.
const LOCAL_PAGES: Record<string, string> = {
  "privacy-policy": "/privacy",
  "terms-of-use": "/terms",
  "account-deletion": "/delete-account",
};

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", hellip: "…", copy: "©", reg: "®",
  trade: "™", middot: "·", bull: "•", laquo: "«", raquo: "»", deg: "°", times: "×",
};

function decode(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, e: string) => {
    if (e[0] === "#") {
      const n = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(n) && n > 0 && n < 0x110000 ? String.fromCodePoint(n) : "";
    }
    return ENTITIES[e.toLowerCase()] ?? whole;
  });
}

/** Keeps http(s), mailto and tel links only; points our own policy pages at this site. */
function safeHref(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(decode(raw.trim()), STORE);
  } catch {
    return null;
  }
  if (url.protocol === "mailto:" || url.protocol === "tel:") return url.href;
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  const host = url.hostname.replace(/^www\./, "");
  if (host === "plantiemoji.com") {
    const page = url.pathname.match(/^\/pages\/([a-z0-9-]+)\/?$/i)?.[1]?.toLowerCase();
    if (page && LOCAL_PAGES[page]) return LOCAL_PAGES[page] + url.hash;
  }
  if (host === "plantalk.ai") return url.pathname + url.search + url.hash;
  return url.href;
}

/** Merges runs with the same style and trims the edges of a paragraph or list item. */
function tidy(list: Inline[]): Inline[] {
  const out: Inline[] = [];
  for (const n of list) {
    const prev = out.at(-1);
    if (n.kind === "br") {
      if (prev && prev.kind !== "br") out.push(n);
      continue;
    }
    const afterSpace = !prev || prev.kind === "br" || /\s$/.test(prev.text);
    const text = afterSpace ? n.text.replace(/^\s+/, "") : n.text;
    if (!text) continue;
    if (prev && prev.kind === "text" && prev.bold === n.bold && prev.italic === n.italic && prev.href === n.href) {
      prev.text += text;
    } else {
      out.push({ ...n, text });
    }
  }
  while (out.at(-1)?.kind === "br") out.pop();
  const last = out.at(-1);
  if (last?.kind === "text") {
    last.text = last.text.replace(/\s+$/, "");
    if (!last.text) out.pop();
  }
  return out;
}

const DROP = /<(script|style|noscript|template|svg|iframe|form|button|select|textarea)\b[\s\S]*?<\/\1\s*>/gi;
const TOKEN = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b([^>]*)>|([^<]+)/g;
const BLOCK_CONTAINERS = new Set(["div", "section", "article", "header", "footer", "aside", "blockquote", "table", "tr", "main"]);

/** Turns the store page's main content into plain blocks. Returns null if it doesn't look like a policy. */
export function parsePolicy(html: string, sourceUrl: string, fallbackTitle: string): Policy | null {
  const main = html.match(/<main\b[^>]*\bid=["']MainContent["'][^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!main) return null;

  const blocks: Block[] = [];
  const lists: { ordered: boolean; items: Inline[][] }[] = [];
  const links: (string | null)[] = [];
  let title = "";
  let inTitle = false;
  let cur: Inline[] | null = null;
  let curKind: "heading" | "paragraph" | "item" = "paragraph";
  let bold = 0;
  let italic = 0;
  let liDepth = 0;

  const flush = () => {
    if (!cur) return;
    const inlines = tidy(cur);
    cur = null;
    if (!inlines.length) return;
    const list = lists.at(-1);
    if (curKind === "item" && list) list.items.push(inlines);
    else blocks.push({ kind: curKind === "heading" ? "heading" : "paragraph", inlines });
  };
  const begin = (kind: typeof curKind) => {
    flush();
    cur = [];
    curKind = kind;
  };

  for (const m of main.replace(DROP, " ").matchAll(TOKEN)) {
    const [, slash, rawName, attrs, rawText] = m;
    if (rawText !== undefined) {
      const text = decode(rawText).replace(/\s+/g, " ");
      if (inTitle) {
        title += text;
        continue;
      }
      if (!cur) {
        if (!text.trim()) continue;
        cur = [];
        curKind = lists.length ? "item" : "paragraph";
      }
      cur.push({ kind: "text", text, bold: bold > 0, italic: italic > 0, href: links.at(-1) ?? null });
      continue;
    }
    if (!rawName) continue; // a comment
    const name = rawName.toLowerCase();
    const closing = slash === "/";

    if (/^h[1-6]$/.test(name)) {
      if (closing) {
        if (inTitle) inTitle = false;
        else flush();
      } else if (name === "h1" && !title && !blocks.length) {
        flush();
        inTitle = true;
      } else {
        begin("heading");
      }
    } else if (name === "p") {
      if (liDepth > 0) cur?.push({ kind: "text", text: " ", bold: false, italic: false, href: null });
      else if (closing) flush();
      else begin(lists.length ? "item" : "paragraph");
    } else if (name === "ul" || name === "ol") {
      flush();
      if (!closing) {
        lists.push({ ordered: name === "ol", items: [] });
      } else {
        const done = lists.pop();
        const outer = lists.at(-1);
        if (done?.items.length) {
          if (outer) outer.items.push(...done.items);
          else blocks.push({ kind: "list", ordered: done.ordered, items: done.items });
        }
      }
    } else if (name === "li") {
      flush();
      if (!closing) {
        liDepth += 1;
        cur = [];
        curKind = "item";
      } else {
        liDepth = Math.max(0, liDepth - 1);
      }
    } else if (name === "br") {
      cur?.push({ kind: "br" });
    } else if (name === "b" || name === "strong") {
      bold = Math.max(0, bold + (closing ? -1 : 1));
    } else if (name === "i" || name === "em") {
      italic = Math.max(0, italic + (closing ? -1 : 1));
    } else if (name === "a") {
      if (closing) {
        links.pop();
      } else {
        const href = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
        links.push(href ? safeHref(href[1] ?? href[2] ?? href[3] ?? "") : null);
      }
    } else if (BLOCK_CONTAINERS.has(name) && liDepth === 0) {
      flush();
    }
    // Everything else (span, data-island, …) is a transparent wrapper.
  }
  flush();

  const chars = blocks.reduce((sum, b) => {
    const runs = b.kind === "list" ? b.items.flat() : b.inlines;
    return sum + runs.reduce((s, r) => s + (r.kind === "text" ? r.text.length : 0), 0);
  }, 0);
  if (blocks.length < 3 || chars < 400) return null;
  return { title: title.trim() || fallbackTitle, blocks, sourceUrl };
}

async function fetchHtml(url: string): Promise<string | null> {
  for (const wait of [0, 2500, 7000]) {
    if (wait) await new Promise((resolve) => setTimeout(resolve, wait));
    try {
      const res = await fetch(url, {
        headers: { "user-agent": USER_AGENT, accept: "text/html" },
        next: { revalidate: REVALIDATE },
      });
      if (res.ok) return await res.text();
      if (res.status !== 429 && res.status < 500) return null;
    } catch {
      // Network error: try again.
    }
  }
  return null;
}

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/** The "Last updated: November 1, 2026" date in a policy's text, as ISO, or null if it has none. */
export function policyUpdated(policy: Policy): string | null {
  for (const block of policy.blocks) {
    const runs = block.kind === "list" ? block.items.flat() : block.inlines;
    const text = runs.map((r) => (r.kind === "text" ? r.text : " ")).join("");
    const m = text.match(/last\s+updated\s*:?\s*([a-z]+)\s+(\d{1,2}),?\s+(\d{4})/i);
    const month = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1;
    if (m && month >= 0) return new Date(Date.UTC(Number(m[3]), month, Number(m[2]))).toISOString();
  }
  return null;
}

export function storeUrl(meta: PolicyMeta): string {
  return `${STORE}/pages/${meta.handle}`;
}

/** The policy as published on the store, or null when it can't be loaded during a build. */
export async function getPolicy(key: PolicyKey): Promise<Policy | null> {
  const meta = POLICIES[key];
  const url = storeUrl(meta);
  const html = await fetchHtml(url);
  const policy = html ? parsePolicy(html, url, meta.title) : null;
  if (!policy && process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build") {
    // A background refresh failed. Throwing keeps the last good copy on the page.
    throw new Error(`Policy page unavailable: ${url}`);
  }
  return policy;
}
