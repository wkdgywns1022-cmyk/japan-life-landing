"use client";

import { useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale } from "../LocaleProvider";
import { useFeatureDemo } from "../../phone/useFeatureDemo";
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

type Phase = "list" | "highlight" | "staff" | "return";

const STEPS: { state: Phase; holdMs: number }[] = [
  { state: "list", holdMs: 2000 },
  { state: "highlight", holdMs: 1600 },
  { state: "staff", holdMs: 3200 },
  { state: "return", holdMs: 1800 },
];

type Props = {
  demo?: boolean;
  enabled?: boolean;
  paused?: boolean;
};

export default function WardOfficeScreen({
  demo = false,
  enabled = false, paused = false,
}: Props) {
  const { locale, t } = useLocale();
  const reduceMotion = useReducedMotion();
  const w = t.phone.wardOffice;
  const first = w.phrases[0];
  const steps = useMemo(() => STEPS, []);

  const phase = useFeatureDemo<Phase>({
    enabled: Boolean(demo) && enabled,
    paused,
    reduceMotion,
    steps,
    initial: "list",
    startDelayMs: 850,
  });

  const staffMode = phase === "staff";
  const highlight = phase === "highlight";

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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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

            {w.phrases.slice(0, 2).map((phrase, index) => (
              <div
                key={phrase.ja}
                className={`${styles.card} ${index === 0 && highlight ? styles.cardHighlight : ""}`}
              >
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
