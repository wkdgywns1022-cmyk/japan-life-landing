"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { PhoneScreenId } from "../hero/i18n";
import styles from "./FeatureStep.module.css";

const appleEase = [0.22, 1, 0.36, 1] as const;

type Props = {
  id: string;
  screen: PhoneScreenId;
  index: number;
  heading: string;
  body: string;
  active: boolean;
  stepRef: (node: HTMLElement | null) => void;
  mobilePhone?: ReactNode;
};

export default function FeatureStep({
  id,
  screen,
  index,
  heading,
  body,
  active,
  stepRef,
  mobilePhone,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const lines = heading.split("\n");
  const bodyBlocks = body.split("\n\n");
  const marker = String(index + 1).padStart(2, "0");

  useEffect(() => {
    // Sticky phone is off below 900px — treat as stacked, fully readable sections
    const mq = window.matchMedia("(max-width: 899px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Mobile: each step is self-contained — keep copy fully readable (no sticky dimming)
  const fullyVisible = isMobile || reduceMotion;

  return (
    <article
      id={id}
      ref={stepRef}
      data-screen={screen}
      className={`${styles.step} ${active || isMobile ? styles.active : styles.inactive}`}
      aria-current={active ? "true" : undefined}
    >
      <div className={styles.inner}>
        <motion.p
          className={styles.marker}
          initial={
            fullyVisible
              ? { opacity: 0 }
              : false
          }
          whileInView={fullyVisible ? { opacity: 1 } : undefined}
          viewport={fullyVisible ? { once: true, amount: 0.35 } : undefined}
          animate={
            fullyVisible
              ? undefined
              : {
                  opacity: active ? 1 : 0.32,
                  scale: active ? 1 : 0.94,
                }
          }
          transition={{ duration: fullyVisible ? 0.4 : 0.45, ease: appleEase }}
        >
          {marker}
        </motion.p>

        <motion.h2
          className={styles.heading}
          initial={fullyVisible ? { opacity: 0 } : false}
          whileInView={fullyVisible ? { opacity: 1 } : undefined}
          viewport={fullyVisible ? { once: true, amount: 0.35 } : undefined}
          animate={
            fullyVisible
              ? undefined
              : {
                  opacity: active ? 1 : 0.34,
                  y: active ? 0 : 22,
                }
          }
          transition={{
            duration: fullyVisible ? 0.45 : 0.65,
            ease: appleEase,
            delay: fullyVisible ? 0.04 : 0,
          }}
        >
          {lines.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </motion.h2>

        <motion.div
          className={styles.body}
          initial={fullyVisible ? { opacity: 0 } : false}
          whileInView={fullyVisible ? { opacity: 1 } : undefined}
          viewport={fullyVisible ? { once: true, amount: 0.3 } : undefined}
          animate={
            fullyVisible
              ? undefined
              : {
                  opacity: active ? 1 : 0.34,
                  y: active ? 0 : 16,
                }
          }
          transition={{
            duration: fullyVisible ? 0.45 : 0.6,
            ease: appleEase,
            delay: fullyVisible ? 0.1 : active ? 0.14 : 0,
          }}
        >
          {bodyBlocks.map((block) => (
            <p key={block} className={styles.paragraph}>
              {block.split("\n").map((line) => (
                <span key={line} className={styles.line}>
                  {line}
                </span>
              ))}
            </p>
          ))}
        </motion.div>

        {mobilePhone ? (
          <motion.div
            className={styles.mobilePhone}
            initial={isMobile ? { opacity: 0 } : false}
            whileInView={isMobile ? { opacity: 1 } : undefined}
            viewport={isMobile ? { once: true, amount: 0.25 } : undefined}
            transition={{ duration: 0.5, ease: appleEase, delay: 0.12 }}
          >
            {mobilePhone}
          </motion.div>
        ) : null}
      </div>
    </article>
  );
}
