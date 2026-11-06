import type { NextConfig } from "next";
import path from "path";

const STORE = "https://www.plantiemoji.com";

const nextConfig: NextConfig = {
  // The Docker build (Cloud Run) sets NEXT_OUTPUT=standalone for a small self-contained
  // server; local `npm run build && npm start` is unchanged.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // WebP only. AVIF files are a little smaller, but encoding them on request is slow and
    // memory-hungry: a cold page load (about 35 images at once) ran a 512 MiB Cloud Run
    // instance out of memory. Optimized images are cached at the CDN in front of the site.
    formats: ["image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // HTTPS only (Cloud Run doesn't add HSTS itself). No includeSubDomains, so other
          // plantalk.ai subdomains are unaffected.
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // plantalk.ai used to be a Shopify domain that forwarded every path to the store.
      // The legal pages live on this site now, so their old store addresses come here,
      // including /pages/privacy-policy, the privacy link in both app store listings.
      // Every other store-style path keeps forwarding to the store.
      { source: "/pages/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/pages/terms-of-use", destination: "/terms", permanent: true },
      { source: "/pages/account-deletion", destination: "/delete-account", permanent: true },
      { source: "/pages/:path*", destination: `${STORE}/pages/:path*`, permanent: true },
      { source: "/policies/:path*", destination: `${STORE}/policies/:path*`, permanent: true },
      { source: "/products/:path*", destination: `${STORE}/products/:path*`, permanent: true },
      { source: "/collections/:path*", destination: `${STORE}/collections/:path*`, permanent: true },
      { source: "/blogs/:path*", destination: `${STORE}/blogs/:path*`, permanent: true },
      { source: "/cart", destination: `${STORE}/cart`, permanent: true },
      { source: "/account/:path*", destination: `${STORE}/account/:path*`, permanent: true },
      // Other names people use for the legal pages.
      { source: "/cookies", destination: "/privacy", permanent: false },
      { source: "/account-deletion", destination: "/delete-account", permanent: true },
      // Pages from the previous version of this site.
      { source: "/contact", destination: "/support", permanent: true },
    ];
  },
};

export default nextConfig;
