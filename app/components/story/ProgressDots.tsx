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
};

export default function ProgressDots({ items, activeId, onSelect }: Props) {
  return (
    <nav className={styles.nav} aria-label="Feature progress">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            className={`${styles.dotBtn} ${active ? styles.active : ""}`}
            aria-label={item.label}
            aria-current={active ? "true" : undefined}
            onClick={() => onSelect(item.id)}
          >
            <span className={styles.dot} />
          </button>
        );
      })}
    </nav>
  );
}
