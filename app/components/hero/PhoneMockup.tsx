"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import AppHomeScreen from "./AppHomeScreen";
import {
  AppChecklistScreen,
  AppExpenseScreen,
  AppGarbageScreen,
} from "./AppScreens";
import styles from "./PhoneMockup.module.css";

const SCREENS = ["home", "garbage", "expense", "checklist"] as const;
type ScreenId = (typeof SCREENS)[number];

const INTERVAL_MS = 3600;

export default function PhoneMockup() {
  const reduceMotion = useReducedMotion();
  const [screen, setScreen] = useState<ScreenId>("home");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const start = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(start);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !ready) return;

    const id = window.setInterval(() => {
      setScreen((current) => {
        const index = SCREENS.indexOf(current);
        return SCREENS[(index + 1) % SCREENS.length];
      });
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion, ready]);

  const content = (() => {
    switch (screen) {
      case "garbage":
        return <AppGarbageScreen key="garbage" />;
      case "expense":
        return <AppExpenseScreen key="expense" />;
      case "checklist":
        return <AppChecklistScreen key="checklist" />;
      default:
        return <AppHomeScreen key="home" activeTab="home" />;
    }
  })();

  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.phone}>
        <span className={styles.silent} />
        <span className={styles.volUp} />
        <span className={styles.volDown} />
        <span className={styles.power} />

        <div className={styles.screen}>
          <div className={styles.island} />

          <div className={styles.statusBar}>
            <span>9:41</span>
            <div className={styles.statusIcons}>
              <span className={styles.signal} />
              <span className={styles.wifi} />
              <span className={styles.battery} />
            </div>
          </div>

          <div className={styles.content}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={screen}
                className={styles.screenLayer}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.homeIndicator} />
        </div>
      </div>
    </div>
  );
}
