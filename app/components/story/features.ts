import type { PhoneScreenId } from "../hero/i18n";

/** Layout breakpoint — width only, never user-agent. */
export const COMPACT_MQ = "(max-width: 899px)";
export const DESKTOP_MQ = "(min-width: 900px)";

export const HERO_ID = "hero-stage" as const;

export type FeatureId =
  | "product-intro"
  | "feature-checklist"
  | "feature-garbage"
  | "feature-japanese"
  | "feature-expense"
  | "feature-shortcuts";

export type FeatureSectionKey =
  | "intro"
  | "checklist"
  | "garbage"
  | "japanese"
  | "expense"
  | "shortcuts";

export type ProductFeature = {
  id: FeatureId;
  screen: PhoneScreenId;
  sectionKey: FeatureSectionKey;
  progressKey: FeatureSectionKey;
};

/**
 * Single source of truth for product-story features.
 * Desktop sticky story and mobile swipe showcase both consume this.
 */
export const PRODUCT_FEATURES: ProductFeature[] = [
  {
    id: "product-intro",
    screen: "home",
    sectionKey: "intro",
    progressKey: "intro",
  },
  {
    id: "feature-checklist",
    screen: "checklist",
    sectionKey: "checklist",
    progressKey: "checklist",
  },
  {
    id: "feature-garbage",
    screen: "garbage",
    sectionKey: "garbage",
    progressKey: "garbage",
  },
  {
    id: "feature-japanese",
    screen: "wardOfficeJapanese",
    sectionKey: "japanese",
    progressKey: "japanese",
  },
  {
    id: "feature-expense",
    screen: "expense",
    sectionKey: "expense",
    progressKey: "expense",
  },
  {
    id: "feature-shortcuts",
    screen: "lifeShortcuts",
    sectionKey: "shortcuts",
    progressKey: "shortcuts",
  },
];

export type StageId = typeof HERO_ID | FeatureId;

export function screenForStage(stage: StageId): PhoneScreenId {
  if (stage === HERO_ID) return "home";
  return PRODUCT_FEATURES.find((f) => f.id === stage)?.screen ?? "home";
}

/** Explore CTA targets — one canonical page, layout-width chooses destination. */
export const EXPLORE_HREF_DESKTOP = "#product-intro";
export const EXPLORE_HREF_MOBILE = "#product-showcase";

/** Primary contact CTA — opens inquiry modal (email shown inside). */
export const CONTACT_EMAIL = "wkdgywns1022@gmail.com";
