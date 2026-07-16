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
  HERO_ID,
  PRODUCT_FEATURES,
  screenForStage,
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
const PHONE_DELAY_MS = 280;
const HERO_ROTATE_MS = 2200;
const HERO_SCREENS: PhoneScreenId[] = [
  "home",
  "checklist",
  "wardOfficeJapanese",
  "expense",
];

/**
 * Single page, single URL.
 * Desktop (≥900): Hero + DesktopProductStory only
 * Mobile (<900): Hero + MobileProductShowcase only
 * Exactly one product controller is mounted.
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
  const activeStageRef = useRef<StageId>(HERO_ID);

  const pausedRef = useRef(false);
  const rotateTimerRef = useRef<number | null>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const heroPhoneRef = useRef<HTMLDivElement>(null);
  const storyClusterRef = useRef<HTMLDivElement>(null);
  const handoffProgressRef = useRef(0);

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

  // Mobile: only track hero visibility for hero-screen rotation pause
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

  // Desktop only: sync story phone screen from active feature stage
  useEffect(() => {
    if (!isDesktop) return;
    if (activeStage === HERO_ID) return;
    clearRotate();

    const target = screenForStage(activeStage);
    if (target === displayScreen) return;

    const delay = reduceMotion ? 0 : PHONE_DELAY_MS;
    const id = window.setTimeout(() => setDisplayScreen(target), delay);
    return () => window.clearTimeout(id);
  }, [
    activeStage,
    displayScreen,
    reduceMotion,
    clearRotate,
    isDesktop,
  ]);

  // Desktop only: parallax + phone handoff
  useEffect(() => {
    if (!isDesktop) {
      journeyRef.current?.style.setProperty("--hero-parallax", "0");
      journeyRef.current?.style.setProperty("--phone-handoff-progress", "0");
      handoffProgressRef.current = 0;
      heroPhoneRef.current?.removeAttribute("data-handoff-done");
      storyClusterRef.current?.removeAttribute("data-handoff-ready");
      return;
    }

    if (reduceMotion) {
      journeyRef.current?.style.setProperty("--hero-parallax", "0");
    }

    let raf = 0;
    const update = () => {
      const root = journeyRef.current;
      const heroEl = heroNode;
      if (!root || !heroEl) return;

      const heroRect = heroEl.getBoundingClientRect();
      const heroHeight = Math.max(heroRect.height, 1);
      const scrolled = Math.max(0, -heroRect.top);

      if (!reduceMotion) {
        const parallaxRange = Math.max(heroHeight * 0.55, 1);
        const parallax = Math.min(1, Math.max(0, scrolled / parallaxRange));
        root.style.setProperty("--hero-parallax", String(parallax));
      }

      const handoffStart = heroHeight * 0.65;
      const handoffRange = Math.max(heroHeight * 0.35, 1);
      let progress = (scrolled - handoffStart) / handoffRange;
      progress = Math.min(1, Math.max(0, progress));

      if (heroRect.bottom < window.innerHeight * 0.42) {
        progress = 1;
      }

      if (Math.abs(progress - handoffProgressRef.current) > 0.002) {
        handoffProgressRef.current = progress;
        root.style.setProperty(
          "--phone-handoff-progress",
          progress.toFixed(4),
        );
      }

      const done = progress >= 0.98;
      if (heroPhoneRef.current) {
        if (done) heroPhoneRef.current.setAttribute("data-handoff-done", "true");
        else heroPhoneRef.current.removeAttribute("data-handoff-done");
      }
      if (storyClusterRef.current) {
        if (done)
          storyClusterRef.current.setAttribute("data-handoff-ready", "true");
        else storyClusterRef.current.removeAttribute("data-handoff-ready");
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion, locale, heroNode, isDesktop]);

  const targetScreen = screenForStage(activeStage);
  const demoActive =
    isDesktop && activeStage !== HERO_ID && displayScreen === targetScreen;

  const activeFeatureIndex =
    !isDesktop || activeStage === HERO_ID
      ? -1
      : PRODUCT_FEATURES.findIndex((f) => f.id === activeStage);

  const fontClass =
    locale === "ja"
      ? notoSansJp.className
      : locale === "ko"
        ? notoSansKr.className
        : notoSans.className;

  const handlePhoneEnter = () => {
    if (!isDesktop || reduceMotion || activeStage !== HERO_ID) return;
    pausedRef.current = true;
    clearRotate();
  };

  const handlePhoneLeave = () => {
    if (!isDesktop || reduceMotion || activeStage !== HERO_ID) return;
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
        ref={heroCopyRef}
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

  const heroSection = (
    <section
      id={HERO_ID}
      ref={setHeroNode}
      className={styles.heroStage}
      aria-label="Hero"
      data-layout={layoutMode ?? "pending"}
    >
      <div className={styles.heroInner}>
        <div className={styles.heroTextColumn}>{heroCopy}</div>

        {/* Desktop hero phone — mounted only on desktop */}
        {isDesktop ? (
          <div className={styles.heroPhoneColumn}>
            <div
              ref={heroPhoneRef}
              className={styles.heroPhone}
              onMouseEnter={handlePhoneEnter}
              onMouseLeave={handlePhoneLeave}
            >
              <StoryPhone
                screen={displayScreen}
                demoActive={false}
                floating={activeStage === HERO_ID}
                size="hero"
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* Mobile hero phone — full-width area, flex-centered phone */}
      {isMobile ? (
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
      ) : null}
    </section>
  );

  return (
    <div
      ref={journeyRef}
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

      {heroSection}

      <div className={styles.blend} aria-hidden="true" />

      {/* Exactly one product controller — never both */}
      {isDesktop ? (
        <DesktopProductStory
          features={PRODUCT_FEATURES}
          activeStage={activeStage}
          onStageChange={setStageStable}
          heroNode={heroNode}
          displayScreen={displayScreen}
          demoActive={demoActive}
          floating={false}
          onPhoneEnter={handlePhoneEnter}
          onPhoneLeave={handlePhoneLeave}
          phoneClusterRef={storyClusterRef}
        >
          <div className={styles.storyGrid}>
            <div className={styles.storyCopy}>
              <DesktopProductStory.Steps />
            </div>
            <DesktopProductStory.Phone />
          </div>
        </DesktopProductStory>
      ) : null}

      {isMobile ? (
        <MobileProductShowcase features={PRODUCT_FEATURES} />
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
