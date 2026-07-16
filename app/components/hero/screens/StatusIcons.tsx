import styles from "./StatusIcons.module.css";

type IconProps = {
  className?: string;
};

/** Four bottom-aligned cellular bars — fixed 18×12 */
export function CellularSignalIcon({ className }: IconProps) {
  return (
    <svg
      className={[styles.svg, styles.cellular, className].filter(Boolean).join(" ")}
      width={18}
      height={12}
      viewBox="0 0 18 12"
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="8" width="2.5" height="4" rx="1.2" />
      <rect x="4.3" y="5.8" width="2.5" height="6.2" rx="1.2" />
      <rect x="8.6" y="3.2" width="2.5" height="8.8" rx="1.2" />
      <rect x="12.9" y="0" width="2.5" height="12" rx="1.2" />
    </svg>
  );
}

/** iOS-style Wi-Fi — exactly 3 levels: outer arc, inner arc, dot (17×12) */
export function WifiIcon({ className }: IconProps) {
  return (
    <svg
      className={[styles.svg, styles.wifi, className].filter(Boolean).join(" ")}
      width={17}
      height={12}
      viewBox="0 0 17 12"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1.4 4.2C5.1 1.2 11.9 1.2 15.6 4.2" />
      <path d="M4.5 7C6.7 5.2 10.3 5.2 12.5 7" />
      <circle
        cx="8.5"
        cy="10.1"
        r="1.15"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/** iOS-style battery — fixed 27×12 */
export function BatteryIcon({ className }: IconProps) {
  return (
    <svg
      className={[styles.svg, styles.battery, className].filter(Boolean).join(" ")}
      width={27}
      height={12}
      viewBox="0 0 27 12"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0.75" y="0.75" width="22" height="10.5" rx="2.5" />
      <path d="M24.4 4V8" />
      <rect
        x="2.7"
        y="2.7"
        width="17"
        height="6.6"
        rx="1.4"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/** Fixed-ratio status icon group for the in-phone status bar */
export default function StatusIcons() {
  return (
    <div className={styles.statusIcons}>
      <CellularSignalIcon />
      <WifiIcon />
      <BatteryIcon />
    </div>
  );
}
