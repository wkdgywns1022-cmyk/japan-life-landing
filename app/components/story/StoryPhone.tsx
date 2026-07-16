"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { PhoneScreenId } from "../hero/i18n";
import DeviceShell from "../phone/DeviceShell";
import HomeScreen from "../hero/screens/HomeScreen";
import ChecklistScreen from "../hero/screens/ChecklistScreen";
import GarbageScreen from "../hero/screens/GarbageScreen";
import WardOfficeScreen from "../hero/screens/WardOfficeScreen";
import ExpenseScreen from "../hero/screens/ExpenseScreen";
import LifeShortcutsScreen from "../hero/screens/LifeShortcutsScreen";
import styles from "./StoryPhone.module.css";

const appleEase = [0.22, 1, 0.36, 1] as const;

type Props = {
  screen: PhoneScreenId;
  demoActive?: boolean;
  floating?: boolean;
  size?: "hero" | "story";
  /** When true, hover pauses micro-demo (product-story). Hero leaves false. */
  pauseOnHover?: boolean;
};

function ScreenContent({
  screen,
  demoEnabled,
  demoPaused,
}: {
  screen: PhoneScreenId;
  demoEnabled: boolean;
  demoPaused: boolean;
}) {
  switch (screen) {
    case "checklist":
      return (
        <ChecklistScreen demo enabled={demoEnabled} paused={demoPaused} />
      );
    case "garbage":
      return <GarbageScreen demo enabled={demoEnabled} paused={demoPaused} />;
    case "wardOfficeJapanese":
      return (
        <WardOfficeScreen demo enabled={demoEnabled} paused={demoPaused} />
      );
    case "expense":
      return <ExpenseScreen demo enabled={demoEnabled} paused={demoPaused} />;
    case "lifeShortcuts":
      return (
        <LifeShortcutsScreen demo enabled={demoEnabled} paused={demoPaused} />
      );
    default:
      return <HomeScreen demo enabled={demoEnabled} paused={demoPaused} />;
  }
}

export default function StoryPhone({
  screen,
  demoActive = false,
  floating = false,
  size = "story",
  pauseOnHover = false,
}: Props) {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isCompact, setIsCompact] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const sync = () => setIsCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.15),
      { threshold: [0, 0.15, 0.35] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const demoEnabled =
    Boolean(demoActive) && inView && pageVisible && !reduceMotion;
  const demoPaused = pauseOnHover && hovered;

  const mobileMotion = isCompact && !reduceMotion;
  const reduced = Boolean(reduceMotion);

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      onMouseEnter={() => {
        if (pauseOnHover) setHovered(true);
      }}
      onMouseLeave={() => {
        if (pauseOnHover) setHovered(false);
      }}
    >
      <DeviceShell
        size={size}
        floating={floating && !reduceMotion && !isCompact}
        showHomeIndicator
      >
        <div className={styles.layerHost}>
          <AnimatePresence initial={false}>
            <motion.div
              key={screen}
              className={styles.screenLayer}
              initial={
                reduced
                  ? { opacity: 0 }
                  : mobileMotion
                    ? { opacity: 0, y: 5, scale: 0.995 }
                    : {
                        opacity: 0,
                        y: 8,
                        scale: 0.992,
                        filter: "blur(2px)",
                      }
              }
              animate={
                reduced
                  ? { opacity: 1 }
                  : mobileMotion
                    ? { opacity: 1, y: 0, scale: 1 }
                    : {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                      }
              }
              exit={
                reduced
                  ? { opacity: 0 }
                  : mobileMotion
                    ? { opacity: 0, y: -3, scale: 0.995 }
                    : {
                        opacity: 0,
                        y: -5,
                        scale: 0.992,
                        filter: "blur(2px)",
                      }
              }
              transition={
                reduced
                  ? { duration: 0.2, ease: "easeOut" }
                  : mobileMotion
                    ? {
                        opacity: { duration: 0.5, ease: appleEase },
                        y: { duration: 0.5, ease: appleEase },
                        scale: { duration: 0.5, ease: appleEase },
                      }
                    : {
                        opacity: { duration: 0.55, ease: appleEase },
                        y: { duration: 0.58, ease: appleEase },
                        scale: { duration: 0.58, ease: appleEase },
                        filter: { duration: 0.45, ease: appleEase },
                      }
              }
            >
              <ScreenContent
                screen={screen}
                demoEnabled={demoEnabled}
                demoPaused={demoPaused}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </DeviceShell>
    </div>
  );
}
