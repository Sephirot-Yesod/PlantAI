import type { Metadata } from "next";
import Link from "next/link";
import { Emoji, Squiggle } from "@/components/Decor";

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
      <nav aria-labelledby="popular-title" className="mt-12">
        <h2 id="popular-title" className="text-base font-bold">
          Or try one of these
        </h2>
        <ul className="mt-2 flex flex-wrap justify-center gap-x-6">
          {[
            { href: "/guides", label: "Plant care guides" },
            { href: "/plant-identifier", label: "Identify a plant" },
            { href: "/#faq", label: "Common questions" },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="prose-link inline-block py-2">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
