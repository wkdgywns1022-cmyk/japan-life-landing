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
import DesktopProductStory from "./DesktopProductStory";
import MobileProductShowcase from "./MobileProductShowcase";
import StoryPhone from "./StoryPhone";
import {
  COMPACT_MQ,
  EXPLORE_HREF_DESKTOP,
  EXPLORE_HREF_MOBILE,
  HERO_ID,
  PRODUCT_FEATURES,
  screenForStage,
  type StageId,
} from "./features";
import { useIsCompactLayout } from "./useLayoutBreakpoint";
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
const PHONE_DELAY_MS = 280;
const HERO_ROTATE_MS = 2200;
const HERO_SCREENS: PhoneScreenId[] = [
  "home",
  "checklist",
  "wardOfficeJapanese",
  "expense",
];

/**
 * Single-page journey: shared hero + CTA, with layout-width product stories.
 * Desktop (≥900px): DesktopProductStory sticky scroll
 * Mobile (<900px): MobileProductShowcase horizontal swipe
 * One URL — no separate mobile site, routes, or UA redirects.
 */
export default function PhoneJourney() {
  const { locale, t } = useLocale();
  const reduceMotion = useReducedMotion();
  const isCompact = useIsCompactLayout();
  const hero = t.hero;
  const cta = t.finalCta;

  const [activeStage, setActiveStage] = useState<StageId>(HERO_ID);
  const [displayScreen, setDisplayScreen] = useState<PhoneScreenId>("home");
  const [heroNode, setHeroNode] = useState<HTMLElement | null>(null);
  const activeStageRef = useRef<StageId>(HERO_ID);

  const pausedRef = useRef(false);
  const rotateTimerRef = useRef<number | null>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);

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

  // Compact: only track hero visibility for rotation (showcase owns product state)
  useEffect(() => {
    if (!isCompact || !heroNode) return;

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
  }, [isCompact, heroNode, setStageStable]);

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

  useEffect(() => {
    if (activeStage === HERO_ID) return;
    clearRotate();
    if (isCompact) return;

    const target = screenForStage(activeStage);
    if (target === displayScreen) return;

    const delay = reduceMotion ? 0 : PHONE_DELAY_MS;
    const id = window.setTimeout(() => setDisplayScreen(target), delay);
    return () => window.clearTimeout(id);
  }, [activeStage, displayScreen, reduceMotion, clearRotate, isCompact]);

  useEffect(() => {
    if (reduceMotion) {
      journeyRef.current?.style.setProperty("--hero-parallax", "0");
      return;
    }

    const mq = window.matchMedia(COMPACT_MQ);
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
    const onMq = () => {
      if (mq.matches) disableParallax();
    };
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMq);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion, locale, heroNode]);

  const targetScreen = screenForStage(activeStage);
  const demoActive =
    activeStage !== HERO_ID && displayScreen === targetScreen;

  const activeFeatureIndex =
    activeStage === HERO_ID
      ? -1
      : PRODUCT_FEATURES.findIndex((f) => f.id === activeStage);

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

  const handleExploreClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia(COMPACT_MQ).matches) return;
    event.preventDefault();
    document.getElementById("product-showcase")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div
      ref={journeyRef}
      className={`${styles.journey} ${fontClass}`}
      data-compact={isCompact ? "true" : "false"}
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

      <DesktopProductStory
        features={PRODUCT_FEATURES}
        activeStage={activeStage}
        onStageChange={setStageStable}
        heroNode={heroNode}
        displayScreen={displayScreen}
        demoActive={demoActive}
        floating={activeStage === HERO_ID}
        onPhoneEnter={handlePhoneEnter}
        onPhoneLeave={handlePhoneLeave}
      >
        <div className={styles.grid}>
          <div className={styles.copyColumn}>
            <section
              id={HERO_ID}
              ref={setHeroNode}
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
                    <a
                      className={styles.btnSecondary}
                      href={EXPLORE_HREF_DESKTOP}
                      data-mobile-href={EXPLORE_HREF_MOBILE}
                      onClick={handleExploreClick}
                    >
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
                    demoActive={false}
                    floating={false}
                    size="hero"
                  />
                </div>
              </div>
            </section>

            <div className={styles.blend} aria-hidden="true" />

            <DesktopProductStory.Steps />
            <MobileProductShowcase features={PRODUCT_FEATURES} />
          </div>

          <DesktopProductStory.Phone />
        </div>
      </DesktopProductStory>

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
