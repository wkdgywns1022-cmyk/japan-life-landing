"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
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
import DesktopExperience from "./DesktopExperience";
import MobileProductShowcase from "./MobileProductShowcase";
import StoryPhone from "./StoryPhone";
import {
  COMPACT_MQ,
  EXPLORE_HREF_DESKTOP,
  HERO_ID,
  PRODUCT_FEATURES,
  type StageId,
} from "./features";
import { useLayoutMode } from "./useLayoutBreakpoint";
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
const HERO_ROTATE_MS = 2200;
const HERO_SCREENS: PhoneScreenId[] = [
  "home",
  "checklist",
  "wardOfficeJapanese",
  "expense",
];

/**
 * Single page, single URL.
 * Desktop (≥900): DesktopExperience — one continuous sticky phone
 * Mobile (<900): Hero + MobileProductShowcase
 */
export default function PhoneJourney() {
  const { locale, t } = useLocale();
  const reduceMotion = useReducedMotion();
  const layoutMode = useLayoutMode();
  const isDesktop = layoutMode === "desktop";
  const isMobile = layoutMode === "mobile";
  const hero = t.hero;
  const cta = t.finalCta;

  const [activeStage, setActiveStage] = useState<StageId>(HERO_ID);
  const [displayScreen, setDisplayScreen] = useState<PhoneScreenId>("home");
  const [heroNode, setHeroNode] = useState<HTMLElement | null>(null);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(-1);
  const activeStageRef = useRef<StageId>(HERO_ID);

  const rotateTimerRef = useRef<number | null>(null);

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

  // Mobile only: track hero visibility for screen-rotation pause
  useEffect(() => {
    if (!isMobile || !heroNode) return;

    const syncHero = () => {
      const rect = heroNode.getBoundingClientRect();
      const inHero = rect.bottom > window.innerHeight * 0.28;
      setStageStable(inHero ? HERO_ID : "product-intro");
    };

    const observer = new IntersectionObserver(syncHero, {
      root: null,
      threshold: [0, 0.15, 0.35, 0.55],
    });
    observer.observe(heroNode);
    syncHero();
    window.addEventListener("scroll", syncHero, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncHero);
    };
  }, [isMobile, heroNode, setStageStable]);

  // Mobile hero screen rotation
  useEffect(() => {
    if (!isMobile) {
      clearRotate();
      return;
    }
    clearRotate();
    if (activeStage !== HERO_ID || reduceMotion) return;

    const startId = window.setTimeout(() => {
      rotateTimerRef.current = window.setInterval(() => {
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
  }, [isMobile, activeStage, reduceMotion, clearRotate]);

  const fontClass =
    locale === "ja"
      ? notoSansJp.className
      : locale === "ko"
        ? notoSansKr.className
        : notoSans.className;

  const handleExploreClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = window.matchMedia(COMPACT_MQ).matches
      ? "product-showcase"
      : "product-intro";
    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });

    const settleMs = reduceMotion ? 0 : 420;
    window.setTimeout(() => {
      const delta = target.getBoundingClientRect().top;
      if (Math.abs(delta) > 2) {
        window.scrollBy({ top: delta, left: 0, behavior: "auto" });
      }
    }, settleMs);
  };

  const heroCopy = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={locale}
        className={styles.heroCopy}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0 }}
        transition={{ duration: 0.55, ease: appleEase }}
      >
        <p className={styles.label}>{hero.brand}</p>
        <h1 className={styles.headline} data-locale={locale}>
          {hero.headlineLine1}
          <br />
          {hero.headlineLine2}
          {hero.headlineLine3 ? (
            <>
              <br />
              {hero.headlineLine3}
            </>
          ) : null}
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
          <a
            className={styles.btnSecondary}
            href={EXPLORE_HREF_DESKTOP}
            onClick={handleExploreClick}
          >
            <span className={styles.btnSecondaryText}>{hero.ctaExplore}</span>
            <span className={styles.btnArrow}>
              <IconArrowRight size={16} />
            </span>
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div
      className={`${styles.journey} ${fontClass}`}
      data-layout={layoutMode ?? "pending"}
      data-locale={locale}
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

      {/* Desktop: one continuous sticky phone beside Hero + Product Story */}
      {isDesktop ? (
        <DesktopExperience
          features={PRODUCT_FEATURES}
          heroContent={heroCopy}
          onActiveFeatureIndexChange={setActiveFeatureIndex}
        />
      ) : null}

      {/* Mobile: stacked Hero + dedicated showcase */}
      {isMobile ? (
        <>
          <section
            id={HERO_ID}
            ref={setHeroNode}
            className={styles.heroStage}
            aria-label="Hero"
            data-layout="mobile"
          >
            <div className={styles.heroInner}>
              <div className={styles.heroTextColumn}>{heroCopy}</div>
            </div>
            <div className={styles.mobileHeroPhoneArea}>
              <div className={styles.mobileHeroPhone}>
                <StoryPhone
                  screen={displayScreen}
                  demoActive={false}
                  floating={false}
                  size="hero"
                />
              </div>
            </div>
          </section>

          <div className={styles.blend} aria-hidden="true" />

          <MobileProductShowcase features={PRODUCT_FEATURES} />
        </>
      ) : null}

      <div
        id="beta"
        className={styles.finalCta}
        data-active={
          activeFeatureIndex === PRODUCT_FEATURES.length - 1 ? "near" : ""
        }
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
