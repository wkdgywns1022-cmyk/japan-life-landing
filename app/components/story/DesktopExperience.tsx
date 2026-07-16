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
 * Desktop (≥900): one continuous sticky phone beside Hero + Product Story text.
 * Exactly one physical phone shell — only the internal screen changes.
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
  const heroBlockRef = useRef<HTMLDivElement | null>(null);

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
        next === HERO_ID
          ? -1
          : features.findIndex((f) => f.id === next);
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

  // Observe Hero + feature steps — single active stage controller
  useEffect(() => {
    const heroEl = heroBlockRef.current;
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

  // Hero micro-demo rotation — only while Hero is active
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

  // Product Story: sync internal screen from active feature
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
          <div
            id={HERO_ID}
            ref={(node) => {
              heroBlockRef.current = node;
              setNodeRef(HERO_ID)(node);
            }}
            className={styles.heroBlock}
            aria-label="Hero"
          >
            {heroContent}
          </div>

          <div className={styles.storySteps}>
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

        <div className={styles.phoneRail} aria-hidden={false}>
          <div
            className={styles.stickyPhone}
            onMouseEnter={handlePhoneEnter}
            onMouseLeave={handlePhoneLeave}
          >
            <div className={styles.phoneCluster}>
              <StoryPhone
                screen={displayScreen}
                demoActive={demoActive}
                floating={activeStage === HERO_ID}
                pauseOnHover
                size="hero"
              />
              <div
                className={styles.clusterDots}
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
      </div>
    </section>
  );
}
