"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { PhoneScreenId } from "../hero/i18n";
import DeviceShell from "../phone/DeviceShell";
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

const DISPLAY_MS = 2200;
const TRANSITION_S = 0.7;
const START_DELAY_MS = 1400;

export default function PhoneMockup() {
  const reduceMotion = useReducedMotion();
  const [screen, setScreen] = useState<PhoneScreenId>("home");
  const pausedRef = useRef(false);
  const readyRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    if (reduceMotion || pausedRef.current || !readyRef.current) return;

    timerRef.current = window.setInterval(() => {
      setScreen((current) => {
        const index = SCREENS.indexOf(current);
        return SCREENS[(index + 1) % SCREENS.length];
      });
    }, DISPLAY_MS);
  }, [clearTimer, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      readyRef.current = false;
      pausedRef.current = false;
      clearTimer();
      return;
    }

    const startId = window.setTimeout(() => {
      readyRef.current = true;
      startTimer();
    }, START_DELAY_MS);

    return () => {
      window.clearTimeout(startId);
      clearTimer();
    };
  }, [reduceMotion, clearTimer, startTimer]);

  const handleMouseEnter = () => {
    if (reduceMotion) return;
    pausedRef.current = true;
    clearTimer();
  };

  const handleMouseLeave = () => {
    if (reduceMotion) return;
    pausedRef.current = false;
    startTimer();
  };

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

  return (
    <DeviceShell
      size="hero"
      floating
      showHomeIndicator
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.layerHost}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screen}
            className={styles.screenLayer}
            initial={reduceMotion ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
            transition={{ duration: TRANSITION_S, ease: "easeInOut" }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </div>
    </DeviceShell>
  );
}
