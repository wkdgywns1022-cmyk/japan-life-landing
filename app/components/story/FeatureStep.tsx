"use client";

import { useEffect, useState } from "react";
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
};

export default function FeatureStep({
  id,
  screen,
  index,
  heading,
  body,
  active,
  stepRef,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [isCompact, setIsCompact] = useState(false);
  const lines = heading.split("\n");
  const bodyBlocks = body.split("\n\n");
  const marker = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const sync = () => setIsCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const compactMotion = isCompact || Boolean(reduceMotion);

  return (
    <article
      id={id}
      ref={stepRef}
      data-screen={screen}
      className={`${styles.step} ${active || isCompact ? styles.active : styles.inactive}`}
      aria-current={active ? "true" : undefined}
    >
      <div className={styles.inner}>
        <motion.p
          className={styles.marker}
          initial={compactMotion ? { opacity: 0, y: 10 } : false}
          whileInView={compactMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={compactMotion ? { once: true, amount: 0.4 } : undefined}
          animate={
            compactMotion
              ? undefined
              : {
                  opacity: active ? 1 : 0.32,
                  scale: active ? 1 : 0.94,
                }
          }
          transition={{ duration: compactMotion ? 0.4 : 0.45, ease: appleEase }}
        >
          {marker}
        </motion.p>

        <motion.h2
          className={styles.heading}
          initial={compactMotion ? { opacity: 0, y: 12 } : false}
          whileInView={compactMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={compactMotion ? { once: true, amount: 0.4 } : undefined}
          animate={
            compactMotion
              ? undefined
              : {
                  opacity: active ? 1 : 0.34,
                  y: active ? 0 : 22,
                }
          }
          transition={{
            duration: compactMotion ? 0.45 : 0.65,
            ease: appleEase,
            delay: compactMotion ? 0.04 : 0,
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
          initial={compactMotion ? { opacity: 0, y: 10 } : false}
          whileInView={compactMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={compactMotion ? { once: true, amount: 0.35 } : undefined}
          animate={
            compactMotion
              ? undefined
              : {
                  opacity: active ? 1 : 0.34,
                  y: active ? 0 : 16,
                }
          }
          transition={{
            duration: compactMotion ? 0.45 : 0.6,
            ease: appleEase,
            delay: compactMotion ? 0.08 : active ? 0.14 : 0,
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
      </div>
    </article>
  );
}
