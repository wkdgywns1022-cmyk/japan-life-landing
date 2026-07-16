"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale } from "../LocaleProvider";
import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import styles from "./WardOfficeScreen.module.css";

function RubyText({
  segments,
}: {
  segments: { text: string; reading?: string }[];
}) {
  return (
    <p className={styles.rubyLine}>
      {segments.map((seg, i) =>
        seg.reading ? (
          <ruby key={`${seg.text}-${i}`}>
            {seg.text}
            <rt>{seg.reading}</rt>
          </ruby>
        ) : (
          <span key={`${seg.text}-${i}`}>{seg.text}</span>
        ),
      )}
    </p>
  );
}

type Props = {
  demo?: boolean;
  active?: boolean;
};

export default function WardOfficeScreen({
  demo = false,
  active = false,
}: Props) {
  const { locale, t } = useLocale();
  const reduceMotion = useReducedMotion();
  const w = t.phone.wardOffice;
  const [staffMode, setStaffMode] = useState(false);
  const [played, setPlayed] = useState(false);
  const first = w.phrases[0];

  useEffect(() => {
    if (!demo || !active || played || reduceMotion) return;

    const enter = window.setTimeout(() => setStaffMode(true), 1200);
    const leave = window.setTimeout(() => {
      setStaffMode(false);
      setPlayed(true);
    }, 3200);

    return () => {
      window.clearTimeout(enter);
      window.clearTimeout(leave);
    };
  }, [demo, active, played, reduceMotion]);

  return (
    <div className={styles.root}>
      <StatusBar />
      <AnimatePresence mode="wait" initial={false}>
        {staffMode ? (
          <motion.div
            key="staff"
            className={styles.staffWrap}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <div className={styles.staff}>
              <p className={styles.staffJa}>{first.ja}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            className={styles.body}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <div>
              <h2 className={styles.title}>{w.title}</h2>
              <p className={styles.subtitle}>{w.subtitle}</p>
            </div>

            <div className={styles.search}>{w.search}</div>

            <div className={styles.chips}>
              <span className={`${styles.chip} ${styles.chipActive}`}>
                {w.all}
              </span>
              {w.phrases.slice(0, 2).map((p) => (
                <span key={p.category} className={styles.chip}>
                  {p.category}
                </span>
              ))}
            </div>

            {w.phrases.slice(0, 2).map((phrase) => (
              <div key={phrase.ja} className={styles.card}>
                <p className={styles.category}>{phrase.category}</p>
                <RubyText segments={phrase.ruby} />
                {locale === "ja" ? (
                  phrase.explanation ? (
                    <p className={styles.meaning}>{phrase.explanation}</p>
                  ) : null
                ) : (
                  <>
                    {phrase.meaning ? (
                      <p className={styles.meaning}>{phrase.meaning}</p>
                    ) : null}
                    {phrase.pronunciation ? (
                      <p className={styles.pronunciation}>
                        {phrase.pronunciation}
                      </p>
                    ) : null}
                  </>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <BottomNav active="wardOfficeJapanese" />
    </div>
  );
}
