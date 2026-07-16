"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { PhoneScreenId } from "../hero/i18n";
import { useLocale } from "../hero/LocaleProvider";
import type { ProductFeature } from "./features";
import { COMPACT_MQ } from "./features";
import ProgressDots from "./ProgressDots";
import StoryPhone from "./StoryPhone";
import styles from "./MobileProductShowcase.module.css";

type Props = {
  features: ProductFeature[];
};

/**
 * Mobile / compact layout (<900px): horizontal swipe product showcase.
 * Hidden on desktop via CSS. Interactions gated with matchMedia (not UA).
 */
export default function MobileProductShowcase({ features }: Props) {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const [displayScreen, setDisplayScreen] = useState<PhoneScreenId>(
    features[0]?.screen ?? "home",
  );
  const [textKey, setTextKey] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_MQ);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const setIndexStable = useCallback((next: number) => {
    if (next === indexRef.current) return;
    indexRef.current = next;
    setIndex(next);
    setTextKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const target = features[index]?.screen ?? "home";
    if (target === displayScreen) return;
    const id = window.setTimeout(
      () => setDisplayScreen(target),
      reduceMotion ? 0 : 40,
    );
    return () => window.clearTimeout(id);
  }, [index, features, displayScreen, reduceMotion, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = track.clientWidth || 1;
        const next = Math.round(track.scrollLeft / w);
        const clamped = Math.max(0, Math.min(features.length - 1, next));
        setIndexStable(clamped);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [features.length, setIndexStable, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const track = trackRef.current;
    if (!track) return;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      track.scrollLeft = startScroll - dx;
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (moved) {
        const w = track.clientWidth || 1;
        const nearest = Math.round(track.scrollLeft / w);
        const clamped = Math.max(0, Math.min(features.length - 1, nearest));
        track.scrollTo({
          left: clamped * w,
          behavior: reduceMotion ? "auto" : "smooth",
        });
        setIndexStable(clamped);
      }
      try {
        track.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    };

    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
    };
  }, [features.length, reduceMotion, setIndexStable, enabled]);

  const goTo = useCallback(
    (id: string) => {
      const i = features.findIndex((f) => f.id === id);
      if (i < 0) return;
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({
        left: i * track.clientWidth,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      setIndexStable(i);
    },
    [features, reduceMotion, setIndexStable],
  );

  const progressItems = features.map((f) => ({
    id: f.id,
    label: t.progress[f.progressKey],
  }));

  const active = features[index] ?? features[0];
  const demoActive = Boolean(active) && displayScreen === active.screen;

  return (
    <section
      id="product-showcase"
      className={styles.showcase}
      aria-label="Product showcase"
      data-layout="mobile"
    >
      <div className={styles.stage}>
        <div className={styles.phone}>
          <StoryPhone
            screen={displayScreen}
            demoActive={demoActive}
            size="story"
          />
        </div>
        <ProgressDots
          items={progressItems}
          activeId={active?.id ?? features[0].id}
          onSelect={goTo}
          orientation="horizontal"
        />
      </div>

      <div
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        aria-roledescription="carousel"
      >
        {features.map((feature, i) => {
          const text = t.sections[feature.sectionKey];
          const marker = String(i + 1).padStart(2, "0");
          const lines = text.heading.split("\n");
          const bodyBlocks = text.body.split("\n\n");
          const isActive = i === index;

          return (
            <article
              key={feature.id}
              id={`showcase-${feature.id}`}
              className={styles.slide}
              aria-current={isActive ? "true" : undefined}
            >
              {isActive && !reduceMotion ? (
                <motion.div
                  key={`text-${feature.id}-${textKey}`}
                  className={styles.slideInner}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
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
                        {block.split("\n").map((line) => (
                          <span key={line} className={styles.line}>
                            {line}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div
                  className={styles.slideInner}
                  style={{ opacity: isActive ? 1 : 0.35 }}
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
                        {block.split("\n").map((line) => (
                          <span key={line} className={styles.line}>
                            {line}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
