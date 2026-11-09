import { ANDROID_APK, ANDROID_PATH } from "./android";

// Single source of truth for facts about Plantalk AI.
// Everything here comes from the App Store and Google Play listings, the app's
// version history and the privacy policy. Change facts here, not in pages.

export const SITE_URL = "https://plantalk.ai";
export const APP_NAME = "Plantalk AI";
export const COMPANY = "Plantalk LLC";
export const COMPANY_ADDRESS = {
  street: "4899 Highway 6 Ste 121A",
  city: "Missouri City",
  region: "TX",
  postalCode: "77459",
  country: "US",
};
export const SUPPORT_EMAIL = "hi@plantalk.ai";

// These paths redirect to the current policies (see next.config.ts).
export const PRIVACY_PATH = "/privacy";
export const TERMS_PATH = "/terms";
export const DELETE_ACCOUNT_PATH = "/delete-account";

export const APP_STORE_ID = "6753168877";
// No country code, so Apple sends each visitor to their own storefront.
export const APP_STORE_URL = "https://apps.apple.com/app/plantalk-ai/id6753168877";
export const PLAY_PACKAGE = "plantalk.ai.app";
export const PLAY_URL_CLEAN = `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}`;
// The referrer shows up as utm_source=plantalk.ai in Play Console acquisition reports.
export const PLAY_URL = `${PLAY_URL_CLEAN}&referrer=utm_source%3Dplantalk.ai%26utm_medium%3Dwebsite`;

export const PLANTIEMOJI_URL = "https://www.plantiemoji.com/";
export const PLANTIEMOJI_MANUAL_URL = "https://www.plantiemoji.com/pages/user-manual";

// The company's public profiles. Structured data lists them as sameAs, so search engines
// and AI assistants can connect them to this site.
export const APPLE_DEVELOPER_URL = "https://apps.apple.com/us/developer/plantalk-llc/id6829752111";
export const PLAY_DEVELOPER_URL = "https://play.google.com/store/apps/developer?id=Plantalk+LLC";
export const INSTAGRAM_URL = "https://www.instagram.com/plantiemoji/";

// First App Store release (releaseDate in Apple's lookup API) and the app's languages.
export const FIRST_RELEASE_DATE = "2026-04-15";
export const LANGUAGES = "English";

// When each page's own text last changed, for the sitemap's lastmod. Change a date only when
// what the page says changes, not for styling. The home page also counts each App Store
// release, and the legal pages use the "Last updated" line in their own text.
export const PAGE_UPDATED = { home: "2026-11-09", support: "2026-11-08" } as const;

// IndexNow (https://www.indexnow.org): served at /<key>.txt by app/<key>.txt/route.ts, so
// rename that folder if this changes. `npm run indexnow` pings with it after a deploy.
export const INDEXNOW_KEY = "d38798170a31bca83cd2d9d36fbd2799";
export const TAGLINE = "Your AI plant care companion";
// Keep this sentence identical everywhere (site, stores, press): search engines and
// AI assistants trust facts that repeat across sources.
export const DESCRIPTION =
  "Plantalk AI is a free plant care app for iPhone, iPad and Android. Add plants with a photo, get daily care tasks and a care calendar, track each plant's health, and ask an AI assistant your plant questions.";
export const META_DESCRIPTION =
  "Free plant care app for iPhone, iPad and Android. Add plants with a photo, sort daily care, track plant health and ask an AI assistant.";
export const ORG_DESCRIPTION =
  "Plantalk LLC makes Plantalk AI, a plant care app for iPhone, iPad and Android, and Plantiemoji, a plant sensor with an emoji screen.";
// Unrelated products have similar names, so say plainly which one this is.
export const DISAMBIGUATION =
  "Plantalk AI is not affiliated with other products or apps called Plant Talk or PlantTalk.";
// Alt text of the shared share image (app/opengraph-image.tsx).
export const OG_ALT = "Plantalk AI: your AI plant care companion. Free on iPhone, iPad and Android.";

export const PLATFORMS = {
  ios: "iPhone and iPod touch with iOS 15 or later",
  ipad: "iPad with iPadOS 15 or later",
  android: "Android phones and tablets through Google Play",
};

// `links` turns exact phrases in the answer into links on the page.
export type Faq = { q: string; a: string; links?: Record<string, string> };

export const FAQS: Faq[] = [
  {
    q: "What is Plantalk AI?",
    a: "Plantalk AI is a free plant care app for iPhone, iPad and Android. You add plants with a photo, and each one gets a profile, daily care tasks, a care calendar and a health score you can follow over time. You can ask the built-in Plantie Assistant plant questions, and connect a Plantiemoji sensor for live readings.",
  },
  {
    q: "Who makes Plantalk AI?",
    a: `Plantalk AI is made by Plantalk LLC, based in Missouri City, Texas. Plantalk also makes Plantiemoji, a plant sensor with an emoji screen that works with the app. You can reach the team at ${SUPPORT_EMAIL}.`,
    links: { [SUPPORT_EMAIL]: `mailto:${SUPPORT_EMAIL}` },
  },
  {
    q: "Is Plantalk AI free?",
    a: "Yes. Plantalk AI is free to download from the App Store and Google Play. The app also offers optional Pro access as an in-app subscription, which is billed and managed through your Apple or Google account.",
  },
  {
    q: "Which phones and tablets does it work on?",
    a: "iPhone and iPod touch with iOS 15 or later, iPad with iPadOS 15 or later, and Android devices through Google Play. The app is in English. Features can differ slightly between the iPhone and Android versions.",
  },
  // Only while /android offers the APK (lib/android.ts).
  ...(ANDROID_APK
    ? [
        {
          q: "Can I install Plantalk AI on Android without Google Play?",
          a: "Yes. You can download the app file (APK) at plantalk.ai/android and install it yourself. It's the same app as on Google Play. Google Play is still the easier choice if your phone has it, because it keeps the app up to date.",
          links: { "plantalk.ai/android": ANDROID_PATH },
        },
      ]
    : []),
  {
    q: "Can Plantalk AI identify a plant from a photo?",
    a: "Yes. Tap + on the Plants screen, then take a photo or choose one from your library. Plantalk AI shows what it detected, you confirm, and the plant gets its own profile with Overview, Environment and Visual health views.",
  },
  {
    q: "Can Plantalk AI tell what's wrong with my plant?",
    a: "It can help. Each plant has a Visual health view, the home screen points out plants that need attention, and you can send the Plantie Assistant a photo and ask about symptoms such as yellow leaves or drooping. Treat the answers as guidance; for serious pest or disease problems, check with a local nursery as well.",
  },
  {
    q: "Does Plantalk AI remind me when to water my plants?",
    a: "Yes. Each plant gets a care schedule, and the Care screen lists what to water and check each day. The care calendar shows every plant's routine across the month, and with location on, tips adjust for local heat and humidity.",
  },
  {
    q: "Do I need a Plantiemoji sensor?",
    a: "No. Without a sensor, Plantalk AI still identifies plants from photos and gives you care tasks, reminders, plant details and the AI assistant. A Plantiemoji sensor adds live readings of light, temperature, humidity, air pressure and soil moisture, plus VPD and DLI history.",
  },
  {
    q: "What's the difference between Plantalk AI and Plantiemoji?",
    a: "Plantalk AI is the app. Plantiemoji is a plant sensor with an emoji screen, sold separately at plantiemoji.com. The app works on its own. With a sensor, the plant's Environment view adds live readings, and the sensor's screen shows a face you can design in the app.",
    links: { "plantiemoji.com": PLANTIEMOJI_URL },
  },
  {
    q: "Does Plantalk AI use my location?",
    a: "Only if you allow it. With permission, the app uses your approximate location to bring local weather into care tips and schedules, for example a reminder to check soil early on a hot day. You can turn location off in your phone's settings at any time.",
  },
  {
    q: "Can I plan plant care before a trip?",
    a: "Yes. Away mode lets you plan care before you leave and write notes for whoever looks after your plants. It's available on iPhone and iPad from version 1.0.6.",
  },
  {
    q: "How do I delete my account and data?",
    a: `In the app, sign in, open the side menu on the home screen and choose Delete Account. If you can't sign in, email ${SUPPORT_EMAIL} from the address on your account. Deleting your account doesn't cancel an App Store or Google Play subscription, so cancel that in your store settings. Details are on our account deletion page.`,
    links: { "account deletion page": DELETE_ACCOUNT_PATH, [SUPPORT_EMAIL]: `mailto:${SUPPORT_EMAIL}` },
  },
  {
    q: "Is Plantalk AI the same as Plant Talk or PlantTalk?",
    a: "No. Plantalk AI, one word with one t, is a plant care app made by Plantalk LLC and the companion app for the Plantiemoji sensor. It isn't affiliated with other products or apps called Plant Talk or PlantTalk.",
  },
];

// Shown if the App Store lookup fails. Matches version 1.0.6 (27 Oct 2026).
export const FALLBACK_RELEASE = {
  version: "1.0.6",
  date: "2026-10-27T15:59:31Z",
  notes: [
    "Away mode: plan care before a trip and leave notes for a plant sitter.",
    "Plant pages now show a growth trend, issues, and care tasks.",
    "Environment adds VPD and DLI, with history, and flags a zero soil-moisture reading.",
    "Create device faces and install them on your device, including a Halloween look.",
    "Camera: tap to focus, pinch to zoom, and save photos to your album.",
    "Fixes for display sync, the care calendar, and sensor readings.",
  ],
};
