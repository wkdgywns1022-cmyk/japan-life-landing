"use client";

import styles from "./ProgressDots.module.css";

type Dot = {
  id: string;
  label: string;
};

type Props = {
  items: Dot[];
  activeId: string;
  onSelect: (id: string) => void;
  orientation?: "vertical" | "horizontal";
  /** Mobile showcase: enlarge active dot with scale + ring */
  enlargeActive?: boolean;
  /** Disable the active destination button while a transition is in flight */
  disableActiveWhileTransitioning?: boolean;
  /** Tighter spacing for fit-to-viewport showcase */
  compact?: boolean;
};

export default function ProgressDots({
  items,
  activeId,
  onSelect,
  orientation = "vertical",
  enlargeActive = false,
  disableActiveWhileTransitioning = false,
  compact = false,
}: Props) {
  return (
    <nav
      className={`${styles.nav} ${orientation === "horizontal" ? styles.horizontal : styles.vertical} ${compact ? styles.compact : ""}`}
      aria-label="Feature progress"
    >
      {items.map((item) => {
        const active = item.id === activeId;
        const locked = disableActiveWhileTransitioning && active;
        return (
          <button
            key={item.id}
            type="button"
            className={`${styles.dotBtn} ${active ? styles.active : ""} ${enlargeActive ? styles.enlarge : ""}`}
            aria-label={item.label}
            aria-current={active ? "true" : undefined}
            disabled={locked}
            onClick={() => {
              if (locked) return;
              onSelect(item.id);
            }}
          >
            <span className={styles.dot} />
          </button>
        );
      })}
    </nav>
  );
}
