import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import appPhone from "@/assets/brand/app-phone.webp";
import basilHero from "@/assets/brand/basil-hero.webp";
import jungle from "@/assets/brand/jungle.jpg";
import wands from "@/assets/brand/wands.webp";
import cardCareCalendar from "@/assets/cards/care-calendar.webp";
import cardCareToday from "@/assets/cards/care-today.webp";
import cardDiscover from "@/assets/cards/discover.webp";
import cardEnvironment from "@/assets/cards/environment.webp";
import cardFindMyMatch from "@/assets/cards/find-my-match.webp";
import cardHealth from "@/assets/cards/health-over-time.webp";
import cardPlantsHome from "@/assets/cards/plants-home.webp";
import fCalendar from "@/assets/fragments/calendar.webp";
import fHealthChart from "@/assets/fragments/health-chart.webp";
import fHomeSummary from "@/assets/fragments/home-summary.webp";
import fLightRange from "@/assets/fragments/light-range.webp";
import fPlantCards from "@/assets/fragments/plant-cards.webp";
import fPlantGroups from "@/assets/fragments/plant-groups.webp";
import fPortrait from "@/assets/fragments/portrait.webp";
import fQuiz from "@/assets/fragments/quiz.webp";
import fTaskRows from "@/assets/fragments/task-rows.webp";
import fWeather from "@/assets/fragments/weather-tip.webp";
import icon from "@/assets/icon.webp";
import qrAppStore from "@/assets/qr/app-store.svg";
import qrGooglePlay from "@/assets/qr/google-play.svg";
import careToday from "@/assets/screens/care-today.webp";
import discover from "@/assets/screens/discover.webp";
import environment from "@/assets/screens/environment.webp";
import findMyMatch from "@/assets/screens/find-my-match.webp";
import healthOverTime from "@/assets/screens/health-over-time.webp";
import plantsHome from "@/assets/screens/plants-home.webp";
import { Emoji, Squiggle, type Face } from "@/components/Decor";
import { Fragment } from "@/components/Fragment";
import { Icon, type IconName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { MoodStrip } from "@/components/MoodStrip";
import { Phone } from "@/components/Phone";
import { StepTabs, type Step } from "@/components/StepTabs";
import { StoreBadges } from "@/components/StoreBadges";
import { formatReleaseDate, getLatestRelease } from "@/lib/app-store";
import {
  APP_NAME,
  APP_STORE_URL,
  DESCRIPTION,
  FAQS,
  PLANTIEMOJI_MANUAL_URL,
  PLANTIEMOJI_URL,
  PLAY_URL,
  PLAY_URL_CLEAN,
  PRIVACY_PATH,
  SITE_URL,
  type Faq,
} from "@/lib/site";

// Re-read the App Store version and release notes twice a day.
export const revalidate = 43200;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const PROBLEMS: {
  face: Face;
  bg: string;
  fragment: StaticImageData;
  tilt: string;
  alt: string;
  title: string;
  body: string;
}[] = [
  {
    face: "orange",
    bg: "bg-sky",
    fragment: fTaskRows,
    tilt: "-rotate-2",
    alt: "Today's care list: water pix, funny and Anthurium",
    title: "Watering is a guessing game",
    body: "Care lists what to water each day, adjusted for local weather when you allow location.",
  },
  {
    face: "purple",
    bg: "bg-sun",
    fragment: fLightRange,
    tilt: "rotate-1",
    alt: "Ideal light and temperature ranges for a plant",
    title: "The right spot is hard to spot",
    body: "Each plant's page shows its ideal light and temperature ranges in plain words.",
  },
  {
    face: "blue",
    bg: "bg-blush",
    fragment: fHealthChart,
    tilt: "-rotate-1",
    alt: "Dynamic growth plan chart showing a plant's health score",
    title: "Trouble shows up late",
    body: "A health score and growth trend for every plant help you notice changes early.",
  },
];

const STEPS: Step[] = [
  {
    act: "Act I",
    title: "Snap",
    body: "Take a photo or pick one from your library. Plantalk AI identifies the plant and builds its profile.",
    screen: plantsHome,
    alt: "Plants home screen with plant cards",
    faces: ["yellow", "green"],
    tint: "linear-gradient(180deg, #fff8d6 0%, #ffe679 100%)",
  },
  {
    act: "Act II",
    title: "Care",
    body: "Care lists what to water and check each day, with tips that account for local weather when you allow location.",
    screen: careToday,
    alt: "Care screen with today's tasks and a weather tip",
    faces: ["orange", "blue"],
    tint: "linear-gradient(180deg, #e6f5fc 0%, #9fd6ea 100%)",
  },
  {
    act: "Act III",
    title: "Thrive",
    body: "A health score and growth trend show how each plant responds, so you can adjust before small problems grow.",
    screen: healthOverTime,
    alt: "Health over time chart for a plant",
    faces: ["teal", "purple"],
    tint: "linear-gradient(180deg, #f1fbe0 0%, #bfef70 100%)",
  },
];

const EXTRAS: { icon: IconName; title: string; body: string }[] = [
  { icon: "clinic", title: "Plant Clinic", body: "A shortcut on the home screen for checking on a plant that looks unwell." },
  { icon: "suitcase", title: "Away mode", body: "Plan care before a trip and leave notes for your plant sitter." },
  { icon: "cloud", title: "Weather-aware care", body: "With location on, tips adapt to local heat and humidity." },
  { icon: "heart", title: "Health over time", body: "Overall, Visual and Environment views for every plant." },
  { icon: "sprout", title: "Growth Energy", body: "Earn points as you keep up with care tasks." },
  { icon: "thermometer", title: "°C or °F", body: "Choose Celsius or Fahrenheit for every reading." },
];

// Icon circle colours, cycled so neighbouring items never share a colour.
const TONES = ["bg-sky-2", "bg-sun-2", "bg-blush-2", "bg-lime", "bg-[#d9c6ff]", "bg-[#ffc9a3]"];

const QUESTIONS: { face: Face; q: string }[][] = [
  [
    { face: "green", q: "My pothos is getting leggy. Would a spot closer to an east-facing window help?" },
    { face: "blue", q: "The tips of my calathea are turning crispy. Could it be the tap water rather than humidity?" },
  ],
  [
    { face: "purple", q: "My peace lily droops even when the soil feels damp. Should I wait before watering again?" },
    { face: "yellow", q: "Roots are peeking out of my snake plant's pot. Is it time to size up, or can it wait?" },
  ],
  [
    { face: "orange", q: "One of my monstera's lower leaves is turning yellow. The rest look happy. Is that normal?" },
    { face: "teal", q: "Here's a photo of a spot on my fiddle leaf fig. What could it be, and what should I check?" },
  ],
];

const GALLERY: { src: StaticImageData; alt: string }[] = [
  { src: cardPlantsHome, alt: "Your garden, at a glance: weather, health and every plant in one calm home." },
  { src: cardHealth, alt: "Health over time: track score, trend and care impact in one profile." },
  { src: cardEnvironment, alt: "Know the sweet spot: light and temperature ranges made easy to read." },
  { src: cardCareToday, alt: "Today's care, already sorted: daily priorities stay clear, timely and easy to act on." },
  { src: cardCareCalendar, alt: "Care calendar, by plant: see each plant's routine across the month." },
  { src: cardDiscover, alt: "Find plants that fit: search, explore, or start a guided match from Discover." },
  { src: cardFindMyMatch, alt: "Match by your home: choose light and care needs before choosing a plant." },
];

const TRUST: { icon: IconName; title: string; body: string }[] = [
  { icon: "sprout", title: "Free to download", body: "On the App Store and Google Play." },
  { icon: "shield", title: "No tracking", body: "No data used to track you across other companies' apps, per the App Store privacy details." },
  { icon: "pin", title: "Location is optional", body: "Used only with permission, to bring local weather into care tips." },
  { icon: "trash", title: "Delete any time", body: "From the app's side menu, or by email. Photos are never used for ads without consent." },
];

function withLinks(text: string, links?: Faq["links"]) {
  if (!links) return text;
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(${Object.keys(links).map(escape).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    links[part] ? (
      <a key={i} href={links[part]} className="prose-link">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

// Centred section title with a native emoji at the end, as on the store.
function SectionTitle({ children, emoji, sub, id }: { children: React.ReactNode; emoji?: string; sub?: string; id?: string }) {
  return (
    <div className="mx-auto max-w-[820px] text-center">
      <h2 id={id} className="h-section">
        {children}
        {emoji && (
          <span aria-hidden="true" className="ml-3 font-normal">
            {emoji}
          </span>
        )}
      </h2>
      {sub && <p className="t-small mx-auto mt-3 max-w-[640px] text-base">{sub}</p>}
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ink text-lime">
        <Icon name="check" className="h-4 w-4" />
      </span>
      <span>{children}</span>
    </li>
  );
}

// Status tags in the app's own wording, as small pastel pills.
function StatusPill({ tone, children, className = "" }: { tone: "blue" | "green" | "amber"; children: React.ReactNode; className?: string }) {
  const tones = {
    blue: "bg-[#dbe8fe] text-[#1d4ed8]",
    green: "bg-[#dcefc6] text-[#2f6b16]",
    amber: "bg-[#fde7b0] text-[#7a4b00]",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold shadow-[0_8px_20px_-10px_rgb(0_0_0/0.35)] ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

export default async function Home() {
  const release = await getLatestRelease();
  const releaseDate = formatReleaseDate(release.date);

  const appLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": `${SITE_URL}/#app`,
    name: APP_NAME,
    alternateName: "Plantalk",
    description: DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/icon.png`,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS 15.0 or later, iPadOS 15.0 or later, Android",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    installUrl: [APP_STORE_URL, PLAY_URL_CLEAN],
    sameAs: [APP_STORE_URL, PLAY_URL_CLEAN],
    screenshot: [plantsHome, careToday, healthOverTime, environment, findMyMatch].map((s) => `${SITE_URL}${s.src}`),
    featureList: [
      "Add plants with a photo and identify them",
      "Daily care tasks and a care calendar",
      "Plant health score and growth trend",
      "AI assistant for plant questions",
      "Away mode for trips",
      "Live readings from the Plantiemoji sensor",
    ],
    publisher: { "@id": `${SITE_URL}/#organization` },
    author: { "@id": `${SITE_URL}/#organization` },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      {/* Hero: soft blurred photo backdrop, crisp photo card + phone, curved bottom and mood strip. */}
      <section aria-labelledby="hero-title" className="relative">
        <div className="relative overflow-hidden bg-[#2f4a30]">
          {/* The original site's jungle photo in its natural colours. Behind the text it melts
              into frosted glass so the black type stays crisp. */}
          <Image
            src={jungle}
            alt=""
            fill
            loading="eager"
            placeholder="blur"
            sizes="100vw"
            className="hero-photo object-cover"
          />
          <div aria-hidden="true" className="hero-photo-veil absolute inset-0" />
          {/* Floating colour dots, like confetti in the brand illustrations. */}
          <span aria-hidden="true" className="absolute top-[14%] left-[46%] hidden h-4 w-4 rounded-full bg-blush-2 lg:block" />
          <span aria-hidden="true" className="absolute top-[70%] left-[42%] hidden h-3 w-3 rounded-full bg-blue/70 lg:block" />
          <span aria-hidden="true" className="absolute top-[8%] left-[8%] h-3 w-3 rounded-full bg-sun-2" />
          <div className="wrap relative grid items-center gap-12 pt-14 pb-40 lg:min-h-[690px] lg:grid-cols-[1.05fr_1fr] lg:pt-12 lg:pb-36">
            <div>
              <h1
                id="hero-title"
                className="text-[2.5rem] leading-[1.05] font-bold tracking-[-0.02em] text-balance sm:text-[3.25rem] lg:text-[3.6rem]"
              >
                Your AI plant <span className="hl [--hl:var(--color-sun-2)]">care companion</span>
              </h1>
              <p className="mt-5 max-w-[500px] text-[17px] leading-relaxed text-text">
                Snap a photo to add a plant. Plantalk AI sets up its profile, sorts today&apos;s care, tracks its health
                over time and answers your plant questions.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <a href="#download" className="btn btn-black caret">
                  Get the app
                </a>
                <a
                  href="#how-it-works"
                  className="font-bold text-ink underline decoration-ink/30 decoration-2 underline-offset-[6px] hover:decoration-ink"
                >
                  See how it works
                </a>
              </div>
            </div>

            <div className="relative mx-auto h-[420px] w-full max-w-[500px] sm:h-[500px] lg:h-[540px]">
              <div aria-hidden="true" className="absolute top-[6%] right-[4%] h-[78%] w-[72%] rotate-6 rounded-[40px] bg-blush-2/70" />
              <div className="absolute top-0 right-0 h-[86%] w-[80%] overflow-hidden rounded-[36px] border-[6px] border-white shadow-[0_40px_80px_-30px_rgb(20_40_10/0.55)]">
                <Image
                  src={basilHero}
                  alt="A basil plant with a Plantiemoji sensor showing a smiling face"
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1024px) 400px, 80vw"
                  className="object-cover object-[50%_28%]"
                />
              </div>
              <Squiggle width={58} className="absolute top-[30%] left-[6%] -rotate-12 drop-shadow-md" />
              <Phone
                src={plantsHome}
                alt="Plantalk AI home screen with plant cards marked Too dry and Healthy"
                className="absolute bottom-0 left-0 w-[44%] -rotate-[4deg]"
                sizes="(min-width: 1024px) 220px, 44vw"
              />
              <Emoji face="teal" size={88} className="absolute -top-6 -right-3 rotate-6 drop-shadow-xl" />
            </div>
          </div>
          <svg
            viewBox="0 0 1440 56"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-px h-10 w-full sm:h-14"
          >
            <path d="M0 0Q720 56 1440 0V56H0Z" fill="#fff" />
          </svg>
        </div>
        <MoodStrip />
      </section>

      {/* Problems: tiles with real app UI and emoji badges. */}
      <section className="wrap py-20 md:py-28">
        <SectionTitle emoji="😣">
          Plants Don&apos;t Die From a Lack of Love.
          <br className="hidden sm:block" /> They Die From <span className="hl [--hl:var(--color-blush-2)]">Guesswork</span>
        </SectionTitle>
        <ul className="mt-16 grid gap-14 md:grid-cols-3 md:gap-10 lg:gap-12">
          {PROBLEMS.map((p) => (
            <li key={p.title} className="text-center">
              <div className="relative">
                <div className={`flex aspect-square items-center justify-center overflow-hidden rounded-card p-6 ${p.bg}`}>
                  <Fragment src={p.fragment} alt={p.alt} width={300} fade className={p.tilt} />
                </div>
                <Emoji face={p.face} size={88} className="absolute -top-6 -right-3 drop-shadow-md" />
              </div>
              <h3 className="h-card mt-7">{p.title}</h3>
              <p className="t-small mx-auto mt-3 max-w-[340px] text-[15px]">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works: Act I / II / III switch. Lilac sets off the yellow, sky and lime
          step panels (purple and yellow-green are complements). */}
      <section id="how-it-works" aria-labelledby="how-title" className="bg-lilac">
        <div className="wrap py-20 md:py-28">
          <SectionTitle id="how-title" emoji="😊" sub="Three steps from a photo to a plant that's doing well.">
            Start With <span className="hl [--hl:var(--color-lime)]">Your Plant</span>
          </SectionTitle>
          <div className="mt-12">
            <StepTabs steps={STEPS} />
          </div>
        </div>
      </section>

      {/* Statement band in forest green. */}
      <section aria-label="What Plantalk AI is for" className="relative overflow-hidden bg-forest">
        <Emoji face="orange" size={64} className="absolute top-10 left-[7%] hidden -rotate-12 opacity-90 md:block" />
        <Emoji face="purple" size={52} className="absolute bottom-10 left-[16%] hidden rotate-6 opacity-90 md:block" />
        <Emoji face="yellow" size={58} className="absolute top-12 right-[9%] hidden rotate-12 opacity-90 md:block" />
        <Emoji face="blue" size={46} className="absolute right-[17%] bottom-12 hidden -rotate-6 opacity-90 md:block" />
        <div className="wrap relative flex flex-col items-center py-20 text-center md:py-24">
          <Emoji face="teal" size={72} className="drop-shadow-md" />
          <p className="mt-7 max-w-[880px] text-2xl leading-snug font-bold text-balance text-white sm:text-[2rem] sm:leading-[1.3]">
            Your plant can&apos;t talk. With Plantalk AI, you can still{" "}
            <span className="text-lime">understand how it feels.</span>
          </p>
          <p className="mt-6 text-xs font-bold tracking-[0.16em] text-white/80 uppercase sm:text-sm">
            Photo ID · Daily care · Health tracking · AI assistant
          </p>
        </div>
      </section>

      {/* App card, mirroring the store's product card. */}
      <section aria-labelledby="app-card-title" className="wrap py-20 md:py-28">
        <div className="grid overflow-hidden rounded-card md:grid-cols-2">
          <div className="lime-dots relative flex min-h-[440px] items-end justify-center overflow-hidden">
            <Squiggle width={72} className="absolute top-12 left-[16%] -rotate-12" />
            <Image src={icon} alt="" width={80} height={80} className="absolute top-8 right-8 rounded-[20px] shadow-lg" />
            <Phone src={discover} alt="Discover screen: Find your plant, with popular plant groups" className="relative w-[240px] translate-y-[16%]" sizes="240px" />
          </div>
          <div className="flex flex-col justify-center bg-pale p-8 sm:p-12">
            <h2 id="app-card-title" className="text-[1.75rem] leading-tight font-bold">
              Plantalk AI
            </h2>
            <p className="mt-3 flex flex-wrap items-baseline gap-3">
              <span className="text-[1.75rem] font-bold text-ink">Free</span>
              <span className="t-small">Optional Pro subscription in the app</span>
            </p>
            <hr className="my-6 border-line" />
            <p className="t-body">
              A plant care companion that identifies your plants, plans their care, tracks their health and answers your
              questions.
            </p>
            <p className="mt-6 text-sm font-bold text-ink">Available on</p>
            <ul className="mt-2.5 flex gap-2">
              {["iPhone", "iPad", "Android"].map((d) => (
                <li key={d} className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold ring-1 ring-ink/10">
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={APP_STORE_URL} className="btn btn-lime caret min-w-[190px]">
                Get it for iPhone
              </a>
              <a href={PLAY_URL} className="btn btn-black caret min-w-[190px]">
                Get it for Android
              </a>
            </div>
            <p className="mt-6">
              <a href={APP_STORE_URL} className="text-sm font-semibold underline underline-offset-4 hover:no-underline">
                View on the App Store ↗
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* What's Plantalk AI: an "exploded view" of the app, echoing the store's device teardown. */}
      <section id="features" aria-labelledby="whats-title" className="bg-cream">
        <div className="wrap py-20 md:py-28">
          <SectionTitle id="whats-title" emoji="🤔">
            What&apos;s <span className="hl [--hl:var(--color-lime)]">Plantalk AI</span>?
          </SectionTitle>

          <div className="mesh relative mx-auto mt-12 max-w-[1040px] overflow-hidden rounded-card ring-1 ring-black/[0.04]">
            <div className="relative hidden h-[580px] md:block" aria-hidden="true">
              <div className="absolute top-1/2 left-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-ink/[0.08]" />
              <div className="absolute top-1/2 left-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-ink/[0.08]" />
              <Image
                src={icon}
                alt=""
                width={132}
                height={132}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[32px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.45)]"
              />
              <Fragment src={fHomeSummary} alt="" width={300} className="absolute top-12 left-10 -rotate-3" />
              <Fragment src={fWeather} alt="" width={290} className="absolute top-10 right-10 rotate-3" />
              <Fragment src={fQuiz} alt="" width={200} fade className="absolute -bottom-10 left-28 -rotate-6" />
              <div className="absolute right-16 bottom-24 flex max-w-[270px] items-start gap-2.5 rounded-[20px] rounded-br-[6px] bg-white p-4 shadow-[0_28px_50px_-26px_rgb(20_30_15/0.45)] ring-1 ring-black/[0.06] rotate-2">
                <Emoji face="blue" size={32} className="h-8 w-8 flex-none" />
                <p className="text-sm leading-snug text-text">Why are my calathea&apos;s tips turning crispy?</p>
              </div>
              <StatusPill tone="blue" className="absolute top-[46%] left-[17%] -rotate-6">
                Too dry!
              </StatusPill>
              <StatusPill tone="green" className="absolute top-[40%] right-[19%] rotate-6">
                Healthy!
              </StatusPill>
              <StatusPill tone="amber" className="absolute bottom-[14%] left-[46%] -rotate-3">
                Mild issues
              </StatusPill>
              <Emoji face="orange" size={56} className="absolute top-[60%] left-[30%] drop-shadow-md" />
              <Emoji face="purple" size={46} className="absolute top-[22%] right-[36%] drop-shadow-md" />
            </div>
            <div className="flex flex-col items-center gap-5 px-6 py-10 md:hidden">
              <Image src={icon} alt="" width={96} height={96} className="rounded-[24px] shadow-lg" />
              <Fragment src={fHomeSummary} alt="Home summary: mostly thriving, one plant needs a peek" width={300} className="-rotate-2" />
              <Fragment src={fWeather} alt="Weather-aware care tip" width={300} className="rotate-2" />
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-[640px] text-center">
            <p className="text-lg font-bold text-ink">Every plant gets a profile, a plan and a health score.</p>
            <p className="t-small mt-3 text-[15px]">{DESCRIPTION}</p>
            <p className="mt-5 text-lg font-bold text-ink italic">Snap a photo. Follow the plan. Understand your plant.</p>
          </div>

          <h3 className="h-section mt-24 text-center">
            About <span className="hl [--hl:var(--color-blush-2)]">Plantalk AI</span>
          </h3>
          <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:grid-rows-[300px_300px]">
            <article className="relative min-h-[460px] overflow-hidden rounded-card bg-sky p-8 lg:row-span-2 lg:min-h-0">
              <h4 className="text-2xl font-bold">Your garden, at a glance</h4>
              <p className="t-small mt-3 max-w-sm">
                Every plant on one calm home screen, with today&apos;s weather and a quick read on who&apos;s thriving and
                who needs a peek.
              </p>
              <Fragment
                src={fPlantCards}
                alt="Plant cards for Lucy, marked Too dry, and Carpobrotus, marked Healthy"
                width={360}
                fade
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 -rotate-2"
              />
              <Emoji face="sleepy" size={64} className="absolute top-[43%] right-8 rotate-12 drop-shadow-md max-lg:hidden" />
              <StatusPill tone="amber" className="absolute top-[47%] left-10 -rotate-6 max-lg:hidden">
                Mild issues
              </StatusPill>
            </article>
            <article className="relative min-h-[300px] overflow-hidden rounded-card bg-sun p-7">
              <h4 className="text-lg font-bold">Care calendar, by plant</h4>
              <p className="t-small mt-2 max-w-[230px]">See each plant&apos;s routine across the month.</p>
              <Fragment src={fCalendar} alt="Care calendar by plant for August" width={220} fade className="absolute -right-3 -bottom-16 rotate-3" />
            </article>
            <article className="relative min-h-[300px] overflow-hidden rounded-card bg-blush p-7">
              <h4 className="text-lg font-bold">Find plants that fit</h4>
              <p className="t-small mt-2 max-w-[230px]">Search, browse plant groups, or take the Find my match quiz.</p>
              <Fragment src={fPlantGroups} alt="Popular plant groups: Monstera and Begonia" width={230} className="absolute -right-3 -bottom-10 -rotate-3" />
            </article>
            <article className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-card bg-mint p-7 sm:flex-row sm:items-center lg:col-span-2">
              <div className="max-w-[300px]">
                <h4 className="text-lg font-bold">A portrait for every plant</h4>
                <p className="t-small mt-2">
                  Generate a fun 3D-style look for each plant and switch styles any time. Each one carries its health
                  score.
                </p>
              </div>
              <Fragment src={fPortrait} alt="A Carpobrotus portrait with a health score of 96" width={300} className="mt-6 rotate-2 self-center sm:mt-0" />
            </article>
          </div>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {EXTRAS.map((x, i) => (
              <li key={x.title} className="flex gap-4 rounded-card bg-white p-6 shadow-[0_10px_30px_-24px_rgb(60_40_10/0.5)]">
                <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-full ${TONES[i % TONES.length]}`}>
                  <Icon name={x.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-bold text-ink">{x.title}</h4>
                  <p className="t-small mt-1">{x.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Plantiemoji: lime card, like the store's "Behind every emoji is real data". */}
      <section id="plantiemoji" aria-labelledby="plantiemoji-title" className="wrap py-20 md:py-28">
        <div className="grid items-center gap-10 overflow-hidden rounded-card bg-lime p-8 sm:p-12 md:grid-cols-2">
          <div>
            <h2 id="plantiemoji-title" className="h-section">
              Even Better With Plantiemoji <span aria-hidden="true" className="font-normal">🎯</span>
            </h2>
            <p className="t-body mt-4">
              Plantalk AI is the companion app for Plantiemoji, a plant sensor with an emoji screen. Set it up in the
              app over Bluetooth and your 2.4 GHz Wi-Fi, and the plant&apos;s Environment view fills with live readings.
            </p>
            <ul className="mt-6 space-y-3">
              <Check>Light, temperature, humidity, air pressure and soil moisture</Check>
              <Check>VPD and daily light integral (DLI), with history</Check>
              <Check>A warning when soil moisture reads zero</Check>
              <Check>Design emoji faces and install them on the sensor&apos;s screen</Check>
            </ul>
            <p className="mt-5 text-sm">No sensor? Everything else in the app works without one.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={PLANTIEMOJI_URL} className="btn btn-black caret">
                Shop Plantiemoji
              </a>
              <a href={PLANTIEMOJI_MANUAL_URL} className="btn btn-white">
                Setup guide
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[460px] pb-8">
            <div className="overflow-hidden rounded-card bg-[#f3f3f3]">
              <Image
                src={wands}
                alt="Three Plantiemoji sensors with round emoji screens"
                sizes="(min-width: 768px) 460px, 90vw"
                placeholder="blur"
                className="h-auto w-full"
              />
            </div>
            <Phone
              src={environment}
              alt="Environment view with live sensor ranges"
              className="absolute right-0 bottom-0 w-[34%] rotate-3"
              sizes="160px"
            />
          </div>
        </div>
      </section>

      {/* Ask the assistant: staggered chat-bubble wall, as in the store's community section. */}
      <section id="assistant" aria-labelledby="assistant-title" className="sky-glow">
        <div className="wrap relative py-20 md:py-28">
          <div className="text-center">
            <p className="eyebrow">
              <Icon name="chat" className="h-4 w-4" />
              Room for every plant question
            </p>
          </div>
          <div className="mt-4">
            <SectionTitle
              id="assistant-title"
              sub="From “is this normal?” to “what does this spot mean?”, ask the Plantie Assistant in plain words. Send a photo, get step-by-step answers, or use Quick Chat."
            >
              Wondering? Just ask <span className="hl [--hl:var(--color-sun-2)]">Plantie</span>.
            </SectionTitle>
          </div>
          <div className="mx-auto mt-14 grid max-w-[1100px] gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {QUESTIONS.map((col, ci) => (
              <ul key={ci} className={`space-y-4 lg:space-y-5 ${ci === 1 ? "lg:mt-12" : ""} ${ci === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                {col.map((item) => (
                  <li
                    key={item.q}
                    className="flex items-start gap-3 rounded-[22px] rounded-bl-[6px] bg-white p-5 shadow-[0_14px_30px_-20px_rgb(20_30_15/0.35)] ring-1 ring-black/[0.04]"
                  >
                    <Emoji face={item.face} size={36} className="h-9 w-9 flex-none" />
                    <p className="text-[15px] leading-relaxed text-text">{item.q}</p>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="flex items-center gap-2 text-xs text-muted">
              <span aria-hidden="true" className="tracking-widest">•••</span> Plantie is typing…
            </p>
            <a href="/download" className="btn btn-lime btn-sm caret">
              Ask in the app
            </a>
            <p className="text-xs text-muted">Example questions</p>
          </div>
        </div>
      </section>

      {/* Download: lime band with QR codes, like the store's app section. */}
      <section id="download" aria-labelledby="download-title" className="lime-glow">
        <div className="wrap relative grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h2 id="download-title" className="h-section max-w-[520px]">
              Your Plant&apos;s Health, in <span className="hl [--hl:white]">One Look.</span>{" "}
              <span aria-hidden="true" className="font-normal">📱</span>
            </h2>
            <p className="t-body mt-4 max-w-[520px]">
              Download Plantalk AI free. Add your first plant with a photo and see today&apos;s care in under a minute.
            </p>
            <div className="mt-8 hidden gap-5 md:flex">
              {[
                { qr: qrAppStore, label: "App Store" },
                { qr: qrGooglePlay, label: "Google Play" },
              ].map((c) => (
                <figure key={c.label} className="rounded-[18px] bg-white p-3 text-center shadow-[0_14px_30px_-20px_rgb(0_0_0/0.35)]">
                  <Image src={c.qr} alt={`QR code: download Plantalk AI on ${c.label}`} width={112} height={112} unoptimized />
                  <figcaption className="mt-2 text-xs font-bold">{c.label}</figcaption>
                </figure>
              ))}
            </div>
            <StoreBadges className="mt-8" />
          </div>
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="overflow-hidden rounded-[40px] rounded-tl-[160px] bg-[#f3f3f3] shadow-[0_40px_70px_-40px_rgb(0_0_0/0.45)]">
              <Image
                src={appPhone}
                alt="Plantalk AI on a phone showing a plant's growth plan"
                sizes="(min-width: 768px) 460px, 90vw"
                placeholder="blur"
                className="h-auto w-full"
              />
            </div>
            <Squiggle width={70} className="absolute -bottom-6 -left-4 -rotate-12" />
            <Emoji face="teal" size={80} className="absolute -top-5 -right-3 drop-shadow-md" />
          </div>
        </div>
      </section>

      {/* Screenshots, like the store's product row. */}
      <section id="screenshots" aria-labelledby="screenshots-title" className="pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="wrap flex items-end justify-between gap-6">
          <h2 id="screenshots-title" className="h-section">
            A <span className="hl [--hl:#ffc9a3]">Closer</span> Look
          </h2>
          <a href={APP_STORE_URL} className="flex items-center gap-1 text-sm font-bold whitespace-nowrap hover:underline">
            View All
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <div className="scrollbar-thin mt-8 overflow-x-auto" tabIndex={0} role="region" aria-label="App screenshots, scroll sideways for more">
          <ul className="flex w-max snap-x snap-mandatory gap-4 px-5 pb-6 md:px-10 xl:px-[max(5rem,calc((100vw-1280px)/2))]">
            {GALLERY.map((shot, i) => (
              <li
                key={shot.alt}
                className={`w-[220px] flex-none snap-start rounded-card p-3 sm:w-[250px] ${["bg-sky", "bg-sun", "bg-blush", "bg-mint", "bg-lilac", "bg-tangerine", "bg-pale"][i % 7]}`}
              >
                <Image src={shot.src} alt={shot.alt} sizes="250px" placeholder="blur" className="h-auto w-full rounded-[16px]" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trust row, like the store's benefits bar. */}
      <section aria-labelledby="privacy-title" className="wrap pb-20 md:pb-24">
        <h2 id="privacy-title" className="sr-only">
          Privacy and pricing
        </h2>
        <ul className="grid gap-8 rounded-card border border-line p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
          {TRUST.map((t, i) => (
            <li key={t.title} className="flex gap-3">
              <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${["bg-lime", "bg-sky-2", "bg-sun-2", "bg-blush-2"][i % 4]}`}>
                <Icon name={t.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-bold text-ink">{t.title}</p>
                <p className="t-small mt-1">{t.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm">
          <a href={PRIVACY_PATH} className="prose-link">
            Read the privacy policy
          </a>
        </p>
      </section>

      {/* What's new */}
      <section id="whats-new" aria-labelledby="whats-new-title" className="bg-blush">
        <div className="wrap grid gap-10 py-20 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-24">
          <div>
            <p className="eyebrow">What&apos;s new</p>
            <h2 id="whats-new-title" className="h-section mt-3">
              Version {release.version}
            </h2>
            <p className="t-body mt-4">
              Released on the App Store on {releaseDate}. Plantalk AI is updated regularly, and the Android version
              follows its own release schedule.
            </p>
            <p className="mt-6">
              <a href={APP_STORE_URL} className="prose-link">
                Version history on the App Store
              </a>
            </p>
          </div>
          <ul className="space-y-3">
            {release.notes.map((note) => (
              <li key={note} className="flex gap-3 rounded-[16px] bg-white p-4 ring-1 ring-black/[0.04]">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-lime text-ink">
                  <Icon name="sprout" className="h-4 w-4" />
                </span>
                <span className="leading-relaxed">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ, styled like the store's product page accordion. */}
      <section id="faq" aria-labelledby="faq-title" className="wrap py-20 md:py-28">
        <SectionTitle id="faq-title" sub="Quick answers about Plantalk AI. Still stuck? Our support team is a message away.">
          Frequently Asked <span className="hl [--hl:#d9c6ff]">Questions</span>
        </SectionTitle>
        <div className="mx-auto mt-10 max-w-[880px] divide-y divide-ink/10 rounded-card bg-mint px-6 sm:px-8">
          {FAQS.map((faq) => (
            <details key={faq.q} className="faq py-5">
              <summary className="flex cursor-pointer items-start justify-between gap-6 rounded-lg">
                <h3 className="text-base font-bold">{faq.q}</h3>
                <svg viewBox="0 0 24 24" className="faq-chevron mt-1 h-5 w-5 flex-none transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className="t-small mt-3 text-[15px]">{withLinks(faq.a, faq.links)}</p>
            </details>
          ))}
        </div>
      </section>

      <JsonLd data={appLd} />
      <JsonLd data={faqLd} />
    </>
  );
}
