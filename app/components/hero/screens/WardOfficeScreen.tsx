"use client";

import { useState } from "react";
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

export default function WardOfficeScreen() {
  const { locale, t } = useLocale();
  const w = t.phone.wardOffice;
  const [staffMode, setStaffMode] = useState(false);
  const first = w.phrases[0];

  if (staffMode) {
    return (
      <div className={styles.root}>
        <StatusBar />
        <button
          type="button"
          className={styles.staff}
          onClick={() => setStaffMode(false)}
        >
          <p className={styles.staffJa}>{first.ja}</p>
        </button>
        <BottomNav active="wardOfficeJapanese" />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <StatusBar />
      <div className={styles.body}>
        <div>
          <h2 className={styles.title}>{w.title}</h2>
          <p className={styles.subtitle}>{w.subtitle}</p>
        </div>

        <div className={styles.search}>{w.search}</div>

        <div className={styles.chips}>
          <span className={`${styles.chip} ${styles.chipActive}`}>{w.all}</span>
          {w.phrases.slice(0, 2).map((p) => (
            <span key={p.category} className={styles.chip}>
              {p.category}
            </span>
          ))}
        </div>

        {w.phrases.map((phrase) => (
          <button
            key={phrase.ja}
            type="button"
            className={styles.card}
            onClick={() => setStaffMode(true)}
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
                  <p className={styles.pronunciation}>{phrase.pronunciation}</p>
                ) : null}
              </>
            )}
          </button>
        ))}
      </div>
      <BottomNav active="wardOfficeJapanese" />
    </div>
  );
}
