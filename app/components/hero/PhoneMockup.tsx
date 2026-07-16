"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { PhoneScreenId } from "./i18n";
import HomeScreen from "./screens/HomeScreen";
import ChecklistScreen from "./screens/ChecklistScreen";
import ExpenseScreen from "./screens/ExpenseScreen";
import WardOfficeScreen from "./screens/WardOfficeScreen";
import styles from "./PhoneMockup.module.css";

const SCREENS: PhoneScreenId[] = [
  "home",
  "checklist",
  "wardOfficeJapanese",
  "expense",
];

const INTERVAL_MS = 2000;
const ease = [0.22, 1, 0.36, 1] as const;

export default function PhoneMockup() {
  const reduceMotion = useReducedMotion();
  const [screen, setScreen] = useState<PhoneScreenId>("home");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const start = window.setTimeout(() => setReady(true), 1400);
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
      case "checklist":
        return <ChecklistScreen key="checklist" />;
      case "wardOfficeJapanese":
        return <WardOfficeScreen key="wardOfficeJapanese" />;
      case "expense":
        return <ExpenseScreen key="expense" />;
      default:
        return <HomeScreen key="home" />;
    }
  })();

  const showHomeIndicator =
    screen === "home" || screen === "checklist" || screen === "expense";

  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.device}>
        <span className={styles.silent} />
        <span className={styles.volUp} />
        <span className={styles.volDown} />
        <span className={styles.power} />

        <div className={styles.display}>
          <div className={styles.island} />

          <div className={styles.canvas}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={screen}
                className={styles.screenLayer}
                initial={reduceMotion ? false : { opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -6 }}
                transition={{ duration: 0.4, ease }}
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>

          {showHomeIndicator ? <div className={styles.homeIndicator} /> : null}
        </div>
      </div>
    </div>
  );
}
