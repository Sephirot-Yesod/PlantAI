import type { Metadata } from "next";
import Link from "next/link";
import { Emoji, Squiggle } from "@/components/Decor";
import { StoreBadges } from "@/components/StoreBadges";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="wrap flex flex-col items-center py-24 text-center md:py-32">
      <div className="relative">
        <Emoji face="blue" size={120} className="drop-shadow-md" />
        <Squiggle width={44} className="absolute -top-4 -right-8 rotate-12" />
      </div>
      <h1 className="h-hero mt-8">
        This page wilted <span aria-hidden="true" className="font-normal">🥀</span>
      </h1>
      <p className="t-body mt-4 max-w-md">
        We couldn&apos;t find what you were looking for. It may have moved, or the link may be wrong.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-black caret">
          Go to the home page
        </Link>
        <Link href="/support" className="btn btn-lime caret">
          Get support
        </Link>
      </div>
      <StoreBadges size="sm" className="mt-12 justify-center" />
    </section>
  );
}
