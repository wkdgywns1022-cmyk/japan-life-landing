"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale } from "../hero/LocaleProvider";
import type { ProductFeature } from "./features";
import { COMPACT_MQ } from "./features";
import ProgressDots from "./ProgressDots";
import StoryPhone from "./StoryPhone";
import styles from "./MobileProductShowcase.module.css";

type NavigationSource = "swipe" | "dot" | "initial" | "locale";

type Props = {
  features: ProductFeature[];
};

const appleEase = [0.22, 1, 0.36, 1] as const;
const SWIPE_THRESHOLD_PX = 48;
const TRANSITION_MS = 560;
const DEMO_START_DELAY_MS = 520;

/**
 * Mobile showcase (<900px): fit-to-viewport composition + pointer swipe + direct dots.
 */
export default function MobileProductShowcase({ features }: Props) {
  const { t, locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [navigationSource, setNavigationSource] =
    useState<NavigationSource>("initial");
  const [transitioning, setTransitioning] = useState(false);
  const [demoReady, setDemoReady] = useState(true);
  const [dragX, setDragX] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const activeIndexRef = useRef(0);
  const transitionIdRef = useRef(0);
  const timersRef = useRef<number[]>([]);
  const pointerRef = useRef<{
    id: number | null;
    startX: number;
    startY: number;
    tracking: boolean;
    horizontal: boolean | null;
  }>({ id: null, startX: 0, startY: 0, tracking: false, horizontal: null });

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_MQ);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const goToFeature = useCallback(
    (targetIndex: number, source: NavigationSource) => {
      if (!enabled) return;
      const clamped = Math.max(0, Math.min(features.length - 1, targetIndex));
      if (clamped === activeIndexRef.current && source !== "locale") return;

      transitionIdRef.current += 1;
      const transitionId = transitionIdRef.current;
      clearTimers();
      setDragX(0);
      setDemoReady(false);
      setNavigationSource(source);
      setTransitioning(true);

      if (source === "swipe") setShowHint(false);

      activeIndexRef.current = clamped;
      setActiveIndex(clamped);

      const settleMs = reduceMotion ? 0 : TRANSITION_MS;
      schedule(() => {
        if (transitionId !== transitionIdRef.current) return;
        setTransitioning(false);
        schedule(() => {
          if (transitionId !== transitionIdRef.current) return;
          setDemoReady(true);
        }, reduceMotion ? 0 : Math.max(0, DEMO_START_DELAY_MS - settleMs));
      }, settleMs);
    },
    [enabled, features.length, clearTimers, schedule, reduceMotion],
  );

  const onDotSelect = useCallback(
    (id: string) => {
      const i = features.findIndex((f) => f.id === id);
      if (i < 0) return;
      if (transitioning && i === activeIndexRef.current) return;
      goToFeature(i, "dot");
    },
    [features, goToFeature, transitioning],
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!enabled || e.button === 2) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest("button, a, input, textarea")) return;

    pointerRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      tracking: true,
      horizontal: null,
    };
    setDragX(0);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const p = pointerRef.current;
    if (!p.tracking || p.id !== e.pointerId) return;

    const dx = e.clientX - p.startX;
    const dy = e.clientY - p.startY;

    if (p.horizontal === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      p.horizontal = Math.abs(dx) > Math.abs(dy) * 1.15;
      if (!p.horizontal) {
        p.tracking = false;
        setDragX(0);
        return;
      }
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }

    if (!p.horizontal) return;
    e.preventDefault();
    const capped = Math.max(-6, Math.min(6, dx * 0.08));
    setDragX(capped);
  };

  const finishPointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    const p = pointerRef.current;
    if (!p.tracking || p.id !== e.pointerId) {
      pointerRef.current.tracking = false;
      setDragX(0);
      return;
    }

    const dx = e.clientX - p.startX;
    const wasHorizontal = p.horizontal === true;
    pointerRef.current = {
      id: null,
      startX: 0,
      startY: 0,
      tracking: false,
      horizontal: null,
    };
    setDragX(0);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    if (!wasHorizontal || !enabled) return;

    if (dx <= -SWIPE_THRESHOLD_PX) {
      goToFeature(activeIndexRef.current + 1, "swipe");
    } else if (dx >= SWIPE_THRESHOLD_PX) {
      goToFeature(activeIndexRef.current - 1, "swipe");
    }
  };

  const feature = features[activeIndex] ?? features[0];
  const text = t.sections[feature.sectionKey];
  const marker = String(activeIndex + 1).padStart(2, "0");
  const lines = text.heading.split("\n");
  // Compact body: keep paragraph breaks, collapse soft newlines to spaces
  const bodyBlocks = text.body.split("\n\n").map((block) =>
    block.split("\n").join(" "),
  );

  const progressItems = features.map((f) => ({
    id: f.id,
    label: t.progress[f.progressKey],
  }));

  const demoActive = enabled && demoReady && !transitioning && !reduceMotion;
  const reduced = Boolean(reduceMotion);

  return (
    <section
      id="product-showcase"
      className={styles.showcase}
      aria-label="Product showcase"
      data-layout="mobile"
      data-nav={navigationSource}
    >
      <div
        className={styles.inner}
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
      >
        <div className={styles.featureText}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${feature.id}-${locale}`}
              className={styles.textBlock}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={
                reduced
                  ? { opacity: 1, transition: { duration: 0.15 } }
                  : {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.46,
                        ease: appleEase,
                        delay: 0.1,
                      },
                    }
              }
              exit={
                reduced
                  ? { opacity: 0, transition: { duration: 0.12 } }
                  : {
                      opacity: 0,
                      y: -6,
                      transition: { duration: 0.2, ease: appleEase },
                    }
              }
            >
              <p className={styles.marker}>{marker}</p>
              <h2 className={styles.heading}>
                {lines.map((line) => (
                  <span key={line} className={styles.line}>
                    {line}
                  </span>
                ))}
              </h2>
              <div className={styles.body}>
                {bodyBlocks.map((block) => (
                  <p key={block} className={styles.paragraph}>
                    {block}
                  </p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.phoneArea}>
          <div
            className={styles.phoneFrame}
            style={dragX ? { transform: `translateX(${dragX}px)` } : undefined}
          >
            <StoryPhone
              screen={feature.screen}
              demoActive={demoActive}
              size="showcase"
              motionPreset="mobileShowcase"
            />
          </div>
        </div>

        <div className={styles.controls}>
          <ProgressDots
            items={progressItems}
            activeId={feature.id}
            onSelect={onDotSelect}
            orientation="horizontal"
            enlargeActive
            compact
            disableActiveWhileTransitioning={transitioning}
          />
          {showHint ? (
            <p className={styles.swipeHint}>{t.showcase.swipeHint}</p>
          ) : (
            <p className={styles.swipeHintSpacer} aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
