import { FeaturePage } from "@/components/FeaturePage";
import { getFeature } from "@/lib/features";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("plant-health");

export const metadata = pageMetadata({
  title: feature.title,
  shareTitle: feature.shareTitle,
  description: feature.description,
  path: feature.path,
});

export default function Page() {
  return <FeaturePage feature={feature} />;
}
