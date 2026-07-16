"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Noto_Sans, Noto_Sans_JP, Noto_Sans_KR } from "next/font/google";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import type { PhoneScreenId } from "../hero/i18n";
import { useLocale } from "../hero/LocaleProvider";
import LanguageSelector from "../hero/LanguageSelector";
import { IconArrowRight } from "../hero/icons";
import FeatureStep from "./FeatureStep";
import ProgressDots from "./ProgressDots";
import StoryPhone from "./StoryPhone";
import styles from "./PhoneJourney.module.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const appleEase = [0.22, 1, 0.36, 1] as const;
const HERO_ID = "hero-stage";
const PHONE_DELAY_MS = 280;
const HERO_ROTATE_MS = 2200;
const HERO_SCREENS: PhoneScreenId[] = [
  "home",
  "checklist",
  "wardOfficeJapanese",
  "expense",
];

type FeatureId =
  | "product-intro"
  | "feature-checklist"
  | "feature-garbage"
  | "feature-japanese"
  | "feature-expense"
  | "feature-shortcuts";

type StageId = typeof HERO_ID | FeatureId;

const FEATURES: {
  id: FeatureId;
  screen: PhoneScreenId;
  sectionKey: "intro" | "checklist" | "garbage" | "japanese" | "expense" | "shortcuts";
  progressKey: "intro" | "checklist" | "garbage" | "japanese" | "expense" | "shortcuts";
  bg: string;
}[] = [
  {
    id: "product-intro",
    screen: "home",
    sectionKey: "intro",
    progressKey: "intro",
    bg: "linear-gradient(180deg, #f7fbff 0%, #ffffff 55%, #ffffff 100%)",
  },
  {
    id: "feature-checklist",
    screen: "checklist",
    sectionKey: "checklist",
    progressKey: "checklist",
    bg: "linear-gradient(180deg, #ffffff 0%, #ffffff 100%)",
  },
  {
    id: "feature-garbage",
    screen: "garbage",
    sectionKey: "garbage",
    progressKey: "garbage",
    bg: "linear-gradient(180deg, #f6f8fb 0%, #fbfcfe 50%, #ffffff 100%)",
  },
  {
    id: "feature-japanese",
    screen: "wardOfficeJapanese",
    sectionKey: "japanese",
    progressKey: "japanese",
    bg: "linear-gradient(180deg, #f8f7ff 0%, #fcfbff 45%, #ffffff 100%)",
  },
  {
    id: "feature-expense",
    screen: "expense",
    sectionKey: "expense",
    progressKey: "expense",
    bg: "linear-gradient(180deg, #f5f9ff 0%, #fafcff 50%, #ffffff 100%)",
  },
  {
    id: "feature-shortcuts",
    screen: "lifeShortcuts",
    sectionKey: "shortcuts",
    progressKey: "shortcuts",
    bg: "linear-gradient(180deg, #ffffff 0%, #fbfdff 100%)",
  },
];

const HERO_BG =
  "radial-gradient(ellipse 50% 42% at 78% 24%, rgba(92, 141, 255, 0.07), transparent 70%), radial-gradient(ellipse 38% 32% at 14% 76%, rgba(37, 99, 235, 0.04), transparent 68%), linear-gradient(180deg, #fafbfd 0%, #f8fbff 45%, #f7fafd 100%)";

function screenForStage(stage: StageId): PhoneScreenId {
  if (stage === HERO_ID) return "home";
  return FEATURES.find((f) => f.id === stage)?.screen ?? "home";
}

export default function PhoneJourney() {
  const { locale, t } = useLocale();
  const reduceMotion = useReducedMotion();
  const hero = t.hero;
  const cta = t.finalCta;

  const [activeStage, setActiveStage] = useState<StageId>(HERO_ID);
  const [displayScreen, setDisplayScreen] = useState<PhoneScreenId>("home");
  const activeStageRef = useRef<StageId>(HERO_ID);

  const nodesRef = useRef(new Map<StageId, HTMLElement>());
  const pausedRef = useRef(false);
  const rotateTimerRef = useRef<number | null>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const stickyPhoneRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);

  const setNodeRef = useCallback(
    (id: StageId) => (node: HTMLElement | null) => {
      if (node) nodesRef.current.set(id, node);
      else nodesRef.current.delete(id);
    },
    [],
  );

  const clearRotate = useCallback(() => {
    if (rotateTimerRef.current !== null) {
      window.clearInterval(rotateTimerRef.current);
      rotateTimerRef.current = null;
    }
  }, []);

  const setStageStable = useCallback((next: StageId) => {
    if (activeStageRef.current === next) return;
    activeStageRef.current = next;
    setActiveStage(next);
  }, []);

  // Single IntersectionObserver — pick step closest to viewport center
  useEffect(() => {
    const stageIds: StageId[] = [HERO_ID, ...FEATURES.map((f) => f.id)];
    const nodes = stageIds
      .map((id) => nodesRef.current.get(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0) return;

    const pickClosest = () => {
      const viewportCenter = window.innerHeight * 0.42;
      let bestId: StageId = activeStageRef.current;
      let bestDist = Number.POSITIVE_INFINITY;

      for (const id of stageIds) {
        const node = nodesRef.current.get(id);
        if (!node) continue;
        const rect = node.getBoundingClientRect();
        if (rect.bottom < 80 || rect.top > window.innerHeight - 80) continue;
        const center = rect.top + rect.height * 0.35;
        const dist = Math.abs(center - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = id;
        }
      }

      setStageStable(bestId);
    };

    const observer = new IntersectionObserver(
      () => {
        pickClosest();
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    pickClosest();
    return () => observer.disconnect();
  }, [locale, setStageStable]);

  // Hero auto-rotation
  useEffect(() => {
    clearRotate();
    if (activeStage !== HERO_ID || reduceMotion) return;

    const startId = window.setTimeout(() => {
      if (pausedRef.current) return;
      rotateTimerRef.current = window.setInterval(() => {
        if (pausedRef.current) return;
        setDisplayScreen((current) => {
          const index = HERO_SCREENS.indexOf(current);
          const safe = index >= 0 ? index : 0;
          return HERO_SCREENS[(safe + 1) % HERO_SCREENS.length];
        });
      }, HERO_ROTATE_MS);
    }, 1200);

    return () => {
      window.clearTimeout(startId);
      clearRotate();
    };
  }, [activeStage, reduceMotion, clearRotate]);

  // Feature screen change after text begins
  useEffect(() => {
    if (activeStage === HERO_ID) return;
    clearRotate();
    const target = screenForStage(activeStage);
    if (target === displayScreen) return;

    const delay = reduceMotion ? 0 : PHONE_DELAY_MS;
    const id = window.setTimeout(() => setDisplayScreen(target), delay);
    return () => window.clearTimeout(id);
  }, [activeStage, displayScreen, reduceMotion, clearRotate]);

  // Subtle hero parallax via CSS custom properties (desktop only)
  useEffect(() => {
    if (reduceMotion) {
      journeyRef.current?.style.setProperty("--hero-parallax", "0");
      return;
    }

    const mq = window.matchMedia("(max-width: 767px)");
    const disableParallax = () => {
      journeyRef.current?.style.setProperty("--hero-parallax", "0");
    };

    if (mq.matches) {
      disableParallax();
      const onChange = () => {
        if (mq.matches) disableParallax();
      };
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }

    let raf = 0;
    const update = () => {
      const heroNode = nodesRef.current.get(HERO_ID);
      if (!heroNode || !journeyRef.current) return;
      const rect = heroNode.getBoundingClientRect();
      const range = Math.max(rect.height * 0.55, 1);
      const raw = Math.min(1, Math.max(0, -rect.top / range));
      const value = activeStageRef.current === HERO_ID ? raw : Math.min(raw, 1);
      journeyRef.current.style.setProperty("--hero-parallax", String(value));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", disableParallax);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", disableParallax);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion, locale]);

  const targetScreen = screenForStage(activeStage);
  const demoActive =
    activeStage !== HERO_ID && displayScreen === targetScreen;

  const activeFeatureIndex =
    activeStage === HERO_ID
      ? -1
      : FEATURES.findIndex((f) => f.id === activeStage);

  const storyBg =
    activeStage === HERO_ID
      ? HERO_BG
      : (FEATURES.find((f) => f.id === activeStage)?.bg ?? HERO_BG);

  const fontClass =
    locale === "ja"
      ? notoSansJp.className
      : locale === "ko"
        ? notoSansKr.className
        : notoSans.className;

  const handlePhoneEnter = () => {
    if (reduceMotion || activeStage !== HERO_ID) return;
    pausedRef.current = true;
    clearRotate();
  };

  const handlePhoneLeave = () => {
    if (reduceMotion || activeStage !== HERO_ID) return;
    pausedRef.current = false;
    clearRotate();
    rotateTimerRef.current = window.setInterval(() => {
      if (pausedRef.current) return;
      setDisplayScreen((current) => {
        const index = HERO_SCREENS.indexOf(current);
        const safe = index >= 0 ? index : 0;
        return HERO_SCREENS[(safe + 1) % HERO_SCREENS.length];
      });
    }, HERO_ROTATE_MS);
  };

  const scrollToFeature = (id: string) => {
    const node = nodesRef.current.get(id as StageId);
    if (!node) return;
    node.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    setStageStable(id as StageId);
  };

  const progressItems = FEATURES.map((f) => ({
    id: f.id,
    label: t.progress[f.progressKey],
  }));

  const progressActiveId =
    activeStage === HERO_ID ? FEATURES[0].id : activeStage;

  return (
    <div
      ref={journeyRef}
      className={`${styles.journey} ${fontClass}`}
      style={{ ["--story-bg" as string]: storyBg }}
    >
      <div className={styles.storyBg} aria-hidden="true" />
      <div className={styles.heroWash} aria-hidden="true" />

      <motion.header
        className={styles.header}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase, delay: 0.02 }}
      >
        <LanguageSelector />
      </motion.header>

      <div className={styles.grid}>
        <div className={styles.copyColumn}>
          <section
            id={HERO_ID}
            ref={setNodeRef(HERO_ID)}
            className={styles.heroStage}
            aria-label="Hero"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={locale}
                ref={heroCopyRef}
                className={styles.heroCopy}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.55, ease: appleEase }}
              >
                <p className={styles.label}>{hero.brand}</p>
                <h1 className={styles.headline}>
                  {hero.headlineLine1}
                  <br />
                  {hero.headlineLine2}
                </h1>
                <p className={styles.subtitle}>
                  {hero.subtitleLine1}
                  <br />
                  {hero.subtitleLine2}
                </p>
                <p className={styles.support}>{hero.support}</p>
                <div className={styles.actions}>
                  <a className={styles.btnPrimary} href="#beta">
                    {hero.ctaBeta}
                  </a>
                  <a className={styles.btnSecondary} href="#product-intro">
                    <span className={styles.btnSecondaryText}>
                      {hero.ctaExplore}
                    </span>
                    <span className={styles.btnArrow}>
                      <IconArrowRight size={16} />
                    </span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className={styles.mobileHeroPhone}>
              <div
                onMouseEnter={handlePhoneEnter}
                onMouseLeave={handlePhoneLeave}
              >
                <StoryPhone
                  screen={displayScreen}
                  demoActive={demoActive}
                  floating={activeStage === HERO_ID}
                />
              </div>
            </div>
          </section>

          <div className={styles.blend} aria-hidden="true" />

          <div className={styles.storySteps}>
            {FEATURES.map((feature, index) => {
              const copy = t.sections[feature.sectionKey];
              return (
                <FeatureStep
                  key={feature.id}
                  id={feature.id}
                  index={index}
                  screen={feature.screen}
                  heading={copy.heading}
                  body={copy.body}
                  active={activeStage === feature.id}
                  stepRef={setNodeRef(feature.id)}
                  mobilePhone={
                    <StoryPhone
                      screen={feature.screen}
                      demoActive={activeStage === feature.id}
                    />
                  }
                />
              );
            })}
          </div>
        </div>

        <div className={styles.stickyPhoneColumn}>
          <div
            ref={stickyPhoneRef}
            className={styles.stickyPhone}
            onMouseEnter={handlePhoneEnter}
            onMouseLeave={handlePhoneLeave}
          >
            <div className={styles.phoneCluster}>
              <StoryPhone
                screen={displayScreen}
                demoActive={demoActive}
                floating={activeStage === HERO_ID}
              />
              <ProgressDots
                items={progressItems}
                activeId={progressActiveId}
                onSelect={scrollToFeature}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        id="beta"
        className={styles.finalCta}
        data-active={activeFeatureIndex === FEATURES.length - 1 ? "near" : ""}
      >
        <motion.div
          className={styles.finalInner}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.62, ease: appleEase }}
        >
          <p className={styles.finalHeading}>{cta.heading}</p>
          <p className={styles.finalBrand}>{cta.brand}</p>
          <a className={styles.finalButton} href="#beta">
            {cta.cta}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
