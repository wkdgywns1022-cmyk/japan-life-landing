"use client";

import {
  IconDelivery,
  IconEmergency,
  IconHospital,
  IconServices,
  IconTranslate,
} from "../icons";
import { useLocale } from "../LocaleProvider";
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

export default function LifeShortcutsScreen() {
  const { t } = useLocale();
  const s = t.phone.shortcuts;

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
          {s.items.map((item) => {
            const meta = ICONS[item.id as keyof typeof ICONS] ?? ICONS.services;
            const { Icon, fg, bg } = meta;
            return (
              <div key={item.id} className={styles.card}>
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
