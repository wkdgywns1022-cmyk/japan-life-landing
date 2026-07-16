"use client";

import {
  IconChecklist,
  IconChevron,
  IconLocation,
  IconPayments,
  IconPerson,
  IconSettings,
  IconSunny,
  IconToday,
  IconTrash,
} from "../icons";
import { useLocale } from "../LocaleProvider";
import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import styles from "./HomeScreen.module.css";

export default function HomeScreen() {
  const { t } = useLocale();
  const h = t.phone.home;

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
            <span className={styles.weather}>
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

          <div className={styles.infoRow}>
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

        <div className={`${styles.card} ${styles.expense}`}>
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
        </div>

        <p className={styles.sectionTitle}>{h.lifeShortcuts}</p>
      </div>
      <BottomNav active="home" />
    </div>
  );
}
