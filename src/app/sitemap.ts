import type { MetadataRoute } from "next";
import { getLatestRelease } from "@/lib/app-store";
import { FEATURES } from "@/lib/features";
import { getPolicy, policyUpdated, type PolicyKey } from "@/lib/policies";
import { PAGE_UPDATED, SITE_URL } from "@/lib/site";

// Refreshed with the App Store version and the store's policy pages, like the pages themselves.
export const revalidate = 21600;

const iso = (date: string) => new Date(date).toISOString();
const latest = (...dates: string[]) => new Date(Math.max(...dates.map((d) => Date.parse(d)))).toISOString();

// lastmod is when a page's text last changed. Bing uses it to choose what to recrawl and asks
// for true dates only (Bing Webmaster Blog, July 2025). A wrong date is worse than none, so a
// legal page whose text has no "Last updated" line gets no date.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const release = await getLatestRelease();
  const policyDate = async (key: PolicyKey) => {
    const policy = await getPolicy(key);
    return (policy && policyUpdated(policy)) ?? undefined;
  };
  // One at a time: the store rate-limits bursts of page requests.
  const privacy = await policyDate("privacy");
  const terms = await policyDate("terms");
  const deletion = await policyDate("deletion");

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: latest(PAGE_UPDATED.home, release.date),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...FEATURES.map((f) => ({
      url: `${SITE_URL}${f.path}`,
      lastModified: iso(f.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/support`, lastModified: iso(PAGE_UPDATED.support), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, lastModified: privacy, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: terms, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/delete-account`, lastModified: deletion, changeFrequency: "yearly", priority: 0.3 },
  ];
}
