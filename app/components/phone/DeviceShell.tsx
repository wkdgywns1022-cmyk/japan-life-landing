"use client";

import type { ReactNode } from "react";
import styles from "./DeviceShell.module.css";

type DeviceShellProps = {
  children: ReactNode;
  size?: "hero" | "feature" | "story";
  floating?: boolean;
  showHomeIndicator?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
};

export default function DeviceShell({
  children,
  size = "feature",
  floating = false,
  showHomeIndicator = true,
  onMouseEnter,
  onMouseLeave,
  className,
}: DeviceShellProps) {
  const sizeClass =
    size === "hero" ? styles.hero : size === "story" ? styles.story : styles.feature;

  return (
    <div
      className={[
        styles.stage,
        sizeClass,
        floating ? styles.floating : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.glow} />
      <div className={styles.device}>
        <span className={styles.silent} />
        <span className={styles.volUp} />
        <span className={styles.volDown} />
        <span className={styles.power} />

        <div className={styles.display}>
          <div className={styles.island} />
          <div className={styles.canvas}>{children}</div>
          {showHomeIndicator ? <div className={styles.homeIndicator} /> : null}
        </div>
      </div>
    </div>
  );
}
