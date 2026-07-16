"use client";

import { useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconLocation, IconTrash } from "../icons";
import { useLocale } from "../LocaleProvider";
import { useFeatureDemo } from "../../phone/useFeatureDemo";
import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import styles from "./GarbageScreen.module.css";

type Phase = "plastic" | "burnable";

const STEPS: { state: Phase; holdMs: number }[] = [
  { state: "plastic", holdMs: 3000 },
  { state: "burnable", holdMs: 3000 },
];

type Props = {
  demo?: boolean;
  enabled?: boolean;
  paused?: boolean;
};

export default function GarbageScreen({
  demo = false,
  enabled = false, paused = false,
}: Props) {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const g = t.phone.garbage;
  const steps = useMemo(() => STEPS, []);

  const phase = useFeatureDemo<Phase>({
    enabled: Boolean(demo) && enabled,
    paused,
    reduceMotion,
    steps,
    initial: "plastic",
    startDelayMs: 850,
  });

  const showBurnable = phase === "burnable";
  const item = showBurnable ? g.burnable : g.plastic;
  const accent = showBurnable
    ? { bg: "#fff6ed", fg: "#ef6820" }
    : { bg: "#eff4ff", fg: "#2563eb" };

  return (
    <div className={styles.root}>
      <StatusBar time="8:42" />
      <div className={styles.body}>
        <div>
          <h2 className={styles.title}>{g.title}</h2>
          <p className={styles.tagline}>{g.tagline}</p>
        </div>

        <div className={styles.location}>
          <IconLocation size={16} style={{ color: "#2563eb" }} />
          <span>{g.ward}</span>
        </div>

        <div className={styles.guide}>{g.guide}</div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={showBurnable ? "burnable" : "plastic"}
            className={styles.heroCard}
            style={{ background: accent.bg }}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.nextLabel}>{g.nextLabel}</p>
            <div className={styles.heroMain}>
              <span
                className={styles.heroIcon}
                style={{ background: "#fff", color: accent.fg }}
              >
                <IconTrash size={22} />
              </span>
              <div>
                <p className={styles.heroName} style={{ color: accent.fg }}>
                  {item.name}
                </p>
                <p className={styles.heroDate}>{item.date}</p>
              </div>
            </div>
            <p className={styles.tip}>{item.tip}</p>
          </motion.div>
        </AnimatePresence>

        <div
          className={`${styles.todayCard} ${!showBurnable ? styles.todayActive : ""}`}
        >
          <p className={styles.todayLabel}>{g.todayLabel}</p>
          <div className={styles.todayRow}>
            <span className={styles.dot} style={{ background: "#2563eb" }} />
            <span className={styles.todayName}>{g.plastic.name}</span>
            <span className={styles.todayBadge}>{g.todayLabel}</span>
          </div>
        </div>
      </div>
      <BottomNav active="garbage" />
    </div>
  );
}
