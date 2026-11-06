import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Open to all crawlers, including AI search assistants.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
