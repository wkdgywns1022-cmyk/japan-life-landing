"use client";

import type { ReactNode } from "react";
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
  const lines = heading.split("\n");
  const bodyBlocks = body.split("\n\n");
  const marker = String(index + 1).padStart(2, "0");

  return (
    <article
      id={id}
      ref={stepRef}
      data-screen={screen}
      className={`${styles.step} ${active ? styles.active : styles.inactive}`}
      aria-current={active ? "true" : undefined}
    >
      <div className={styles.inner}>
        <motion.p
          className={styles.marker}
          animate={
            reduceMotion
              ? { opacity: active ? 1 : 0.34 }
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
            reduceMotion
              ? { opacity: active ? 1 : 0.34 }
              : {
                  opacity: active ? 1 : 0.34,
                  y: active ? 0 : 22,
                  filter: active ? "blur(0px)" : "blur(0px)",
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
            reduceMotion
              ? { opacity: active ? 1 : 0.34 }
              : {
                  opacity: active ? 1 : 0.34,
                  y: active ? 0 : 16,
                }
          }
          transition={{
            duration: 0.6,
            ease: appleEase,
            delay: active && !reduceMotion ? 0.14 : 0,
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
          <div className={styles.mobilePhone}>{mobilePhone}</div>
        ) : null}
      </div>
    </article>
  );
}
