# plantalk.ai

The website for **Plantalk AI**, the free AI plant care app for iPhone, iPad and Android by Plantalk LLC.

- App Store: https://apps.apple.com/app/plantalk-ai/id6753168877
- Google Play: https://play.google.com/store/apps/details?id=plantalk.ai.app

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

The support form needs `RESEND_API_KEY` and `CONTACT_EMAIL` in `.env.local` (and in the host's environment).

## Deploy (Google Cloud Run)

Hosted on Cloud Run in its own GCP project, `plantalk-website` (region `us-central1`, service `plantalk-website`). The `Dockerfile` builds a standalone Next.js server; `.gcloudignore` keeps `.env*` and build output out of the upload.

```bash
gcloud run deploy plantalk-website --source . --region us-central1 --project plantalk-website \
  --memory 2Gi --cpu 2 --min-instances 1 --max-instances 3 --port 8080
```

After a deploy that changes what pages say, run `npm run indexnow` (or `npm run indexnow -- /support` for single pages). It tells Bing and the other [IndexNow](https://www.indexnow.org) search engines to recrawl now; the key file is served at `/<INDEXNOW_KEY>.txt`. If you change a page's text, also update its date in `PAGE_UPDATED` (`src/lib/site.ts`), which feeds the sitemap's lastmod.

Contact form secrets (Secret Manager), once:

```bash
printf %s "re_..." | gcloud secrets create resend-api-key --data-file=- --project plantalk-website
printf %s "you@example.com" | gcloud secrets create contact-email --data-file=- --project plantalk-website
gcloud run services update plantalk-website --region us-central1 --project plantalk-website \
  --set-secrets RESEND_API_KEY=resend-api-key:latest,CONTACT_EMAIL=contact-email:latest
```

The runtime service account needs `roles/secretmanager.secretAccessor` on both secrets.

plantalk.ai is served through a global external Application Load Balancer in the same project (static IP `plantalk-ip`, Certificate Manager certificate `plantalk-ai-cert` with DNS authorization, URL maps `plantalk-urlmap` and `plantalk-http-redirect`, which send www and plain HTTP to https://plantalk.ai). `/_next/image` and `/_next/static/*` go through a second backend, `plantalk-backend-cdn`, with Cloud CDN (cache mode USE_ORIGIN_HEADERS, request logging on), so each optimized image is made once and then served from Google's edge. Pages are not cached, and asset URLs are content-hashed, so redeploying the Cloud Run service needs no load balancer changes or cache invalidation.

Page requests go through `plantalk-backend`. Its request logging is what `npm run ai-traffic [days]` reads to count AI crawler and assistant fetches and visitors referred by AI assistants. Turn it on once with `gcloud compute backend-services update plantalk-backend --global --enable-logging --logging-sample-rate=1 --project plantalk-website`.

The service only accepts traffic from the load balancer (`--ingress internal-and-cloud-load-balancing`), so the run.app address returns 404 and plantalk.ai is the only way in. Redeploys keep this setting. To open run.app again for testing: `gcloud run services update plantalk-website --ingress all --region us-central1 --project plantalk-website`.

Keep the service at 2 GiB and 2 CPUs: on-demand image optimization ran a 512 MiB instance out of memory on a cold page load, so `next.config.ts` serves WebP only.

## Where things live

| What | Where |
|------|-------|
| App facts, store links, FAQ | `src/lib/site.ts` (change facts here, not in pages) |
| Home page | `src/app/page.tsx` |
| Support page and contact form | `src/app/support/page.tsx`, `src/components/ContactForm.tsx`, `src/app/api/contact/route.ts` |
| "What's new" | `src/lib/app-store.ts`: read from Apple's lookup API, refreshed every 12 hours, with a stored fallback in `site.ts` |
| Smart store link | `/download` sends iPhones to the App Store and Android phones to Google Play |
| Legal pages | `/privacy`, `/terms`, `/delete-account` show the policies published on the Plantiemoji store (`lib/policies.ts`, `components/PolicyPage.tsx`). They refresh at most every 6 hours, keep only headings, paragraphs, lists, bold and links, and render them as text. Edit a policy in Shopify, not here. A failed refresh keeps the last good copy |
| Redirects | `next.config.ts`: the old store addresses `/pages/privacy-policy` (used by both app store listings), `/pages/terms-of-use` and `/pages/account-deletion` go to the legal pages above; every other Shopify path (`/pages/*`, `/policies/*`, `/products/*`…) goes to the store |
| Share image | `src/app/opengraph-image.tsx` |
| Search tags | `src/lib/seo.ts` `pageMetadata`: canonical URL, share tags and the robots tag (large image previews) for every page |
| Feature pages | `/plant-identifier`, `/plant-health`, `/watering-reminders`, `/ai-plant-assistant`, `/plantiemoji-sensor`: content in `src/lib/features.ts`, one layout in `components/FeaturePage.tsx`. Claims come only from the store listings, release notes, support page and FAQ; change a page's `updated` date when its text changes (it feeds the page and the sitemap) |
| Monthly check | `npm run monthly-check`: every sitemap page answers 200, PageSpeed for the home and a feature page, and the AI traffic report |
| Crawler files | `robots.ts` (open to all crawlers); `sitemap.ts`, whose lastmod comes from `PAGE_UPDATED`, the App Store release date and each policy's "Last updated" line; `llms.txt/route.ts`; the IndexNow key route |
| Design system | `src/app/globals.css` mirrors the new Plantiemoji store design (Figma "G - 光合植语 - 2609", TouchShop brand guide): lime #C2F277 as the anchor, plus pastels of the brand guide's sub colours (sky, sun, blush, mint, lilac, tangerine, cream) with saturated `*-2` versions for shapes, icon circles and the `.hl` title highlighter; forest #006443 statement band; glow backgrounds `.hero-sky`, `.sky-glow`, `.lime-glow`, `.mesh` (glows fade out inside their band); Poppins; 40 px hero, 32 px centred section titles with an emoji; 48 px pill buttons; 24 px cards; 1280 px content width |
| Page patterns | Copied from the store design: lime announcement bar with arrows, hero on the original site's jungle photo (`src/assets/brand/jungle.jpg`) in natural colours, melting into frosted glass behind the text (`.hero-photo`, `.hero-photo-veil`), a basil photo card, the phone and a painted face, curved bottom and mood strip (`MoodStrip`), emoji-badge cards, "Act I/II/III" switch (`StepTabs`) on lilac, forest statement band, product-style app card, cream "What's …?" block and pastel bento, chat-bubble wall on sky, lime app band with QR codes, mint FAQ accordion, lime footer with the emoji row |
| Painted emoji faces | `src/assets/faces` and `src/assets/brand/emoji-row.webp` were cut from 2x renders of the Figma prototype. Replace them with original exports from the designers when you have them (same file names) |
| UI fragments | `src/assets/fragments`: close crops of real app UI (task list, light range, health chart, plant cards, calendar, quiz, weather tip…) cut from the App Store screenshots, shown with `components/Fragment.tsx` so the page doesn't repeat whole phones |
| Other brand art | `src/assets/brand`: flat smiling face (store favicon), squiggle, sensor photo, basil photo and phone shot from plantiemoji.com |
| QR codes | `src/assets/qr` (App Store, Google Play with `utm_medium=qr`). Made with macOS Core Image and checked by decoding; regenerate if the store links change |

## Updating screenshots

App screens in `src/assets/screens` are cropped from the App Store screenshots (phone screen at x 210–1079, y 815–2702 of the 1290×2803 originals). Full store cards are in `src/assets/cards`. When the store screenshots change, re-export both.

Store badges in `src/assets/badges` are the official artwork from Apple and Google. Don't edit them.
