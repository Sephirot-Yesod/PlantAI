import type { StaticImageData } from "next/image";
import careToday from "@/assets/screens/care-today.webp";
import healthOverTime from "@/assets/screens/health-over-time.webp";

// Plant care and plant problem guides at /guides/<slug>. Each guide's text lives in
// src/content/guides/<slug>.md exactly as the reviewer approved it: change it only with a new
// review, and then update `reviewed` (shown on the page and used as the sitemap's lastmod).
// Drafts, the publishing plan and the template are in the "Plant Care Guides: Drafts for
// Review" doc.

export const GUIDES_PATH = "/guides";

export const GUIDE_REVIEWER = {
  name: "Bingqing Qi",
  affiliation: "Wageningen University & Research",
  affiliationUrl: "https://www.wur.nl/en.htm",
};

/** How the guides are made, shown on every guide and on the index. */
export const GUIDE_METHOD =
  "Drafted by the Plantalk AI team with AI assistance, checked against the sources listed on each page, and reviewed by an expert before publishing.";

export type GuideKind = "plant" | "problem";

export type Guide = {
  slug: string;
  path: string;
  kind: GuideKind;
  /** Short name for cards, breadcrumbs and links. */
  label: string;
  /** One line for the cards that link to this guide. */
  summary: string;
  description: string;
  /** Plant guides: the plant the guide is about, for structured data. */
  botanicalName?: string;
  published: string;
  reviewed: string;
};

const plant = (g: Omit<Guide, "path" | "kind" | "published" | "reviewed">): Guide => ({
  ...g,
  path: `${GUIDES_PATH}/${g.slug}`,
  kind: "plant",
  published: "2026-11-09",
  reviewed: "2026-11-09",
});
const problem = (g: Omit<Guide, "path" | "kind" | "published" | "reviewed">): Guide => ({
  ...g,
  path: `${GUIDES_PATH}/${g.slug}`,
  kind: "problem",
  published: "2026-11-09",
  reviewed: "2026-11-09",
});

export const GUIDES: Guide[] = [
  plant({
    slug: "monstera-care",
    label: "Monstera",
    summary: "Watering, light and a moss pole for big split leaves.",
    description:
      "How to care for a monstera: when to water, how much light, the right temperature and humidity, and how to get split leaves. Expert-reviewed, with sources.",
    botanicalName: "Monstera deliciosa",
  }),
  plant({
    slug: "pothos-care",
    label: "Pothos",
    summary: "Light for full color, easy watering and cuttings in water.",
    description:
      "How to care for pothos: the light it needs to keep its color, when to water, temperature, feeding, pruning and propagation in water. Expert-reviewed, with sources.",
    botanicalName: "Epipremnum aureum",
  }),
  plant({
    slug: "snake-plant-care",
    label: "Snake plant",
    summary: "Water less, give it light, and keep it thriving through winter.",
    description:
      "How to care for a snake plant: water only when the mix is dry, the light it tolerates, winter care, repotting and propagation. Expert-reviewed, with sources.",
    botanicalName: "Dracaena trifasciata",
  }),
  plant({
    slug: "fiddle-leaf-fig-care",
    label: "Fiddle leaf fig",
    summary: "Steady light and water so the leaves stay on.",
    description:
      "How to care for a fiddle leaf fig: bright light, when to water, why leaves drop or get brown spots, and pet safety. Expert-reviewed, with sources.",
    botanicalName: "Ficus lyrata",
  }),
  plant({
    slug: "peace-lily-care",
    label: "Peace lily",
    summary: "Why it droops, and how to get it to flower again.",
    description:
      "How to care for a peace lily: when to water, why it droops, how much light, getting it to flower, and cat safety. Expert-reviewed, with sources.",
    botanicalName: "Spathiphyllum",
  }),
  problem({
    slug: "yellow-leaves",
    label: "Yellow leaves",
    summary: "Find the cause from which leaves turn yellow, and how.",
    description:
      "Why houseplant leaves turn yellow: overwatering, underwatering, low light, nutrients, cold and pests. A quick diagnosis table and fixes, expert-reviewed.",
  }),
  problem({
    slug: "brown-leaf-tips",
    label: "Brown leaf tips",
    summary: "Dry air, watering, salts and the other causes, with fixes.",
    description:
      "Why houseplant leaf tips turn brown and crispy: dry air, uneven watering, salt build-up, water quality, sun and cold. Causes, fixes and when to trim.",
  }),
  problem({
    slug: "root-rot",
    label: "Root rot",
    summary: "Spot it, save the plant, and keep it from coming back.",
    description:
      "How to spot root rot in houseplants, save a plant step by step, know when to start over, and prevent it. Expert-reviewed, with sources.",
  }),
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);

/** The app screen shown in a guide's "How Plantalk AI Helps" section. */
export const GUIDE_APP_SCREEN: Record<GuideKind, { src: StaticImageData; alt: string; caption: string }> = {
  plant: {
    src: careToday,
    alt: "Plantalk AI's Care screen with today's tasks and a weather tip",
    caption: "The Care screen lists what to water and check each day.",
  },
  problem: {
    src: healthOverTime,
    alt: "Health over time chart for a plant in Plantalk AI",
    caption: "Each plant's health score and how it changes over time.",
  },
};
