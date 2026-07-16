"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import type { PhoneScreenId } from "../hero/i18n";
import { useLocale } from "../hero/LocaleProvider";
import LanguageSelector from "../hero/LanguageSelector";
import FeatureStep from "./FeatureStep";
import ProgressDots from "./ProgressDots";
import StoryPhone from "./StoryPhone";
import {
  HERO_ID,
  PRODUCT_FEATURES,
  screenForStage,
  type FeatureId,
  type ProductFeature,
  type StageId,
} from "./features";
import styles from "./DesktopExperience.module.css";

const PHONE_DELAY_MS = 280;
const HERO_ROTATE_MS = 2200;
const HERO_SCREENS: PhoneScreenId[] = [
  "home",
  "checklist",
  "wardOfficeJapanese",
  "expense",
];

type Props = {
  features?: ProductFeature[];
  heroContent: ReactNode;
  /** Reports active feature index (-1 while in Hero) for outer chrome. */
  onActiveFeatureIndexChange?: (index: number) => void;
};

/**
 * Desktop (≥900): Hero is the first text step of one continuous product story.
 * One sticky language selector + one physical phone for the entire experience.
 */
export default function DesktopExperience({
  features = PRODUCT_FEATURES,
  heroContent,
  onActiveFeatureIndexChange,
}: Props) {
  const { t, locale } = useLocale();
  const reduceMotion = useReducedMotion();

  const [activeStage, setActiveStage] = useState<StageId>(HERO_ID);
  const [displayScreen, setDisplayScreen] = useState<PhoneScreenId>("home");

  const activeStageRef = useRef<StageId>(HERO_ID);
  const nodesRef = useRef(new Map<StageId, HTMLElement>());
  const rotateTimerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const heroStepRef = useRef<HTMLElement | null>(null);

  const clearRotate = useCallback(() => {
    if (rotateTimerRef.current !== null) {
      window.clearInterval(rotateTimerRef.current);
      rotateTimerRef.current = null;
    }
  }, []);

  const setStageStable = useCallback(
    (next: StageId) => {
      if (activeStageRef.current === next) return;
      activeStageRef.current = next;
      setActiveStage(next);

      const index =
        next === HERO_ID ? -1 : features.findIndex((f) => f.id === next);
      onActiveFeatureIndexChange?.(index);
    },
    [features, onActiveFeatureIndexChange],
  );

  const setNodeRef = useCallback(
    (id: StageId) => (node: HTMLElement | null) => {
      if (node) nodesRef.current.set(id, node);
      else nodesRef.current.delete(id);
    },
    [],
  );

  useEffect(() => {
    const heroEl = heroStepRef.current;
    if (heroEl) nodesRef.current.set(HERO_ID, heroEl);
    else nodesRef.current.delete(HERO_ID);

    const stageIds: StageId[] = [HERO_ID, ...features.map((f) => f.id)];

    const pickClosest = () => {
      const targetLine = window.innerHeight * 0.42;
      let bestId: StageId = activeStageRef.current;
      let bestDist = Number.POSITIVE_INFINITY;

      for (const id of stageIds) {
        const node = nodesRef.current.get(id);
        if (!node) continue;
        const rect = node.getBoundingClientRect();
        if (rect.bottom < 40 || rect.top > window.innerHeight - 40) continue;
        const center = rect.top + rect.height * 0.5;
        const dist = Math.abs(center - targetLine);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = id;
        }
      }

      if (bestId !== activeStageRef.current) {
        setStageStable(bestId);
      }
    };

    const observer = new IntersectionObserver(() => pickClosest(), {
      root: null,
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.15, 0.3, 0.5],
    });

    stageIds.forEach((id) => {
      const node = nodesRef.current.get(id);
      if (node) observer.observe(node);
    });

    pickClosest();
    window.addEventListener("scroll", pickClosest, { passive: true });
    window.addEventListener("resize", pickClosest, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pickClosest);
      window.removeEventListener("resize", pickClosest);
    };
  }, [features, locale, setStageStable]);

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

    const target = screenForStage(activeStage);
    if (target === displayScreen) return;

    const delay = reduceMotion ? 0 : PHONE_DELAY_MS;
    const id = window.setTimeout(() => setDisplayScreen(target), delay);
    return () => window.clearTimeout(id);
  }, [activeStage, displayScreen, reduceMotion, clearRotate]);

  const scrollToFeature = useCallback(
    (id: string) => {
      const node = nodesRef.current.get(id as FeatureId);
      if (!node) return;
      node.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
      setStageStable(id as FeatureId);
    },
    [reduceMotion, setStageStable],
  );

  const progressItems = useMemo(
    () =>
      features.map((f) => ({
        id: f.id,
        label: t.progress[f.progressKey],
      })),
    [features, t],
  );

  const inStory = activeStage !== HERO_ID;
  const targetScreen = screenForStage(activeStage);
  const demoActive =
    inStory && displayScreen === targetScreen && !reduceMotion;
  const progressActiveId = inStory ? activeStage : features[0].id;

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

  return (
    <section
      className={styles.experience}
      aria-label="Product experience"
      data-layout="desktop"
      data-stage={activeStage}
    >
      <div className={styles.grid}>
        <div className={styles.textFlow}>
          <section
            id={HERO_ID}
            ref={(node) => {
              heroStepRef.current = node;
              setNodeRef(HERO_ID)(node);
            }}
            className={styles.heroStep}
            aria-label="Hero"
            data-active={activeStage === HERO_ID ? "true" : "false"}
          >
            {heroContent}
          </section>

          <div className={styles.featureSteps}>
            {features.map((feature, index) => {
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
                />
              );
            })}
          </div>
        </div>

        <aside className={styles.visualRail}>
          <div className={styles.languageAndPhone}>
            <div className={styles.phoneStage}>
              <div className={styles.languageSlot}>
                <LanguageSelector />
              </div>

              <div
                className={styles.stickyPhone}
                onMouseEnter={handlePhoneEnter}
                onMouseLeave={handlePhoneLeave}
              >
                <StoryPhone
                  screen={displayScreen}
                  demoActive={demoActive}
                  floating={false}
                  pauseOnHover
                  size="hero"
                />
                <div
                  className={styles.progressIndicator}
                  data-visible={inStory ? "true" : "false"}
                >
                  <ProgressDots
                    items={progressItems}
                    activeId={progressActiveId}
                    onSelect={scrollToFeature}
                    orientation="vertical"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
