"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale } from "../LocaleProvider";
import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import styles from "./ExpenseScreen.module.css";

type Props = {
  demo?: boolean;
  active?: boolean;
};

export default function ExpenseScreen({ demo = false, active = false }: Props) {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const e = t.phone.expense;
  const [phase, setPhase] = useState<"summary" | "entry" | "saved">("summary");
  const [amount, setAmount] = useState("");
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (!demo || !active || played || reduceMotion) return;

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase("entry"), 700));
    timers.push(
      window.setTimeout(() => {
        setAmount("3");
      }, 1100),
    );
    timers.push(
      window.setTimeout(() => {
        setAmount("3,4");
      }, 1350),
    );
    timers.push(
      window.setTimeout(() => {
        setAmount("3,48");
      }, 1600),
    );
    timers.push(
      window.setTimeout(() => {
        setAmount("3,480");
      }, 1850),
    );
    timers.push(
      window.setTimeout(() => {
        setPhase("saved");
        setPlayed(true);
      }, 2600),
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [demo, active, played, reduceMotion]);

  const expenseValue =
    phase === "saved" ? e.expenseValueAfter : e.expenseValue;
  const balanceValue =
    phase === "saved" ? e.balanceValueAfter : e.balanceValue;

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
              <p className={styles.metricValue}>{expenseValue}</p>
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
          {phase === "entry" ? (
            <motion.div
              key="entry"
              className={`${styles.card} ${styles.entry}`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
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
                <span className={styles.categoryPill}>{e.categoryFood}</span>
              </div>
            </motion.div>
          ) : phase === "saved" ? (
            <motion.div
              key="saved"
              className={`${styles.card} ${styles.saved}`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
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
