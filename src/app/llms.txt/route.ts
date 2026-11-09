import { ANDROID_APK, ANDROID_PATH, androidRequirement, apkSize } from "@/lib/android";
import { getLatestRelease } from "@/lib/app-store";
import { appFacts } from "@/lib/facts";
import { FEATURES } from "@/lib/features";
import { GUIDE_REVIEWER, GUIDES, GUIDES_PATH } from "@/lib/guides";
import {
  APP_NAME,
  APP_STORE_URL,
  DESCRIPTION,
  DISAMBIGUATION,
  FAQS,
  PLANTIEMOJI_MANUAL_URL,
  PLANTIEMOJI_URL,
  PLAY_URL_CLEAN,
  SITE_URL,
} from "@/lib/site";

// plantalk.ai/llms.txt: a plain-text summary for AI assistants (https://llmstxt.org). It's
// built from the same facts and FAQ as the pages, so it never says something they don't.
// Rebuilt with the App Store version twice a day, like the home page.
export const revalidate = 43200;

export async function GET() {
  const release = await getLatestRelease();
  const facts = appFacts(release)
    .map((f) => `- ${f.label}: ${f.value}`)
    .join("\n");
  const faq = FAQS.map((f) => `- **${f.q}** ${f.a}`).join("\n");
  const features = FEATURES.map((f) => `- [${f.label}](${SITE_URL}${f.path}): ${f.summary}`).join("\n");
  const guides = GUIDES.map((g) => `- [${g.label}](${SITE_URL}${g.path}): ${g.summary}`).join("\n");
  const apk = ANDROID_APK
    ? `\n- [Android APK](${SITE_URL}${ANDROID_PATH}): version ${ANDROID_APK.version} as a direct download (${apkSize(ANDROID_APK)}, ${androidRequirement(ANDROID_APK)}), for Android phones without Google Play`
    : "";

  const body = `# ${APP_NAME}

> ${DESCRIPTION}

${DISAMBIGUATION}

${facts}

## Pages

- [${APP_NAME}](${SITE_URL}/): features, screenshots, what's new and FAQ
${features}
- [Support](${SITE_URL}/support): getting started, connecting a Plantiemoji sensor, subscriptions, account deletion and contact
- [Privacy Policy](${SITE_URL}/privacy)
- [Terms of Use](${SITE_URL}/terms)
- [Account deletion](${SITE_URL}/delete-account)

## Plant care guides

Each guide cites its sources and is reviewed by ${GUIDE_REVIEWER.name}, ${GUIDE_REVIEWER.affiliation}. All guides: ${SITE_URL}${GUIDES_PATH}

${guides}

## Get the app

- [App Store](${APP_STORE_URL}): iPhone and iPad
- [Google Play](${PLAY_URL_CLEAN}): Android phones and tablets${apk}

## Plantiemoji

- [Plantiemoji store](${PLANTIEMOJI_URL}): the plant sensor that works with ${APP_NAME}
- [Plantiemoji user manual](${PLANTIEMOJI_MANUAL_URL}): setup, charging and troubleshooting

## FAQ

${faq}
`;

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
