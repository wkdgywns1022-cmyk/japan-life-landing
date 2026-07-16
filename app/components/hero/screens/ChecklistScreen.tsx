"use client";

import { useMemo } from "react";
import { useReducedMotion } from "motion/react";
import { IconCheck, IconChevron, IconToday } from "../icons";
import { useLocale } from "../LocaleProvider";
import { useFeatureDemo } from "../../phone/useFeatureDemo";
import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import styles from "./ChecklistScreen.module.css";

type Phase = "idle" | "done" | "hold";

const STEPS: { state: Phase; holdMs: number }[] = [
  { state: "idle", holdMs: 2200 },
  { state: "done", holdMs: 3200 },
  { state: "hold", holdMs: 1800 },
];

type Props = {
  demo?: boolean;
  enabled?: boolean;
  paused?: boolean;
};

export default function ChecklistScreen({
  demo = false,
  enabled = false, paused = false,
}: Props) {
  const { t, locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const c = t.phone.checklist;
  const showJa = locale !== "ja";
  const steps = useMemo(() => STEPS, []);

  const phase = useFeatureDemo<Phase>({
    enabled: Boolean(demo) && enabled,
    paused,
    reduceMotion,
    steps,
    initial: "idle",
    startDelayMs: 850,
  });

  const done = phase === "done" || phase === "hold";
  const progressCount = done ? c.progressCountDone : c.progressCount;
  const progressPercent = done ? c.progressPercentDone : c.progressPercent;

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
              <p className={styles.progressCount}>{progressCount}</p>
            </div>
            <span className={styles.badge}>{progressPercent}</span>
          </div>
          <div className={styles.bar}>
            <div
              className={styles.barFill}
              style={{ width: done ? "10%" : "0%" }}
            />
          </div>
        </div>

        <p className={styles.group}>{c.groupFirstDay}</p>

        <div
          className={`${styles.card} ${styles.task} ${done ? styles.taskDone : ""}`}
        >
          <span className={`${styles.check} ${done ? styles.checkDone : ""}`}>
            {done ? <IconCheck size={14} /> : null}
          </span>
          <div className={styles.taskBody}>
            <p className={`${styles.taskTitle} ${done ? styles.titleDone : ""}`}>
              {c.taskBank}
            </p>
            {showJa ? <p className={styles.taskJa}>{c.taskBankJa}</p> : null}
            <p className={styles.taskDate}>{c.taskBankDate}</p>
            <div className={styles.metaRow}>
              <span
                className={`${styles.chip} ${done ? styles.chipDone : styles.chipProgress}`}
              >
                {done ? c.taskBankStatusDone : c.taskBankStatus}
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
