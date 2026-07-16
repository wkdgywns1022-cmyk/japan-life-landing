"use client";

import { useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale } from "../LocaleProvider";
import { useFeatureDemo } from "../../phone/useFeatureDemo";
import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import styles from "./ExpenseScreen.module.css";

type Phase =
  | "summary"
  | "entry"
  | "digit1"
  | "digit2"
  | "digit3"
  | "digit4"
  | "saved"
  | "hold";

const STEPS: { state: Phase; holdMs: number }[] = [
  { state: "summary", holdMs: 1600 },
  { state: "entry", holdMs: 700 },
  { state: "digit1", holdMs: 350 },
  { state: "digit2", holdMs: 350 },
  { state: "digit3", holdMs: 350 },
  { state: "digit4", holdMs: 900 },
  { state: "saved", holdMs: 2800 },
  { state: "hold", holdMs: 1600 },
];

const AMOUNTS: Record<Phase, string> = {
  summary: "",
  entry: "",
  digit1: "3",
  digit2: "3,4",
  digit3: "3,48",
  digit4: "3,480",
  saved: "3,480",
  hold: "3,480",
};

type Props = {
  demo?: boolean;
  enabled?: boolean;
  paused?: boolean;
};

export default function ExpenseScreen({
  demo = false,
  enabled = false, paused = false,
}: Props) {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const e = t.phone.expense;
  const steps = useMemo(() => STEPS, []);

  const phase = useFeatureDemo<Phase>({
    enabled: Boolean(demo) && enabled,
    paused,
    reduceMotion,
    steps,
    initial: "summary",
    startDelayMs: 850,
  });

  const isEntry =
    phase === "entry" ||
    phase === "digit1" ||
    phase === "digit2" ||
    phase === "digit3" ||
    phase === "digit4";
  const isSaved = phase === "saved" || phase === "hold";
  const amount = AMOUNTS[phase];

  const expenseValue = isSaved ? e.expenseValueAfter : e.expenseValue;
  const balanceValue = isSaved ? e.balanceValueAfter : e.balanceValue;

  return (
    <div className={styles.root}>
      <StatusBar />
      <div className={styles.body}>
        <h2 className={styles.title}>{e.title}</h2>

        <div className={styles.card}>
          <p className={styles.month}>{e.monthLabel}</p>
          <div className={styles.metrics}>
            <div>
              <p className={styles.metricLabel}>{e.income}</p>
              <p className={styles.metricValue}>{e.incomeValue}</p>
            </div>
            <div>
              <p className={styles.metricLabel}>{e.expense}</p>
              <p
                className={`${styles.metricValue} ${isSaved ? styles.metricPulse : ""}`}
              >
                {expenseValue}
              </p>
            </div>
            <div>
              <p className={styles.metricLabel}>{e.balance}</p>
              <p className={`${styles.metricValue} ${styles.metricEmph}`}>
                {balanceValue}
              </p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {isEntry ? (
            <motion.div
              key="entry"
              className={`${styles.card} ${styles.entry}`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={styles.rowTitle}>{e.addTitle}</p>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>{e.amountLabel}</span>
                <span className={styles.amountValue}>
                  {amount || "0"}
                  <span className={styles.yen}>¥</span>
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>{e.categoryLabel}</span>
                <span
                  className={`${styles.categoryPill} ${phase === "digit4" ? styles.categoryActive : ""}`}
                >
                  {e.categoryFood}
                </span>
              </div>
              <div
                className={`${styles.saveHint} ${phase === "digit4" ? styles.saveHintActive : ""}`}
              >
                {e.viewMonthly}
              </div>
            </motion.div>
          ) : isSaved ? (
            <motion.div
              key="saved"
              className={`${styles.card} ${styles.saved}`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.savedRow}>
                <div>
                  <p className={styles.rowTitle}>{e.savedTitle}</p>
                  <p className={styles.rowSub}>{e.categoryFood}</p>
                </div>
                <p className={styles.savedAmount}>{e.savedAmount}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="analysis"
              className={styles.card}
              initial={false}
              animate={{ opacity: 1 }}
            >
              <p className={styles.rowTitle}>{e.analysis}</p>
              <p className={styles.rowSub}>{e.analysisEmpty}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.cta}>{e.viewMonthly}</div>

        <div className={styles.card}>
          <p className={styles.rowTitle}>{e.fixedExpenses}</p>
          <p className={styles.rowSub}>—</p>
        </div>
      </div>
      <BottomNav active="expense" />
    </div>
  );
}
