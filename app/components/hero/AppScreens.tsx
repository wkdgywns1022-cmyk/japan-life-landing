"use client";

import {
  IconChecklist,
  IconGas,
  IconHome,
  IconLocation,
  IconPerson,
  IconTrash,
  IconWallet,
} from "./icons";
import { useLocale } from "./LocaleProvider";
import styles from "./AppScreens.module.css";

function BottomNav({
  active,
}: {
  active: "garbage" | "expense" | "checklist" | "home";
}) {
  const { t } = useLocale();
  const items = [
    { id: "expense" as const, label: t.navExpense, Icon: IconWallet },
    { id: "garbage" as const, label: t.navGarbage, Icon: IconTrash },
    { id: "home" as const, label: t.navHome, Icon: IconHome },
    { id: "checklist" as const, label: t.navChecklist, Icon: IconChecklist },
    { id: "profile" as const, label: t.navProfile, Icon: IconPerson },
  ];

  return (
    <nav className={styles.nav} aria-hidden="true">
      {items.map(({ id, label, Icon }) => {
        const isActive = id === active;
        return (
          <div
            key={id}
            className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
          >
            <Icon size={22} />
            <span className={styles.navLabel}>{label}</span>
          </div>
        );
      })}
    </nav>
  );
}

export function AppGarbageScreen() {
  const { t } = useLocale();

  return (
    <div className={styles.screen}>
      <div className={styles.body}>
        <div>
          <h2 className={styles.title}>{t.garbageTitle}</h2>
          <p className={styles.subtitle}>{t.garbageTagline}</p>
        </div>

        <div className={`${styles.card} ${styles.row}`}>
          <span
            className={styles.iconWell}
            style={{ background: "var(--lp-primary-bg)", color: "var(--lp-primary)" }}
          >
            <IconLocation size={20} />
          </span>
          <div>
            <p className={styles.rowTitle}>{t.district}</p>
            <p className={styles.rowSub}>{t.garbageTagline}</p>
          </div>
          <span className={styles.link}>{t.changeLocation}</span>
        </div>

        <div className={`${styles.card} ${styles.heroNext}`}>
          <p className={styles.heroNextLabel}>{t.nextCollection}</p>
          <p className={styles.heroNextValue}>{t.burnable}</p>
          <p className={styles.heroNextMeta}>{t.tomorrow}</p>
        </div>

        <div className={`${styles.card} ${styles.row}`}>
          <span
            className={styles.iconWell}
            style={{ background: "var(--lp-primary-bg)", color: "var(--lp-primary)" }}
          >
            <IconGas size={20} />
          </span>
          <div>
            <p className={styles.rowTitle}>{t.disposalGuide}</p>
            <p className={styles.rowSub}>{t.disposalGuideSub}</p>
          </div>
        </div>

        <p className={styles.sectionLabel}>{t.thisWeek}</p>
        <div className={styles.weekList}>
          <div className={`${styles.card} ${styles.weekItem}`}>
            <span
              className={styles.iconWell}
              style={{ background: "var(--lp-warning-bg)", color: "var(--lp-warning)" }}
            >
              <IconTrash size={18} />
            </span>
            <p className={styles.rowTitle}>{t.burnable}</p>
            <span className={styles.chip}>{t.tomorrow}</span>
          </div>
        </div>
      </div>
      <BottomNav active="garbage" />
    </div>
  );
}

export function AppExpenseScreen() {
  const { t } = useLocale();

  return (
    <div className={styles.screen}>
      <div className={styles.body}>
        <h2 className={styles.title}>{t.expenseTitle}</h2>

        <div className={styles.card}>
          <p className={styles.rowTitle}>{t.monthLabel}</p>
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

        <div className={styles.card}>
          <p className={styles.rowTitle}>{t.expenseAnalysis}</p>
          <p className={styles.rowSub}>{t.expenseAnalysisEmpty}</p>
        </div>

        <div className={styles.cta}>{t.viewMonthly}</div>

        <div className={styles.card}>
          <p className={styles.rowTitle}>{t.fixedExpenses}</p>
          <p className={styles.rowSub}>—</p>
        </div>
      </div>
      <BottomNav active="expense" />
    </div>
  );
}

export function AppChecklistScreen() {
  const { t } = useLocale();

  return (
    <div className={styles.screen}>
      <div className={styles.body}>
        <div>
          <h2 className={styles.title}>{t.checklistTitle}</h2>
          <p className={styles.subtitle}>{t.checklistSubtitle}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.progressHead}>
            <div>
              <p className={styles.progressTitle}>{t.progressTitle}</p>
              <p className={styles.progressCount}>{t.progressCount}</p>
            </div>
            <span className={styles.badge}>25%</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.barFill} />
          </div>
        </div>

        <p className={styles.groupLabel}>{t.groupFirstDay}</p>
        <div className={`${styles.card} ${styles.task}`}>
          <span className={`${styles.check} ${styles.checkOn}`} />
          <p className={`${styles.taskTitle} ${styles.taskDone}`}>{t.taskResidentReg}</p>
        </div>

        <p className={styles.groupLabel}>{t.groupWithin14}</p>
        <div className={`${styles.card} ${styles.task}`}>
          <span className={styles.check} />
          <p className={styles.taskTitle}>{t.taskNhi}</p>
        </div>
        <div className={`${styles.card} ${styles.task}`}>
          <span className={styles.check} />
          <p className={styles.taskTitle}>{t.taskBank}</p>
        </div>

        <div className={styles.addBtn}>{t.addTask}</div>
      </div>
      <BottomNav active="checklist" />
    </div>
  );
}

export function AppJapaneseScreen() {
  const { t } = useLocale();

  const phrases = [
    { ja: t.phrase1Ja, sub: t.phrase1Sub, cat: t.wardCatMoving },
    { ja: t.phrase2Ja, sub: t.phrase2Sub, cat: t.wardCatMoving },
    { ja: t.phrase3Ja, sub: t.phrase3Sub, cat: t.wardCatNhi },
  ];

  return (
    <div className={styles.screen}>
      <div className={styles.body}>
        <div>
          <h2 className={styles.title}>{t.wardTitle}</h2>
          <p className={styles.subtitle}>{t.wardSubtitle}</p>
        </div>

        <div className={styles.search}>{t.wardSearch}</div>

        <div className={styles.chips}>
          <span className={`${styles.chipPill} ${styles.chipPillActive}`}>
            {t.wardAll}
          </span>
          <span className={styles.chipPill}>{t.wardCatMoving}</span>
          <span className={styles.chipPill}>{t.wardCatNhi}</span>
        </div>

        {phrases.map((phrase) => (
          <div key={phrase.ja} className={`${styles.card} ${styles.phraseCard}`}>
            <p className={styles.phraseCat}>{phrase.cat}</p>
            <p className={styles.phraseJa}>{phrase.ja}</p>
            <p className={styles.phraseSub}>{phrase.sub}</p>
          </div>
        ))}
      </div>
      <BottomNav active="home" />
    </div>
  );
}
