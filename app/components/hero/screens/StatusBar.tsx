import styles from "./StatusBar.module.css";

export default function StatusBar({ time = "9:41" }: { time?: string }) {
  return (
    <div className={styles.bar}>
      <span>{time}</span>
      <div className={styles.icons}>
        <span className={styles.signal} />
        <span className={styles.wifi} />
        <span className={styles.battery} />
      </div>
    </div>
  );
}
