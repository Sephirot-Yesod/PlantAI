// Counts how AI assistants use plantalk.ai, from the load balancer's request logs:
// - pages fetched by AI crawlers and by assistants answering a user (by user agent), and
// - visitors referred by AI assistants (by referrer, or ChatGPT's utm_source tag).
// User agents can be faked, so treat the counts as estimates. Needs gcloud logged in with
// access to the plantalk-website project.
//   npm run ai-traffic            last 30 days
//   npm run ai-traffic -- 7       last 7 days
import { execFileSync } from "node:child_process";

const days = Number(process.argv[2] ?? 30);
const since = new Date(Date.now() - days * 86_400_000).toISOString();

// Pages only: no scripts, images or redirects (a redirect is counted again at its target).
const filter = [
  'resource.type="http_load_balancer"',
  `timestamp>="${since}"`,
  'httpRequest.requestUrl:"https://plantalk.ai/"',
  'NOT httpRequest.requestUrl:"/_next/"',
  "httpRequest.status<300",
].join(" AND ");

const AGENTS = [
  ["ChatGPT, answering a user", /ChatGPT-User/],
  ["ChatGPT search crawler", /OAI-SearchBot/],
  ["OpenAI training crawler", /GPTBot/],
  ["Claude, answering a user", /Claude-User/],
  ["Claude search crawler", /Claude-SearchBot/],
  ["Anthropic training crawler", /ClaudeBot/],
  ["Perplexity, answering a user", /Perplexity-User/],
  ["Perplexity crawler", /PerplexityBot/],
  ["Google (Search, AI Overviews, Gemini)", /Googlebot|GoogleOther|Google-InspectionTool/],
  ["Bing (Search, Copilot)", /bingbot/],
  ["Apple (Siri, Spotlight)", /Applebot/],
  ["Meta AI", /meta-externalagent|meta-externalfetcher|meta-webindexer/i],
  ["Mistral, answering a user", /MistralAI-User/],
  ["DuckDuckGo AI answers", /DuckAssistBot/],
  ["xAI (Grok)", /xAI-SearchBot|GrokBot/i],
  ["Amazon (Alexa)", /Amazonbot/],
];

const ASSISTANTS = [
  ["ChatGPT", /(^|\.)(chatgpt\.com|openai\.com)$/],
  ["Perplexity", /(^|\.)perplexity\.ai$/],
  ["Gemini", /^gemini\.google\.com$/],
  ["Copilot", /(^|\.)copilot\.microsoft\.com$/],
  ["Claude", /(^|\.)claude\.ai$/],
  ["Meta AI", /(^|\.)meta\.ai$/],
  ["Grok", /(^|\.)grok\.com$/],
  ["DeepSeek", /(^|\.)deepseek\.com$/],
];

const out = execFileSync(
  "gcloud",
  ["logging", "read", filter, "--project=plantalk-website", `--freshness=${days + 1}d`, "--limit=100000", "--format=json(httpRequest)"],
  { maxBuffer: 1 << 28 },
).toString();
// Icons, the share image and crawler files (robots.txt, the sitemap, the IndexNow key) aren't
// pages. /llms.txt is, because it's written for AI assistants.
const NOT_A_PAGE = /\.(png|ico|svg|jpe?g|webp|xml)$|^\/robots\.txt$|^\/opengraph-image|^\/[a-f0-9]{32}\.txt$/;
const requests = JSON.parse(out || "[]")
  .map((entry) => entry.httpRequest ?? {})
  .filter((r) => r.requestUrl && !NOT_A_PAGE.test(new URL(r.requestUrl).pathname));

const agents = new Map();
const referred = new Map();
const pages = new Map();
const bump = (map, key) => map.set(key, (map.get(key) ?? 0) + 1);

for (const r of requests) {
  const url = new URL(r.requestUrl);
  const agent = AGENTS.find(([, re]) => re.test(r.userAgent ?? ""));
  if (agent) {
    bump(agents, agent[0]);
    if (/answering a user/.test(agent[0])) bump(pages, url.pathname);
    continue;
  }
  let host = "";
  try {
    host = r.referer ? new URL(r.referer).hostname : "";
  } catch {
    // Not a valid referrer URL.
  }
  const source =
    ASSISTANTS.find(([, re]) => re.test(host))?.[0] ??
    (url.searchParams.get("utm_source") === "chatgpt.com" ? "ChatGPT" : undefined);
  if (source) bump(referred, source);
}

const table = (map) =>
  [...map].sort((a, b) => b[1] - a[1]).map(([k, n]) => `  ${String(n).padStart(6)}  ${k}`).join("\n") || "  none";

console.log(`plantalk.ai pages, last ${days} days (${requests.length} page requests in the logs)\n`);
console.log(`Fetched by AI assistants and crawlers:\n${table(agents)}\n`);
console.log(`Pages assistants read while answering a user:\n${table(pages)}\n`);
console.log(`Visitors referred by AI assistants:\n${table(referred)}`);
