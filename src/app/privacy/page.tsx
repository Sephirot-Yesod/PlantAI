import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { getPolicy, POLICIES } from "@/lib/policies";
import { pageMetadata } from "@/lib/seo";

// Refreshed from the Plantiemoji store at most every 6 hours (see lib/policies.ts).
export const revalidate = 21600;

// The tab title follows the store page's own heading. The fetch is shared with the page.
export async function generateMetadata(): Promise<Metadata> {
  const policy = await getPolicy("privacy");
  return pageMetadata({
    title: policy?.title ?? POLICIES.privacy.title,
    shareTitle: "Plantalk AI privacy policy",
    description: "The Plantalk AI privacy policy: what information is collected, how it's used and the choices you have.",
    path: "/privacy",
  });
}

export default async function Page() {
  return <PolicyPage meta={POLICIES.privacy} policy={await getPolicy("privacy")} />;
}
