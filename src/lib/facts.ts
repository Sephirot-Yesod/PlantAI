import { ANDROID_APK, ANDROID_PATH, androidVersion } from "./android";
import { formatReleaseDate, type Release } from "./app-store";
import { COMPANY, COMPANY_ADDRESS, FIRST_RELEASE_DATE, LANGUAGES, SITE_URL, SUPPORT_EMAIL } from "./site";

export type Fact = { label: string; value: string; href?: string };

// The app's key facts as one list: the home page's "At a Glance" table and /llms.txt both
// read it, so people, search engines and AI assistants see the same facts.
export function appFacts(release: Release): Fact[] {
  return [
    { label: "Made by", value: `${COMPANY}, ${COMPANY_ADDRESS.city}, Texas` },
    {
      label: "What it does",
      value: "Identifies plants from a photo, plans daily care, tracks plant health and answers plant questions",
    },
    { label: "Price", value: "Free to download, with an optional Pro subscription" },
    {
      label: "Works on",
      value: `iPhone and iPad with iOS 15 or later, and ${ANDROID_APK ? androidVersion(ANDROID_APK) : "Android"}`,
    },
    { label: "Language", value: LANGUAGES },
    { label: "Latest iOS version", value: `${release.version}, released ${formatReleaseDate(release.date)}` },
    ...(ANDROID_APK
      ? [
          {
            label: "Android without Google Play",
            value: `Version ${ANDROID_APK.version} as an APK download at ${SITE_URL.replace("https://", "")}${ANDROID_PATH}`,
            href: ANDROID_PATH,
          },
        ]
      : []),
    { label: "First released", value: `${formatReleaseDate(FIRST_RELEASE_DATE)}, on the App Store` },
    { label: "Plant sensor", value: "Optional: works with Plantiemoji for live readings" },
    { label: "Privacy", value: "No tracking across other companies' apps, and location only with permission" },
    { label: "Support", value: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
  ];
}
