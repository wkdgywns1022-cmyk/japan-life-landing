"use client";

import { useMemo } from "react";
import { useReducedMotion } from "motion/react";
import {
  IconDelivery,
  IconEmergency,
  IconHospital,
  IconServices,
  IconTranslate,
} from "../icons";
import { useLocale } from "../LocaleProvider";
import { useFeatureDemo } from "../../phone/useFeatureDemo";
import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import styles from "./LifeShortcutsScreen.module.css";

const ICONS = {
  hospital: { Icon: IconHospital, fg: "#f04438", bg: "#fef3f2" },
  emergency: { Icon: IconEmergency, fg: "#f04438", bg: "#fef3f2" },
  delivery: { Icon: IconDelivery, fg: "#f79009", bg: "#fff6ed" },
  translate: { Icon: IconTranslate, fg: "#2563eb", bg: "#eff4ff" },
  services: { Icon: IconServices, fg: "#4f46e5", bg: "#eef2ff" },
} as const;

type Phase = "c0" | "c1" | "c2" | "c3" | "rest";

const STEPS: { state: Phase; holdMs: number }[] = [
  { state: "c0", holdMs: 2400 },
  { state: "rest", holdMs: 600 },
  { state: "c1", holdMs: 2400 },
  { state: "rest", holdMs: 600 },
  { state: "c2", holdMs: 2400 },
  { state: "rest", holdMs: 600 },
  { state: "c3", holdMs: 2400 },
  { state: "rest", holdMs: 900 },
];

type Props = {
  demo?: boolean;
  enabled?: boolean;
  paused?: boolean;
};

export default function LifeShortcutsScreen({
  demo = false,
  enabled = false, paused = false,
}: Props) {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const s = t.phone.shortcuts;
  const steps = useMemo(() => STEPS, []);

  const phase = useFeatureDemo<Phase>({
    enabled: Boolean(demo) && enabled,
    paused,
    reduceMotion,
    steps,
    initial: "rest",
    startDelayMs: 850,
  });

  const activeIndex =
    phase === "c0" ? 0 : phase === "c1" ? 1 : phase === "c2" ? 2 : phase === "c3" ? 3 : -1;

  return (
    <div className={styles.root}>
      <div className={styles.status}>
        <StatusBar time="9:08" />
      </div>

      <main className={styles.content}>
        <header className={styles.header}>
          <h2 className={styles.title}>{s.title}</h2>
          <p className={styles.subtitle}>{s.subtitle}</p>
        </header>

        <div className={styles.grid}>
          {s.items.map((item, index) => {
            const meta = ICONS[item.id as keyof typeof ICONS] ?? ICONS.services;
            const { Icon, fg, bg } = meta;
            const active = index === activeIndex;
            return (
              <div
                key={item.id}
                className={`${styles.card} ${active ? styles.cardActive : ""}`}
              >
                <span
                  className={styles.icon}
                  style={{ background: bg, color: fg }}
                >
                  <Icon size={18} />
                </span>
                <div className={styles.cardText}>
                  <p className={styles.cardTitle}>{item.title}</p>
                  <p className={styles.cardSub}>{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <div className={styles.nav}>
        <BottomNav active="home" />
      </div>
    </div>
  );
}
