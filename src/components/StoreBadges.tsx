import Image from "next/image";
import appStoreBadge from "@/assets/badges/app-store.svg";
import googlePlayBadge from "@/assets/badges/google-play.png";
import { APP_STORE_URL, PLAY_URL } from "@/lib/site";

// Official badges from Apple and Google, unmodified (Google's transparent padding trimmed).
export function StoreBadges({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const h = size === "sm" ? 40 : 52;
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`} aria-label="Download Plantalk AI">
      <li>
        <a href={APP_STORE_URL} className="block rounded-[10px]">
          <Image
            src={appStoreBadge}
            alt="Download on the App Store"
            height={h}
            width={Math.round((h * 119.664) / 40)}
            unoptimized
          />
        </a>
      </li>
      <li>
        <a href={PLAY_URL} className="block rounded-[10px]">
          <Image
            src={googlePlayBadge}
            alt="Get it on Google Play"
            height={h}
            width={Math.round((h * 564) / 168)}
          />
        </a>
      </li>
    </ul>
  );
}
