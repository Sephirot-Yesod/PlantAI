import type { Metadata } from "next";
import { APP_NAME, OG_ALT } from "./site";

// The shared share image from app/opengraph-image.tsx. A page that sets its own openGraph
// replaces the layout's whole openGraph, image included, so every page names it again here.
const SHARE_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, type: "image/png", alt: OG_ALT };

/**
 * Title, description, canonical URL and share tags for one page. `shareTitle` is what link
 * previews show; `title` (the tab title) falls back to the layout's default when left out.
 */
export function pageMetadata({
  title,
  shareTitle,
  description,
  path,
}: {
  title?: string;
  shareTitle: string;
  description: string;
  path: string;
}): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    // Allows large image previews (which Google Discover needs) and snippets of any length,
    // in Google Search and its AI features alike. Bing reads the same tag.
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    openGraph: {
      type: "website",
      siteName: APP_NAME,
      locale: "en_US",
      url: path,
      title: shareTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [SHARE_IMAGE] },
  };
}
