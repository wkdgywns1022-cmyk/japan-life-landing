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
  const [animKey, setAnimKey] = useState(0);
  const [wasActive, setWasActive] = useState(active);
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

  // Replay text when this step becomes active (scroll up or down)
  if (active !== wasActive) {
    setWasActive(active);
    if (active) setAnimKey((k) => k + 1);
  }

  const reduced = Boolean(reduceMotion);

  return (
    <article
      id={id}
      ref={stepRef}
      data-screen={screen}
      className={`${styles.step} ${active ? styles.active : styles.inactive}`}
      aria-current={active ? "true" : undefined}
    >
      <div className={styles.inner}>
        {isCompact ? (
          reduced ? (
            <div
              className={styles.textBlock}
              style={{ opacity: active ? 1 : 0.45 }}
            >
              <p className={styles.marker}>{marker}</p>
              <h2 className={styles.heading}>
                {lines.map((line) => (
                  <span key={line} className={styles.line}>
                    {line}
                  </span>
                ))}
              </h2>
              <div className={styles.body}>
                {bodyBlocks.map((block) => (
                  <p key={block} className={styles.paragraph}>
                    {block.split("\n").map((line) => (
                      <span key={line} className={styles.line}>
                        {line}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          ) : active ? (
            <div key={`play-${id}-${animKey}`} className={styles.textBlock}>
              <motion.p
                className={styles.marker}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: appleEase }}
              >
                {marker}
              </motion.p>
              <motion.h2
                className={styles.heading}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: appleEase }}
              >
                {lines.map((line) => (
                  <span key={line} className={styles.line}>
                    {line}
                  </span>
                ))}
              </motion.h2>
              <motion.div
                className={styles.body}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  ease: appleEase,
                  delay: 0.14,
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
          ) : (
            <div className={`${styles.textBlock} ${styles.textInactive}`}>
              <p className={styles.marker}>{marker}</p>
              <h2 className={styles.heading}>
                {lines.map((line) => (
                  <span key={line} className={styles.line}>
                    {line}
                  </span>
                ))}
              </h2>
              <div className={styles.body}>
                {bodyBlocks.map((block) => (
                  <p key={block} className={styles.paragraph}>
                    {block.split("\n").map((line) => (
                      <span key={line} className={styles.line}>
                        {line}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          )
        ) : (
          <>
            <motion.p
              className={styles.marker}
              animate={
                reduced
                  ? { opacity: active ? 1 : 0.45 }
                  : {
                      opacity: active ? 1 : 0.32,
                      scale: active ? 1 : 0.94,
                    }
              }
              transition={{ duration: 0.45, ease: appleEase }}
            >
              {marker}
            </motion.p>

            <motion.h2
              className={styles.heading}
              animate={
                reduced
                  ? { opacity: active ? 1 : 0.45 }
                  : {
                      opacity: active ? 1 : 0.34,
                      y: active ? 0 : 22,
                    }
              }
              transition={{ duration: 0.65, ease: appleEase }}
            >
              {lines.map((line) => (
                <span key={line} className={styles.line}>
                  {line}
                </span>
              ))}
            </motion.h2>

            <motion.div
              className={styles.body}
              animate={
                reduced
                  ? { opacity: active ? 1 : 0.45 }
                  : {
                      opacity: active ? 1 : 0.34,
                      y: active ? 0 : 16,
                    }
              }
              transition={{
                duration: 0.6,
                ease: appleEase,
                delay: active ? 0.14 : 0,
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
          </>
        )}
      </div>
    </article>
  );
}
