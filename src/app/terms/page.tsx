import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { getPolicy, POLICIES } from "@/lib/policies";
import { pageMetadata } from "@/lib/seo";

// Refreshed from the Plantiemoji store at most every 6 hours (see lib/policies.ts).
export const revalidate = 21600;

// The tab title follows the store page's own heading. The fetch is shared with the page.
export async function generateMetadata(): Promise<Metadata> {
  const policy = await getPolicy("terms");
  return pageMetadata({
    title: policy?.title ?? POLICIES.terms.title,
    shareTitle: "Plantalk AI and Plantiemoji terms of use",
    description: "The terms of use for Plantalk AI and Plantiemoji: eligibility, accounts, orders and payments, acceptable use, returns and refunds, and your rights.",
    path: "/terms",
  });
}

export default async function Page() {
  return <PolicyPage meta={POLICIES.terms} policy={await getPolicy("terms")} />;
}
