"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import { useLocale } from "../hero/LocaleProvider";
import FeatureStep from "./FeatureStep";
import ProgressDots from "./ProgressDots";
import StoryPhone from "./StoryPhone";
import {
  HERO_ID,
  type FeatureId,
  type ProductFeature,
  type StageId,
} from "./features";
import { useIsDesktopLayout } from "./useLayoutBreakpoint";
import styles from "./DesktopProductStory.module.css";

type DesktopStoryContextValue = {
  features: ProductFeature[];
  activeStage: StageId;
  setNodeRef: (id: StageId) => (node: HTMLElement | null) => void;
  scrollToFeature: (id: string) => void;
  progressItems: { id: string; label: string }[];
  progressActiveId: string;
  displayScreen: import("../hero/i18n").PhoneScreenId;
  demoActive: boolean;
  floating: boolean;
  onPhoneEnter: () => void;
  onPhoneLeave: () => void;
};

const DesktopStoryContext = createContext<DesktopStoryContextValue | null>(
  null,
);

function useDesktopStory() {
  const ctx = useContext(DesktopStoryContext);
  if (!ctx) {
    throw new Error(
      "DesktopProductStory compound components require DesktopProductStory",
    );
  }
  return ctx;
}

type RootProps = {
  features: ProductFeature[];
  activeStage: StageId;
  onStageChange: (stage: StageId) => void;
  /** Hero section element — included in desktop sticky-scroll observation. */
  heroNode: HTMLElement | null;
  displayScreen: import("../hero/i18n").PhoneScreenId;
  demoActive: boolean;
  floating: boolean;
  onPhoneEnter: () => void;
  onPhoneLeave: () => void;
  children: ReactNode;
};

function DesktopProductStoryRoot({
  features,
  activeStage,
  onStageChange,
  heroNode,
  displayScreen,
  demoActive,
  floating,
  onPhoneEnter,
  onPhoneLeave,
  children,
}: RootProps) {
  const { t, locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const enabled = useIsDesktopLayout();
  const nodesRef = useRef(new Map<StageId, HTMLElement>());
  const activeRef = useRef(activeStage);

  useEffect(() => {
    activeRef.current = activeStage;
  }, [activeStage]);

  const setNodeRef = useCallback(
    (id: StageId) => (node: HTMLElement | null) => {
      if (node) nodesRef.current.set(id, node);
      else nodesRef.current.delete(id);
    },
    [],
  );

  useEffect(() => {
    if (!enabled) return;

    if (heroNode) nodesRef.current.set(HERO_ID, heroNode);
    else nodesRef.current.delete(HERO_ID);

    const stageIds: StageId[] = [HERO_ID, ...features.map((f) => f.id)];

    const pickClosest = () => {
      const targetLine = window.innerHeight * 0.42;
      let bestId: StageId = activeRef.current;
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

      if (bestId !== activeRef.current) {
        activeRef.current = bestId;
        onStageChange(bestId);
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
  }, [enabled, features, heroNode, locale, onStageChange]);

  const scrollToFeature = useCallback(
    (id: string) => {
      const node = nodesRef.current.get(id as FeatureId);
      if (!node) return;
      node.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
      onStageChange(id as FeatureId);
    },
    [onStageChange, reduceMotion],
  );

  const progressItems = useMemo(
    () =>
      features.map((f) => ({
        id: f.id,
        label: t.progress[f.progressKey],
      })),
    [features, t],
  );

  const progressActiveId =
    activeStage === HERO_ID ? features[0].id : activeStage;

  const value = useMemo<DesktopStoryContextValue>(
    () => ({
      features,
      activeStage,
      setNodeRef,
      scrollToFeature,
      progressItems,
      progressActiveId,
      displayScreen,
      demoActive,
      floating,
      onPhoneEnter,
      onPhoneLeave,
    }),
    [
      features,
      activeStage,
      setNodeRef,
      scrollToFeature,
      progressItems,
      progressActiveId,
      displayScreen,
      demoActive,
      floating,
      onPhoneEnter,
      onPhoneLeave,
    ],
  );

  return (
    <DesktopStoryContext.Provider value={value}>
      {children}
    </DesktopStoryContext.Provider>
  );
}

function DesktopProductSteps() {
  const { t } = useLocale();
  const { features, activeStage, setNodeRef } = useDesktopStory();

  return (
    <div className={styles.steps} data-layout="desktop">
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
  );
}

function DesktopProductPhone() {
  const {
    progressItems,
    progressActiveId,
    scrollToFeature,
    displayScreen,
    demoActive,
    floating,
    onPhoneEnter,
    onPhoneLeave,
  } = useDesktopStory();

  return (
    <div className={styles.phoneColumn} data-layout="desktop">
      <div
        className={styles.stickyPhone}
        onMouseEnter={onPhoneEnter}
        onMouseLeave={onPhoneLeave}
      >
        <div className={styles.phoneCluster}>
          <StoryPhone
            screen={displayScreen}
            demoActive={demoActive}
            floating={floating}
            pauseOnHover
          />
          <div className={styles.clusterDots}>
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
  );
}

const DesktopProductStory = Object.assign(DesktopProductStoryRoot, {
  Steps: DesktopProductSteps,
  Phone: DesktopProductPhone,
});

export default DesktopProductStory;
