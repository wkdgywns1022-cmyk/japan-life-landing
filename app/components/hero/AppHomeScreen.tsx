"use client";

import {
  IconBolt,
  IconChecklist,
  IconChevron,
  IconDelivery,
  IconEmergency,
  IconGas,
  IconHome,
  IconHospital,
  IconLocation,
  IconPayments,
  IconPerson,
  IconSettings,
  IconSunny,
  IconToday,
  IconTrash,
  IconWallet,
  IconWard,
  IconWater,
  IconWifi,
} from "./icons";
import { useLocale } from "./LocaleProvider";
import styles from "./AppHomeScreen.module.css";

type ActiveTab = "home" | "garbage" | "expense" | "checklist";

export default function AppHomeScreen({
  activeTab = "home",
}: {
  activeTab?: ActiveTab;
}) {
  const { t } = useLocale();

  const shortcuts = [
    {
      label: t.shortcutEmergency,
      sub: t.shortcutEmergencySub,
      color: "var(--lp-error)",
      bg: "var(--lp-error-bg)",
      Icon: IconEmergency,
    },
    {
      label: t.shortcutWard,
      sub: t.shortcutWardSub,
      color: "var(--lp-primary)",
      bg: "var(--lp-primary-bg)",
      Icon: IconWard,
    },
    {
      label: t.shortcutHospital,
      sub: t.shortcutHospitalSub,
      color: "var(--lp-error)",
      bg: "var(--lp-error-bg)",
      Icon: IconHospital,
    },
    {
      label: t.shortcutDelivery,
      sub: t.shortcutDeliverySub,
      color: "var(--lp-warning)",
      bg: "var(--lp-warning-bg)",
      Icon: IconDelivery,
    },
    {
      label: t.utilityInternet,
      sub: "",
      color: "var(--lp-primary)",
      bg: "var(--lp-primary-bg)",
      Icon: IconWifi,
    },
    {
      label: t.utilityGas,
      sub: "",
      color: "var(--lp-warning)",
      bg: "var(--lp-warning-bg)",
      Icon: IconGas,
    },
    {
      label: t.utilityElectricity,
      sub: "",
      color: "var(--lp-warning)",
      bg: "var(--lp-warning-bg)",
      Icon: IconBolt,
    },
    {
      label: t.utilityWater,
      sub: "",
      color: "var(--lp-primary)",
      bg: "var(--lp-primary-bg)",
      Icon: IconWater,
    },
  ] as const;

  const navItems = [
    { id: "expense" as const, label: t.navExpense, Icon: IconWallet },
    { id: "garbage" as const, label: t.navGarbage, Icon: IconTrash },
    { id: "home" as const, label: t.navHome, Icon: IconHome },
    { id: "checklist" as const, label: t.navChecklist, Icon: IconChecklist },
    { id: "profile" as const, label: t.navProfile, Icon: IconPerson },
  ];

  return (
    <div className={styles.home}>
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
              <p className={styles.greeting}>{t.greeting}</p>
              <div className={styles.location}>
                <IconLocation size={16} style={{ color: "var(--lp-primary)" }} />
                <span>{t.district}</span>
              </div>
            </div>
            <span className={styles.weather}>
              <IconSunny size={16} />
              {t.weather}
            </span>
          </div>

          <div className={styles.divider} />

          <div className={styles.infoRow}>
            <span
              className={styles.infoIcon}
              style={{ background: "var(--lp-primary-bg)", color: "var(--lp-primary)" }}
            >
              <IconToday size={18} />
            </span>
            <div>
              <p className={styles.infoLabel}>{t.todaySummary}</p>
              <p className={styles.infoValue}>{t.todaySummaryValue}</p>
            </div>
          </div>

          <div className={styles.infoRow}>
            <span
              className={styles.infoIcon}
              style={{ background: "var(--lp-success-bg)", color: "var(--lp-success)" }}
            >
              <IconTrash size={18} />
            </span>
            <div>
              <p className={styles.infoLabel}>{t.upcomingGarbage}</p>
              <p className={styles.infoValue}>{t.garbageValue}</p>
            </div>
          </div>
        </div>

        <div className={styles.dualRow}>
          <div className={`${styles.card} ${styles.featureCard}`}>
            <span
              className={styles.featureIcon}
              style={{ background: "var(--lp-primary-bg)", color: "var(--lp-primary)" }}
            >
              <IconTrash size={22} />
            </span>
            <p className={styles.featureTitle}>{t.navGarbage}</p>
            <p className={styles.featureSub}>{t.garbageValue}</p>
          </div>
          <div className={`${styles.card} ${styles.featureCard}`}>
            <span
              className={styles.featureIcon}
              style={{ background: "var(--lp-success-bg)", color: "var(--lp-success)" }}
            >
              <IconChecklist size={22} />
            </span>
            <p className={styles.featureTitle}>{t.navChecklist}</p>
            <p className={styles.featureSub}>{t.checklistCardSub}</p>
          </div>
        </div>

        <div className={`${styles.card} ${styles.expenseCard}`}>
          <div className={styles.expenseHead}>
            <span className={styles.expenseIcon}>
              <IconPayments size={22} />
            </span>
            <div>
              <p className={styles.expenseTitle}>{t.monthlyExpense}</p>
              <p className={styles.expenseMonth}>{t.monthLabel}</p>
            </div>
            <span className={styles.expenseChevron}>
              <IconChevron size={18} />
            </span>
          </div>
          <div className={styles.metrics}>
            <div>
              <p className={styles.metricLabel}>{t.income}</p>
              <p className={styles.metricValue}>¥248,000</p>
            </div>
            <div>
              <p className={styles.metricLabel}>{t.expense}</p>
              <p className={styles.metricValue}>¥86,400</p>
            </div>
            <div>
              <p className={styles.metricLabel}>{t.balance}</p>
              <p className={`${styles.metricValue} ${styles.metricValueEmph}`}>
                ¥161,600
              </p>
            </div>
          </div>
        </div>

        <div className={styles.sectionHead}>
          <p className={styles.sectionTitle}>{t.lifeShortcuts}</p>
          <div className={styles.shortcuts}>
            {shortcuts.map(({ label, sub, color, bg, Icon }) => (
              <div key={label} className={`${styles.card} ${styles.shortcut}`}>
                <span className={styles.shortcutIcon} style={{ background: bg, color }}>
                  <Icon size={18} />
                </span>
                <p className={styles.shortcutLabel}>{label}</p>
                <p className={styles.shortcutSub}>{sub || "\u00a0"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className={styles.nav} aria-hidden="true">
        {navItems.map(({ id, label, Icon }) => {
          const active = id === activeTab;
          return (
            <div
              key={id}
              className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
            >
              <Icon size={22} />
              <span className={styles.navLabel}>{label}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
