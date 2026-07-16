"use client";

import { IconChevron, IconToday } from "../icons";
import { useLocale } from "../LocaleProvider";
import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import styles from "./ChecklistScreen.module.css";

export default function ChecklistScreen() {
  const { t, locale } = useLocale();
  const c = t.phone.checklist;
  const showJa = locale !== "ja";

  return (
    <div className={styles.root}>
      <StatusBar time="8:30" />
      <div className={styles.body}>
        <div>
          <h2 className={styles.title}>{c.title}</h2>
          <p className={styles.subtitle}>{c.subtitle}</p>
        </div>

        <div className={`${styles.card} ${styles.progress}`}>
          <div className={styles.progressHead}>
            <div>
              <p className={styles.progressTitle}>{c.progressTitle}</p>
              <p className={styles.progressCount}>{c.progressCount}</p>
            </div>
            <span className={styles.badge}>{c.progressPercent}</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.barFill} />
          </div>
        </div>

        <p className={styles.group}>{c.groupFirstDay}</p>

        <div className={`${styles.card} ${styles.task}`}>
          <span className={styles.check} />
          <div className={styles.taskBody}>
            <p className={styles.taskTitle}>{c.taskBank}</p>
            {showJa ? <p className={styles.taskJa}>{c.taskBankJa}</p> : null}
            <p className={styles.taskDate}>{c.taskBankDate}</p>
            <div className={styles.metaRow}>
              <span className={`${styles.chip} ${styles.chipProgress}`}>
                {c.taskBankStatus}
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <IconChevron size={20} />
            <span className={styles.calBtn}>
              <IconToday size={20} />
            </span>
          </div>
        </div>

        <div className={`${styles.card} ${styles.task}`}>
          <span className={styles.check} />
          <div className={styles.taskBody}>
            <p className={styles.taskTitle}>{c.taskPhone}</p>
            {showJa ? <p className={styles.taskJa}>{c.taskPhoneJa}</p> : null}
            <p className={styles.taskDate}>{c.taskPhoneDate}</p>
            <div className={styles.metaRow}>
              <span className={`${styles.chip} ${styles.chipIdle}`}>
                {c.taskPhoneStatus}
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <IconChevron size={20} />
            <span className={styles.calBtn}>
              <IconToday size={20} />
            </span>
          </div>
        </div>

        <p className={styles.group}>{c.groupWithin14}</p>

        <div className={`${styles.card} ${styles.task}`}>
          <span className={styles.check} />
          <div className={styles.taskBody}>
            <p className={styles.taskTitle}>{c.taskResident}</p>
            {showJa ? <p className={styles.taskJa}>{c.taskResidentJa}</p> : null}
            <p className={styles.taskDate}>{c.taskResidentDate}</p>
            <div className={styles.metaRow}>
              <span className={`${styles.chip} ${styles.chipIdle}`}>
                {c.taskResidentStatus}
              </span>
              <span className={styles.hint}>{c.scheduleNeeded}</span>
            </div>
          </div>
          <div className={styles.actions}>
            <IconChevron size={20} />
            <span className={styles.calBtn}>
              <IconToday size={20} />
            </span>
          </div>
        </div>

        <div className={styles.spacer} />
      </div>
      <BottomNav active="checklist" />
    </div>
  );
}
