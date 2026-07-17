"use client";

import { useState } from "react";
import { Noto_Sans, Noto_Sans_JP, Noto_Sans_KR } from "next/font/google";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import PhoneMockup from "./PhoneMockup";
import LanguageSelector from "./LanguageSelector";
import { useLocale } from "./LocaleProvider";
import { IconArrowRight } from "./icons";
import ContactModal from "../ContactModal";
import styles from "./Hero.module.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { locale, t } = useLocale();
  const hero = t.hero;
  const [contactOpen, setContactOpen] = useState(false);

  const fontClass =
    locale === "ja"
      ? notoSansJp.className
      : locale === "ko"
        ? notoSansKr.className
        : notoSans.className;

  const fadeUp = {
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className={`${styles.hero} ${fontClass}`} aria-label="Hero">
      <motion.header
        className={styles.header}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut, delay: 0.02 }}
      >
        <LanguageSelector />
      </motion.header>

      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          {...fadeUp}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={locale}
              className={styles.copyFade}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <p className={styles.label}>{hero.brand}</p>

              <h1 className={styles.headline}>
                {hero.headlineLine1}
                <br />
                {hero.headlineLine2}
              </h1>

              <p className={styles.subtitle}>
                {hero.subtitleLine1}
                <br />
                {hero.subtitleLine2}
              </p>

              <p className={styles.support}>{hero.support}</p>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => setContactOpen(true)}
                >
                  {hero.ctaBeta}
                </button>
                <a className={styles.btnSecondary} href="#product-intro">
                  <span className={styles.btnSecondaryText}>
                    {hero.ctaExplore}
                  </span>
                  <span className={styles.btnArrow}>
                    <IconArrowRight size={16} />
                  </span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.16 }}
        >
          <PhoneMockup />
        </motion.div>
      </div>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </section>
  );
}
