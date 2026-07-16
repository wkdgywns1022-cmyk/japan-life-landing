"use client";

import { useLocale } from "../LocaleProvider";
import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import styles from "./ExpenseScreen.module.css";

export default function ExpenseScreen() {
  const { t } = useLocale();
  const e = t.phone.expense;

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
              <p className={styles.metricValue}>{e.expenseValue}</p>
            </div>
            <div>
              <p className={styles.metricLabel}>{e.balance}</p>
              <p className={`${styles.metricValue} ${styles.metricEmph}`}>
                {e.balanceValue}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.rowTitle}>{e.analysis}</p>
          <p className={styles.rowSub}>{e.analysisEmpty}</p>
        </div>

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
