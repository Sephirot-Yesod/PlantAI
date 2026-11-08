// The site side of the monthly SEO check (first Monday of the month), in one command:
//   npm run monthly-check
// 1. Every page in the live sitemap, plus robots.txt and llms.txt, answers 200.
// 2. PageSpeed Insights for the home page and one feature page, on mobile and desktop.
// 3. The AI traffic report for the last 30 days (scripts/ai-traffic.mjs).
// Needs gcloud logged in with access to the plantalk-website project. The prompt check in
// the AI assistants and the Search Console and Bing reports are still done by hand.
import { execFileSync } from "node:child_process";

const SITE = "https://plantalk.ai";
const PSI_PAGES = ["/", "/plant-identifier"];

console.log("1. Pages\n");
const sitemap = await fetch(`${SITE}/sitemap.xml`).then((res) => res.text());
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
let broken = 0;
for (const url of [...urls, `${SITE}/robots.txt`, `${SITE}/llms.txt`]) {
  const res = await fetch(url, { redirect: "manual" });
  if (res.status !== 200) broken++;
  console.log(`  ${res.status}  ${url}`);
}
console.log(broken ? `\n  ${broken} page(s) need a look.\n` : "\n  All pages answer 200.\n");

console.log("2. PageSpeed (goal: mobile 90 or more, LCP under 2.5 s)\n");
const token = execFileSync("gcloud", ["auth", "print-access-token"]).toString().trim();
for (const path of PSI_PAGES) {
  for (const strategy of ["mobile", "desktop"]) {
    // A fresh query string, because PageSpeed returns cached results for a URL tested minutes ago.
    const target = `${SITE}${path}?psi=${Date.now()}`;
    const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(target)}&strategy=${strategy}&category=performance&category=seo`;
    const data = await fetch(api, {
      headers: { authorization: `Bearer ${token}`, "x-goog-user-project": "plantalk-website" },
    }).then((res) => res.json());
    if (data.error) {
      console.log(`  ${path} ${strategy}: ${data.error.message}`);
      continue;
    }
    const { categories: c, audits: a } = data.lighthouseResult;
    console.log(
      `  ${path.padEnd(18)} ${strategy.padEnd(8)} performance ${Math.round(c.performance.score * 100)}  SEO ${Math.round(c.seo.score * 100)}  LCP ${a["largest-contentful-paint"].displayValue}  CLS ${a["cumulative-layout-shift"].displayValue}`,
    );
  }
}

console.log("\n3. AI assistants, last 30 days\n");
execFileSync("node", [new URL("./ai-traffic.mjs", import.meta.url).pathname, "30"], { stdio: "inherit" });
