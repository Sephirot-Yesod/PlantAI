import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { getPolicy, POLICIES } from "@/lib/policies";
import { pageMetadata } from "@/lib/seo";

// Refreshed from the Plantiemoji store at most every 6 hours (see lib/policies.ts).
export const revalidate = 21600;

// The tab title follows the store page's own heading. The fetch is shared with the page.
export async function generateMetadata(): Promise<Metadata> {
  const policy = await getPolicy("deletion");
  return pageMetadata({
    title: policy?.title ?? POLICIES.deletion.title,
    shareTitle: "Delete your Plantalk AI account",
    description: "How to delete your Plantalk AI account in the app or by email, which data is deleted or kept, and how long deletion takes.",
    path: "/delete-account",
  });
}

export default async function Page() {
  return <PolicyPage meta={POLICIES.deletion} policy={await getPolicy("deletion")} />;
}
