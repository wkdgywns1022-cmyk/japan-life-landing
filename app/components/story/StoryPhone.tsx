"use client";

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
};

function ScreenContent({
  screen,
  demoActive,
}: {
  screen: PhoneScreenId;
  demoActive: boolean;
}) {
  switch (screen) {
    case "checklist":
      return <ChecklistScreen demo active={demoActive} />;
    case "garbage":
      return <GarbageScreen demo active={demoActive} />;
    case "wardOfficeJapanese":
      return <WardOfficeScreen demo active={demoActive} />;
    case "expense":
      return <ExpenseScreen demo active={demoActive} />;
    case "lifeShortcuts":
      return <LifeShortcutsScreen />;
    default:
      return <HomeScreen />;
  }
}

export default function StoryPhone({
  screen,
  demoActive = false,
  floating = false,
}: Props) {
  const reduceMotion = useReducedMotion();
  const showHomeIndicator = screen !== "wardOfficeJapanese";

  return (
    <div className={styles.wrap}>
      <div className={styles.glow} aria-hidden="true" />
      <DeviceShell
        size="story"
        floating={floating && !reduceMotion}
        showHomeIndicator={showHomeIndicator}
      >
        <div className={styles.layerHost}>
          <AnimatePresence initial={false}>
            <motion.div
              key={screen}
              className={styles.screenLayer}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: 8,
                      scale: 0.992,
                      filter: "blur(2px)",
                    }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: -5,
                      scale: 0.992,
                      filter: "blur(2px)",
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0.2, ease: "easeOut" }
                  : {
                      opacity: { duration: 0.55, ease: appleEase },
                      y: { duration: 0.58, ease: appleEase },
                      scale: { duration: 0.58, ease: appleEase },
                      filter: { duration: 0.45, ease: appleEase },
                    }
              }
            >
              <ScreenContent screen={screen} demoActive={demoActive} />
            </motion.div>
          </AnimatePresence>
        </div>
      </DeviceShell>
    </div>
  );
}
