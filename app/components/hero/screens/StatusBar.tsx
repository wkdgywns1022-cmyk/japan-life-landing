import { CellularSignalIcon, WifiIcon } from "./StatusIcons";
import styles from "./StatusBar.module.css";

export default function StatusBar({ time = "9:41" }: { time?: string }) {
  return (
    <div className={styles.bar}>
      <span className={styles.time}>{time}</span>
      <div className={styles.statusIcons}>
        <CellularSignalIcon className={styles.iconSvg} />
        <WifiIcon className={styles.iconSvg} />
        <span className={styles.battery} aria-hidden="true" />
      </div>
    </div>
  );
}
