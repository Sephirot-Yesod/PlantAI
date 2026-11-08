// Tells Bing and the other IndexNow search engines (https://www.indexnow.org) which pages
// changed, so they recrawl them within minutes instead of days. Run it after a deploy that
// changes what pages say:
//   npm run indexnow                    every page in the live sitemap
//   npm run indexnow -- / /support      only these pages
import { readFileSync } from "node:fs";

const SITE = "https://plantalk.ai";

const siteTs = readFileSync(new URL("../src/lib/site.ts", import.meta.url), "utf8");
const key = siteTs.match(/INDEXNOW_KEY = "([A-Za-z0-9-]{8,128})"/)?.[1];
if (!key) throw new Error("INDEXNOW_KEY not found in src/lib/site.ts");

// The search engines fetch this file to check the key, so it has to be live first.
const keyLocation = `${SITE}/${key}.txt`;
const served = await fetch(keyLocation).then((res) => (res.ok ? res.text() : ""));
if (served.trim() !== key) throw new Error(`${keyLocation} doesn't serve the key yet. Deploy first.`);

const paths = process.argv.slice(2);
const urlList = paths.length
  ? paths.map((p) => new URL(p, SITE).href)
  : [...(await fetch(`${SITE}/sitemap.xml`).then((res) => res.text())).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) throw new Error("No URLs to submit");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key, keyLocation, urlList }),
});
// 200: accepted. 202: accepted, key check still pending. Anything else is an error.
console.log(`IndexNow answered ${res.status} for ${urlList.length} URLs:\n  ${urlList.join("\n  ")}`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
