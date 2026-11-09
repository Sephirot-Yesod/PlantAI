import type { StaticImageData } from "next/image";
import wands from "@/assets/brand/wands.webp";
import fCalendar from "@/assets/fragments/calendar.webp";
import fHealthChart from "@/assets/fragments/health-chart.webp";
import fHomeSummary from "@/assets/fragments/home-summary.webp";
import fLightRange from "@/assets/fragments/light-range.webp";
import fPlantCards from "@/assets/fragments/plant-cards.webp";
import fPortrait from "@/assets/fragments/portrait.webp";
import fQuiz from "@/assets/fragments/quiz.webp";
import fTaskRows from "@/assets/fragments/task-rows.webp";
import fWeather from "@/assets/fragments/weather-tip.webp";
import careToday from "@/assets/screens/care-today.webp";
import environment from "@/assets/screens/environment.webp";
import healthOverTime from "@/assets/screens/health-over-time.webp";
import plantsHome from "@/assets/screens/plants-home.webp";
import type { Face } from "@/components/Decor";
import type { IconName } from "@/components/Icon";
import { FAQS, PLANTIEMOJI_MANUAL_URL, PLANTIEMOJI_URL, type Faq } from "./site";

// The feature pages (/plant-identifier and so on). Every claim comes from the App Store and
// Google Play listings, the app's release notes, the support page or the FAQ in site.ts.
// Add nothing the app can't do, and change `updated` when a page's text changes: it is the
// date shown on the page and the sitemap's lastmod.

export type Feature = {
  slug: string;
  path: string;
  /** Short name for links, breadcrumbs and the footer. */
  label: string;
  /** One line for the cards that link to this page. */
  summary: string;
  icon: IconName;
  /** Tab title; the layout adds " · Plantalk AI". */
  title: string;
  shareTitle: string;
  description: string;
  /** The heading, with the highlighted part marked. */
  h1: { text: string; hl?: boolean }[];
  /** Two sentences that answer the page's question on their own. */
  lead: string;
  hero:
    | { kind: "phone"; src: StaticImageData; alt: string }
    | { kind: "photo"; src: StaticImageData; alt: string; phone?: { src: StaticImageData; alt: string } }
    | { kind: "chat"; questions: { face: Face; q: string }[] };
  stepsTitle: string;
  steps: { title: string; body: string }[];
  highlightsTitle: string;
  highlights: { icon: IconName; title: string; body: string }[];
  gallery?: { src: StaticImageData; alt: string; caption: string }[];
  glossary?: { term: string; body: string; source: { label: string; href: string } }[];
  callout?: {
    title: string;
    body: string;
    image?: { src: StaticImageData; alt: string };
    buttons?: { label: string; href: string }[];
  };
  /** Shown under the highlights where answers are advice. */
  note?: string;
  faqs: Faq[];
  related: string[];
  /** Plant care guides (slugs in lib/guides.ts) this page links to. */
  guides: string[];
  updated: string;
};

const faq = (q: string): Faq => {
  const found = FAQS.find((f) => f.q === q);
  if (!found) throw new Error(`FAQ not found: ${q}`);
  return found;
};

const GUIDANCE =
  "Treat the app's answers as guidance. For a serious pest or disease problem, also check with a local nursery or your county's cooperative extension office.";

export const FEATURES: Feature[] = [
  {
    slug: "plant-identifier",
    path: "/plant-identifier",
    label: "Plant identifier",
    summary: "Identify a plant from a photo and get its profile, care plan and health score.",
    icon: "camera",
    title: "Plant Identifier: Identify a Plant From a Photo",
    shareTitle: "Identify a plant from a photo with Plantalk AI",
    description:
      "Identify a plant from a photo with Plantalk AI. Take or choose a picture, confirm the match, and get a plant profile with care tasks and a health score.",
    h1: [{ text: "Identify a Plant " }, { text: "From a Photo", hl: true }],
    lead: "Plantalk AI identifies a plant from a photo you take or choose from your library. You confirm what it detected, and the plant gets its own profile with care tasks, its ideal light and temperature ranges and a health score.",
    hero: { kind: "phone", src: plantsHome, alt: "Plantalk AI's Plants screen with plant cards" },
    stepsTitle: "From Photo to Plant Profile",
    steps: [
      { title: "Tap +", body: "Start on the Plants screen, where all your plants live." },
      {
        title: "Take or choose a photo",
        body: "Use the camera or pick a photo from your library (your gallery on Android). On iPhone, tap to focus and pinch to zoom.",
      },
      { title: "Confirm the match", body: "Plantalk AI shows what it detected. Check it, then save the plant." },
      {
        title: "Open its profile",
        body: "The plant gets Overview, Environment and Visual health views, and its tasks join the Care screen.",
      },
    ],
    highlightsTitle: "What Every Plant Gets",
    highlights: [
      { icon: "sprout", title: "Its own profile", body: "Overview, Environment and Visual health views for each plant." },
      { icon: "compass", title: "Its sweet spot", body: "Ideal light and temperature ranges, in plain words." },
      { icon: "calendar", title: "A care plan", body: "Daily tasks on the Care screen and a care calendar for the month." },
      { icon: "heart", title: "A health score", body: "A score and growth trend you can follow over time." },
      { icon: "sparkles", title: "A portrait", body: "A fun 3D-style look for each plant. Switch styles any time." },
      { icon: "cloud", title: "Local weather", body: "With location on, care tips account for local heat and humidity." },
    ],
    gallery: [
      { src: fPlantCards, alt: "Plant cards for Lucy, marked Too dry, and Carpobrotus, marked Healthy", caption: "Every plant on one screen, each with a status." },
      { src: fLightRange, alt: "Ideal light and temperature ranges for a plant", caption: "Each plant's ideal light and temperature." },
      { src: fPortrait, alt: "A Carpobrotus portrait with a health score of 96", caption: "A portrait that carries the plant's health score." },
    ],
    callout: {
      title: "Looking for a new plant instead?",
      body: "Discover lets you search for plants, browse popular plant groups or take the Find my match quiz, which asks about your light and care needs before suggesting plants.",
      image: { src: fQuiz, alt: "The Find my match quiz in Discover" },
    },
    faqs: [
      {
        q: "How do I identify a plant with Plantalk AI?",
        a: "Tap + on the Plants screen, then take a photo or choose one from your library. Plantalk AI shows what it detected. Confirm it, and the plant is saved with its own profile and care tasks.",
      },
      {
        q: "Can I use a photo I already took?",
        a: "Yes. Choose a photo from your library on iPhone and iPad, or from your gallery on Android.",
      },
      {
        q: "What happens after a plant is identified?",
        a: "It gets a profile with Overview, Environment and Visual health views, a care schedule on the Care screen and a health score you can follow over time. You can also give it a 3D-style portrait.",
      },
      {
        q: "Do I need a Plantiemoji sensor to identify plants?",
        a: "No. Photo identification and plant profiles work without a sensor. A Plantiemoji sensor adds live readings of light, temperature, humidity, air pressure and soil moisture.",
      },
      faq("Is Plantalk AI free?"),
    ],
    related: ["plant-health", "watering-reminders", "ai-plant-assistant"],
    guides: ["monstera-care", "pothos-care", "snake-plant-care", "fiddle-leaf-fig-care", "peace-lily-care"],
    updated: "2026-11-09",
  },
  {
    slug: "plant-health",
    path: "/plant-health",
    label: "Plant health check",
    summary: "A health score, a growth trend and help when a plant looks unwell.",
    icon: "heart",
    title: "Plant Health Check: Find What's Wrong With Your Plant",
    shareTitle: "Check on your plants' health with Plantalk AI",
    description:
      "Plantalk AI gives each plant a health score and growth trend, flags plants that need attention, and takes photo questions about symptoms.",
    h1: [{ text: "Check on Your " }, { text: "Plant's Health", hl: true }],
    lead: "Plantalk AI gives every plant a health score and a growth trend, and its home screen points out the plants that need a look. When one seems unwell, open Plant Clinic or send the Plantie Assistant a photo and ask about the symptoms.",
    hero: { kind: "phone", src: healthOverTime, alt: "Health over time chart for a plant in Plantalk AI" },
    stepsTitle: "How to Check on a Plant",
    steps: [
      {
        title: "Glance at the home screen",
        body: "It sums up how your plants are doing, and each plant card carries a status such as Healthy!, Mild issues or Too dry!.",
      },
      { title: "Open the plant", body: "Its page shows the health score, the growth trend, any issues and its care tasks." },
      { title: "Switch views", body: "Look at the plant's Overall, Visual and Environment health views." },
      {
        title: "Ask about symptoms",
        body: "Use the Plant Clinic shortcut, or send the Plantie Assistant a photo of yellow leaves or a spot and get step-by-step answers.",
      },
    ],
    highlightsTitle: "Ways Plantalk AI Watches Over Your Plants",
    highlights: [
      { icon: "heart", title: "Health score", body: "Every plant has a score you can follow over time." },
      { icon: "sprout", title: "Growth trend", body: "See how each plant responds to care, so you can adjust before small problems grow." },
      { icon: "clinic", title: "Plant Clinic", body: "A home-screen shortcut for checking on a plant that looks unwell." },
      { icon: "chat", title: "Photo questions", body: "Send Plantie a photo and ask what could be wrong." },
      { icon: "cloud", title: "Weather context", body: "With location on, care tips account for local heat and humidity." },
      { icon: "drop", title: "Sensor warnings", body: "With a Plantiemoji sensor, the app flags a zero soil-moisture reading." },
    ],
    gallery: [
      { src: fHomeSummary, alt: "Home summary: mostly thriving, one plant needs a peek", caption: "The home screen says who needs a peek." },
      { src: fHealthChart, alt: "Dynamic growth plan chart showing a plant's health score", caption: "The health score and growth trend over time." },
      { src: fPlantCards, alt: "Plant cards for Lucy, marked Too dry, and Carpobrotus, marked Healthy", caption: "Status tags on every plant card." },
    ],
    note: GUIDANCE,
    faqs: [
      faq("Can Plantalk AI tell what's wrong with my plant?"),
      {
        q: "What is the plant health score?",
        a: "Each plant in Plantalk AI has a health score, shown with a growth trend so you can see how it changes over time. Its health also has Overall, Visual and Environment views.",
      },
      {
        q: "Where do I see which plants need attention?",
        a: "On the home screen. It sums up how your plants are doing, and each plant card carries a status tag such as Healthy!, Mild issues or Too dry!. The Plant Clinic shortcut is there too.",
      },
      {
        q: "Does a Plantiemoji sensor help with plant health?",
        a: "It adds live light, temperature, humidity, air pressure and soil moisture readings to the plant's Environment view, plus VPD and daily light integral (DLI) with history, and a warning when soil moisture reads zero.",
      },
    ],
    related: ["ai-plant-assistant", "plantiemoji-sensor", "watering-reminders"],
    guides: ["yellow-leaves", "brown-leaf-tips", "root-rot"],
    updated: "2026-11-09",
  },
  {
    slug: "watering-reminders",
    path: "/watering-reminders",
    label: "Watering reminders",
    summary: "Today's care, sorted, and every plant's routine on a calendar.",
    icon: "drop",
    title: "Plant Watering Reminders and Care Calendar",
    shareTitle: "Plant watering reminders and a care calendar in Plantalk AI",
    description:
      "Plantalk AI gives each plant a care schedule, lists what to water and check each day, and shows every plant's routine on a care calendar for the month.",
    h1: [{ text: "Watering Reminders for " }, { text: "Every Plant", hl: true }],
    lead: "Plantalk AI gives each plant a care schedule, and the Care screen lists what to water and check each day. A care calendar shows every plant's routine across the month, and with location on, tips adjust for local heat and humidity.",
    hero: { kind: "phone", src: careToday, alt: "Plantalk AI's Care screen with today's tasks and a weather tip" },
    stepsTitle: "Your Plant Care, Day by Day",
    steps: [
      { title: "Add your plants", body: "Each plant you add with a photo gets its own care schedule." },
      { title: "Open Care", body: "Today's tasks are already sorted: what to water and what to check." },
      { title: "Done or skip", body: "Mark each task done or skip it, and earn Growth Energy points as you keep up." },
      { title: "Check the calendar", body: "See each plant's routine across the month." },
    ],
    highlightsTitle: "Care That Fits Your Plants",
    highlights: [
      { icon: "calendar", title: "Care calendar", body: "Every plant's routine across the month, plant by plant." },
      { icon: "cloud", title: "Weather-aware tips", body: "With location on, tips adapt to local heat and humidity, like checking soil early on a hot day." },
      { icon: "suitcase", title: "Away mode", body: "Plan care before a trip and leave notes for your plant sitter. On iPhone and iPad from version 1.0.6." },
      { icon: "drop", title: "Live soil moisture", body: "With a Plantiemoji sensor, see soil moisture and get a warning when it reads zero." },
      { icon: "thermometer", title: "°C or °F", body: "Choose Celsius or Fahrenheit for every reading." },
      { icon: "sprout", title: "Growth Energy", body: "Earn points as you keep up with care tasks." },
    ],
    gallery: [
      { src: fTaskRows, alt: "Today's care list: water pix, funny and Anthurium", caption: "Today's care list." },
      { src: fCalendar, alt: "Care calendar by plant for August", caption: "Each plant's routine across the month." },
      { src: fWeather, alt: "Weather-aware care tip", caption: "Tips that account for local weather." },
    ],
    faqs: [
      faq("Does Plantalk AI remind me when to water my plants?"),
      {
        q: "How does Plantalk AI decide when a plant needs water?",
        a: "Each plant's care schedule is based on its profile. With location on, care tips take local heat and humidity into account, and with a Plantiemoji sensor you can also see the soil's moisture live.",
      },
      faq("Can I plan plant care before a trip?"),
      {
        q: "Can I skip a care task?",
        a: "Yes. Each task on the Care screen can be marked done or skipped.",
      },
      {
        q: "Does it work on Android?",
        a: "Yes. Plantalk AI is on iPhone, iPad and Android, and care tasks are part of every version. Features can differ slightly between the iPhone and Android versions; Away mode, for example, is on iPhone and iPad from version 1.0.6.",
      },
    ],
    related: ["plantiemoji-sensor", "plant-health", "plant-identifier"],
    guides: ["root-rot", "yellow-leaves", "snake-plant-care", "peace-lily-care"],
    updated: "2026-11-09",
  },
  {
    slug: "ai-plant-assistant",
    path: "/ai-plant-assistant",
    label: "Plantie AI assistant",
    summary: "Ask plant questions in plain words, with a photo if it helps.",
    icon: "chat",
    title: "Plantie: AI Plant Care Assistant",
    shareTitle: "Ask Plantie, the AI plant care assistant in Plantalk AI",
    description:
      "Ask Plantie, the AI assistant in Plantalk AI, your plant questions in plain words. Send a photo, get step-by-step answers, or use Quick Chat.",
    h1: [{ text: "Ask Plantie, Your " }, { text: "AI Plant Assistant", hl: true }],
    lead: "Plantie is the AI assistant built into Plantalk AI. Ask a plant question in plain words, attach a photo if it helps, and get step-by-step answers, or use Quick Chat for a short question.",
    hero: {
      kind: "chat",
      questions: [
        { face: "orange", q: "One of my monstera's lower leaves is turning yellow. The rest look happy. Is that normal?" },
        { face: "teal", q: "Here's a photo of a spot on my fiddle leaf fig. What could it be, and what should I check?" },
        { face: "green", q: "My pothos is getting leggy. Would a spot closer to an east-facing window help?" },
      ],
    },
    stepsTitle: "How to Ask Plantie",
    steps: [
      { title: "Open Plantie", body: "Open the Plantie Assistant in the app and type your question." },
      { title: "Add a photo", body: "Send a picture of a leaf, a spot or the whole plant." },
      { title: "Follow the steps", body: "Answers stream in step by step, with information cards where they help." },
      { title: "Or use Quick Chat", body: "Ask in Quick Chat when you just have a quick question." },
    ],
    highlightsTitle: "What Plantie Can Help With",
    highlights: [
      { icon: "drop", title: "Watering", body: "How often, how much, and what to check first." },
      { icon: "compass", title: "Light and placement", body: "Whether a spot gets the light a plant needs." },
      { icon: "thermometer", title: "Temperature and humidity", body: "What a plant likes, and what to do when the air is dry." },
      { icon: "sprout", title: "Soil and upkeep", body: "Repotting, soil and general maintenance." },
      { icon: "clinic", title: "Possible health issues", body: "What symptoms like yellow leaves or spots could mean." },
      { icon: "camera", title: "Photo questions", body: "Show Plantie what you see instead of describing it." },
    ],
    note: GUIDANCE,
    faqs: [
      {
        q: "What can I ask Plantie?",
        a: "Plant care questions about watering, light, humidity, temperature, soil and general maintenance, and what a symptom such as yellow leaves or a spot might mean.",
      },
      {
        q: "Can I send Plantie a photo?",
        a: "Yes. Attach a photo to your message, for example of a spotted leaf, and ask what it could be.",
      },
      {
        q: "Is Plantie a replacement for a plant expert?",
        a: "No. Treat Plantie's answers as guidance. For a serious pest or disease problem, also check with a local nursery or your county's cooperative extension office.",
      },
      faq("Is Plantalk AI free?"),
    ],
    related: ["plant-health", "plant-identifier", "watering-reminders"],
    guides: ["yellow-leaves", "brown-leaf-tips", "root-rot"],
    updated: "2026-11-09",
  },
  {
    slug: "plantiemoji-sensor",
    path: "/plantiemoji-sensor",
    label: "Plantiemoji sensor",
    summary: "Live light, temperature, humidity and soil moisture for a plant.",
    icon: "bluetooth",
    title: "Plantiemoji Plant Sensor: Live Plant Readings",
    shareTitle: "Plantiemoji plant sensor: live readings in Plantalk AI",
    description:
      "Link a Plantiemoji plant sensor to Plantalk AI for live light, temperature, humidity, air pressure and soil moisture readings, plus VPD and DLI with history.",
    h1: [{ text: "Plantiemoji: " }, { text: "Live Readings", hl: true }, { text: " for Your Plant" }],
    lead: "Plantiemoji is a plant sensor with an emoji screen, and Plantalk AI is its companion app. Linked to a plant, it fills the plant's Environment view with live light, temperature, humidity, air pressure and soil moisture readings, plus VPD and daily light integral (DLI) with history.",
    hero: {
      kind: "photo",
      src: wands,
      alt: "Three Plantiemoji sensors with round emoji screens",
      phone: { src: environment, alt: "Plantalk AI's Environment view with live sensor ranges" },
    },
    stepsTitle: "Set Up Plantiemoji",
    steps: [
      {
        title: "Get ready",
        body: "Turn on Bluetooth and allow Plantalk AI to use it. Have your 2.4 GHz Wi-Fi name and password ready: the sensor can't join a 5 GHz-only network.",
      },
      { title: "Add the plant first", body: "Add the plant in Plantalk AI with a photo." },
      { title: "Place the sensor", body: "Attach the emoji display, put the sensor in the pot and keep it on USB power during setup." },
      {
        title: "Link it in the app",
        body: "Open device setup, choose Plantiemoji, enter your Wi-Fi details and pick the plant. Keep the phone, sensor and router close together.",
      },
    ],
    highlightsTitle: "What You See in the App",
    highlights: [
      { icon: "sparkles", title: "Light", body: "Live light readings and the day's light total (DLI)." },
      { icon: "thermometer", title: "Temperature", body: "In Celsius or Fahrenheit, your choice." },
      { icon: "cloud", title: "Humidity and air pressure", body: "Plus VPD, which shows how fast the air dries a plant out." },
      { icon: "drop", title: "Soil moisture", body: "With a warning when soil moisture reads zero." },
      { icon: "heart", title: "History", body: "VPD and DLI with history, in the plant's Environment view." },
      { icon: "sprout", title: "Your own faces", body: "Design emoji faces in the app and install them on the sensor's screen." },
    ],
    glossary: [
      {
        term: "VPD (vapor pressure deficit)",
        body: "The gap between how much water vapor the air holds and how much it could hold at that temperature. The bigger the gap, the faster a plant loses water through its leaves.",
        source: { label: "Purdue Extension, HO-297-W", href: "https://www.extension.purdue.edu/extmedia/ho/ho-297-w.pdf" },
      },
      {
        term: "DLI (daily light integral)",
        body: "The total amount of light usable for photosynthesis that reaches a plant in one day, measured in moles of light per square meter per day. It depends on both brightness and day length.",
        source: { label: "Purdue Extension, HO-238-W", href: "https://www.extension.purdue.edu/extmedia/ho/ho-238-w.pdf" },
      },
    ],
    callout: {
      title: "No sensor? No problem.",
      body: "Everything else in Plantalk AI works without one: photo identification, care tasks, the care calendar, health tracking and the Plantie Assistant.",
      buttons: [
        { label: "Shop Plantiemoji", href: PLANTIEMOJI_URL },
        { label: "Setup guide", href: PLANTIEMOJI_MANUAL_URL },
      ],
    },
    faqs: [
      faq("Do I need a Plantiemoji sensor?"),
      {
        q: "What does the Plantiemoji sensor measure?",
        a: "Light, temperature, humidity, air pressure and soil moisture. Plantalk AI also shows VPD and daily light integral (DLI), with history.",
      },
      {
        q: "What Wi-Fi does Plantiemoji need?",
        a: "A 2.4 GHz Wi-Fi network. The sensor can't join a 5 GHz-only network, so have the 2.4 GHz network's name and password ready during setup.",
      },
      {
        q: "Can I change the face on the sensor's screen?",
        a: "Yes. Design emoji faces in Plantalk AI and install them on the sensor's screen. Version 1.0.6 added a Halloween look.",
      },
      {
        q: "Where can I buy Plantiemoji?",
        a: "At plantiemoji.com. Charging and troubleshooting are covered in the Plantiemoji user manual.",
        links: { "plantiemoji.com": PLANTIEMOJI_URL, "Plantiemoji user manual": PLANTIEMOJI_MANUAL_URL },
      },
    ],
    related: ["watering-reminders", "plant-health", "plant-identifier"],
    guides: ["brown-leaf-tips", "root-rot", "monstera-care"],
    updated: "2026-11-09",
  },
];

export function getFeature(slug: string): Feature {
  const feature = FEATURES.find((f) => f.slug === slug);
  if (!feature) throw new Error(`Unknown feature: ${slug}`);
  return feature;
}

