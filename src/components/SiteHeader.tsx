import Image from "next/image";
import Link from "next/link";
import icon from "@/assets/icon.webp";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { PLANTIEMOJI_URL } from "@/lib/site";

const NAV = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#plantiemoji", label: "Plantiemoji" },
  { href: "/#faq", label: "FAQ" },
  { href: "/support", label: "Support" },
];

const ANNOUNCEMENTS = [
  { text: "Plantalk AI is free on iPhone, iPad and Android.", link: { label: "Get the app", href: "/#download" } },
  { text: "Works with Plantiemoji, the plant sensor with an emoji screen.", link: { label: "Shop Plantiemoji", href: PLANTIEMOJI_URL } },
  { text: "Got a plant question? Ask the Plantie Assistant.", link: { label: "See how", href: "/#assistant" } },
];

// Header layout from the Plantiemoji store: logo left, centred bold nav, action right.
export function SiteHeader() {
  return (
    <>
      <AnnouncementBar messages={ANNOUNCEMENTS} />
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/85">
        <div className="wrap relative flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-xl text-[1.15rem] font-semibold tracking-tight whitespace-nowrap text-ink sm:text-[1.35rem]"
          >
            <Image src={icon} alt="" width={32} height={32} className="rounded-[9px]" />
            Plantalk AI
          </Link>

          <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-8 text-base font-bold text-ink">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="rounded-md py-2 hover:underline hover:underline-offset-8">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <Link href="/support" className="rounded-full px-2.5 py-2 text-sm font-bold whitespace-nowrap lg:hidden">
              Support
            </Link>
            <Link href="/#download" className="btn btn-lime btn-sm caret">
              Get the app
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
