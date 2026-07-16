"use client";

import { LOCALES } from "./i18n";
import { useLocale } from "./LocaleProvider";
import styles from "./LanguageSelector.module.css";

export default function LanguageSelector() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className={styles.wrap} role="group" aria-label={t.hero.langAria}>
      {LOCALES.map((item) => {
        const active = item.id === locale;
        return (
          <button
            key={item.id}
            type="button"
            className={`${styles.option} ${active ? styles.active : ""}`}
            aria-pressed={active}
            onClick={() => setLocale(item.id)}
          >
            <span className={styles.flag} aria-hidden="true">
              {item.flag}
            </span>
            <span className={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
