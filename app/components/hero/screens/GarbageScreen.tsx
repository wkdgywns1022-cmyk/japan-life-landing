"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconLocation, IconTrash } from "../icons";
import { useLocale } from "../LocaleProvider";
import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import styles from "./GarbageScreen.module.css";

type Props = {
  demo?: boolean;
  active?: boolean;
};

export default function GarbageScreen({ demo = false, active = false }: Props) {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const g = t.phone.garbage;
  const [showBurnable, setShowBurnable] = useState(false);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (!demo || !active || played || reduceMotion) return;
    const id = window.setTimeout(() => {
      setShowBurnable(true);
      setPlayed(true);
    }, 1800);
    return () => window.clearTimeout(id);
  }, [demo, active, played, reduceMotion]);

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
            transition={{ duration: 0.45, ease: "easeInOut" }}
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

        <div className={styles.todayCard}>
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
