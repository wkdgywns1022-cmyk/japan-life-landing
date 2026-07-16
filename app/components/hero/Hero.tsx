"use client";

import { Noto_Sans, Noto_Sans_JP, Noto_Sans_KR } from "next/font/google";
import { motion, useReducedMotion } from "motion/react";
import PhoneMockup from "./PhoneMockup";
import LanguageSelector from "./LanguageSelector";
import { LocaleProvider, useLocale } from "./LocaleProvider";
import { IconArrowRight } from "./icons";
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

const ease = [0.22, 1, 0.36, 1] as const;

function HeroContent() {
  const reduceMotion = useReducedMotion();
  const { locale, t } = useLocale();
  const hero = t.hero;

  const fontClass =
    locale === "ja"
      ? notoSansJp.className
      : locale === "ko"
        ? notoSansKr.className
        : notoSans.className;

  const textDelay = 0.08;
  const textDuration = 0.7;
  const buttonDelay = textDelay + 0.12;
  const phoneDelay = 0.18;

  const fadeUp = {
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
  };

  const fadeScale = {
    initial: reduceMotion ? false : { opacity: 0, scale: 0.97, y: 24 },
    animate: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <section className={`${styles.hero} ${fontClass}`} aria-label="Hero">
      <motion.header
        className={styles.header}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: 0.02 }}
      >
        <LanguageSelector />
      </motion.header>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <motion.p
            className={styles.label}
            {...fadeUp}
            transition={{ duration: textDuration, ease, delay: textDelay }}
          >
            {hero.brand}
          </motion.p>

          <motion.h1
            className={styles.headline}
            {...fadeUp}
            transition={{ duration: textDuration, ease, delay: textDelay + 0.04 }}
          >
            {hero.headlineLine1}
            <br />
            {hero.headlineLine2}
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            {...fadeUp}
            transition={{ duration: textDuration, ease, delay: textDelay + 0.08 }}
          >
            {hero.subtitleLine1}
            <br />
            {hero.subtitleLine2}
          </motion.p>

          <motion.p
            className={styles.support}
            {...fadeUp}
            transition={{ duration: textDuration, ease, delay: textDelay + 0.1 }}
          >
            {hero.support}
          </motion.p>

          <motion.div
            className={styles.actions}
            {...fadeUp}
            transition={{ duration: 0.65, ease, delay: buttonDelay }}
          >
            <a className={styles.btnPrimary} href="#beta">
              {hero.ctaBeta}
            </a>
            <a className={styles.btnSecondary} href="#features">
              <span className={styles.btnSecondaryText}>{hero.ctaExplore}</span>
              <span className={styles.btnArrow}>
                <IconArrowRight size={16} />
              </span>
            </a>
          </motion.div>
        </div>

        <motion.div
          className={styles.visual}
          {...fadeScale}
          transition={{ duration: 0.75, ease, delay: phoneDelay }}
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <LocaleProvider>
      <HeroContent />
    </LocaleProvider>
  );
}
