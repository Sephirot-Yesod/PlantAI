import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { getPolicy, POLICIES } from "@/lib/policies";

// Refreshed from the Plantiemoji store at most every 6 hours (see lib/policies.ts).
export const revalidate = 21600;

// The tab title follows the store page's own heading. The fetch is shared with the page.
export async function generateMetadata(): Promise<Metadata> {
  const policy = await getPolicy("terms");
  return {
    title: policy?.title ?? POLICIES.terms.title,
    description: "The terms of use for Plantalk AI and Plantiemoji.",
    alternates: { canonical: "/terms" },
  };
}

export default async function Page() {
  return <PolicyPage meta={POLICIES.terms} policy={await getPolicy("terms")} />;
}
