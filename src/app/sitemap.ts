import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// No lastModified: a wrong date is worse than none.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/support`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/delete-account`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
