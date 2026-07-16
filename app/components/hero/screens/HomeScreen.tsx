"use client";

import { useMemo } from "react";
import { useReducedMotion } from "motion/react";
import {
  IconChecklist,
  IconChevron,
  IconDelivery,
  IconEmergency,
  IconHospital,
  IconLocation,
  IconPayments,
  IconPerson,
  IconSettings,
  IconSunny,
  IconToday,
  IconTranslate,
  IconTrash,
} from "../icons";
import { useLocale } from "../LocaleProvider";
import { useFeatureDemo } from "../../phone/useFeatureDemo";
import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import styles from "./HomeScreen.module.css";

type Phase = "idle" | "weather" | "garbage" | "expense";

const STEPS: { state: Phase; holdMs: number }[] = [
  { state: "idle", holdMs: 1800 },
  { state: "weather", holdMs: 2200 },
  { state: "idle", holdMs: 900 },
  { state: "garbage", holdMs: 2400 },
  { state: "idle", holdMs: 900 },
  { state: "expense", holdMs: 2600 },
];

type Props = {
  demo?: boolean;
  enabled?: boolean;
  paused?: boolean;
};

export default function HomeScreen({ demo = false, enabled = false, paused = false }: Props) {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const h = t.phone.home;
  const steps = useMemo(() => STEPS, []);

  const phase = useFeatureDemo<Phase>({
    enabled: Boolean(demo) && enabled,
    paused,
    reduceMotion,
    steps,
    initial: "idle",
    startDelayMs: 850,
  });

  return (
    <div className={styles.root}>
      <StatusBar time="8:36" />
      <div className={styles.scroll}>
        <div className={styles.topBar}>
          <span className={styles.iconBtn}>
            <IconSettings size={22} />
          </span>
          <span className={`${styles.iconBtn} ${styles.profileBtn}`}>
            <IconPerson size={20} />
          </span>
        </div>

        <div className={`${styles.card} ${styles.heroCard}`}>
          <div className={styles.heroTop}>
            <div>
              <p className={styles.greeting}>{h.greeting}</p>
              <div className={styles.location}>
                <IconLocation size={16} style={{ color: "#2563eb" }} />
                <span>{h.district}</span>
              </div>
            </div>
            <span
              className={`${styles.weather} ${phase === "weather" ? styles.weatherPulse : ""}`}
            >
              <IconSunny size={16} />
              {h.weather}
            </span>
          </div>

          <div className={styles.divider} />

          <div className={styles.infoRow}>
            <span
              className={styles.infoIcon}
              style={{ background: "#eff4ff", color: "#2563eb" }}
            >
              <IconToday size={18} />
            </span>
            <div>
              <p className={styles.infoLabel}>{h.todaySummary}</p>
              <p className={styles.infoValue}>{h.todaySummaryValue}</p>
            </div>
          </div>

          <div
            className={`${styles.infoRow} ${phase === "garbage" ? styles.rowEmphasis : ""}`}
          >
            <span
              className={styles.infoIcon}
              style={{ background: "#ecfdf3", color: "#12b76a" }}
            >
              <IconTrash size={18} />
            </span>
            <div>
              <p className={styles.infoLabel}>{h.upcomingGarbage}</p>
              <p className={styles.infoValue}>{h.garbageValue}</p>
            </div>
          </div>
        </div>

        <div className={styles.dual}>
          <div className={`${styles.card} ${styles.feature}`}>
            <span
              className={styles.featureIcon}
              style={{ background: "#eff4ff", color: "#2563eb" }}
            >
              <IconTrash size={22} />
            </span>
            <p className={styles.featureTitle}>{h.garbageCardTitle}</p>
            <p className={styles.featureSub}>{h.garbageValue}</p>
          </div>
          <div className={`${styles.card} ${styles.feature}`}>
            <span
              className={styles.featureIcon}
              style={{ background: "#ecfdf3", color: "#12b76a" }}
            >
              <IconChecklist size={22} />
            </span>
            <p className={styles.featureTitle}>{h.checklistCardTitle}</p>
            <p className={styles.featureSub}>{h.checklistCardSub}</p>
          </div>
        </div>

        <div
          className={`${styles.card} ${styles.expense} ${phase === "expense" ? styles.cardEmphasis : ""}`}
        >
          <div className={styles.expenseHead}>
            <span className={styles.expenseIcon}>
              <IconPayments size={22} />
            </span>
            <div>
              <p className={styles.expenseTitle}>{h.monthlyExpense}</p>
              <p className={styles.expenseMonth}>{h.monthLabel}</p>
            </div>
            <span className={styles.chevron}>
              <IconChevron size={18} />
            </span>
          </div>
          <div className={styles.metrics}>
            <div>
              <p className={styles.metricLabel}>{h.income}</p>
              <p className={styles.metricValue}>{h.incomeValue}</p>
            </div>
            <div>
              <p className={styles.metricLabel}>{h.expense}</p>
              <p className={styles.metricValue}>{h.expenseValue}</p>
            </div>
            <div>
              <p className={styles.metricLabel}>{h.balance}</p>
              <p className={`${styles.metricValue} ${styles.metricEmph}`}>
                {h.balanceValue}
              </p>
            </div>
          </div>
          <div
            className={`${styles.demoBar} ${phase === "expense" ? styles.demoBarActive : ""}`}
            aria-hidden="true"
          />
        </div>

        <p className={styles.sectionTitle}>{h.lifeShortcuts}</p>

        <div className={styles.shortcuts}>
          {[
            { title: t.phone.shortcuts.items[0].title, bg: "#fef3f2", fg: "#f04438", Icon: IconHospital },
            { title: t.phone.shortcuts.items[1].title, bg: "#fef3f2", fg: "#f04438", Icon: IconEmergency },
            { title: t.phone.shortcuts.items[2].title, bg: "#fff6ed", fg: "#f79009", Icon: IconDelivery },
            { title: t.phone.shortcuts.items[3].title, bg: "#eff4ff", fg: "#2563eb", Icon: IconTranslate },
          ].map(({ title, bg, fg, Icon }) => (
            <div key={title} className={styles.shortcut}>
              <span className={styles.shortcutIcon} style={{ background: bg, color: fg }}>
                <Icon size={16} />
              </span>
              <p className={styles.shortcutTitle}>{title}</p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="home" />
    </div>
  );
}
