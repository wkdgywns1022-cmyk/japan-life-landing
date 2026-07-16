type IconProps = {
  className?: string;
};

const svgBase = {
  fill: "currentColor" as const,
  "aria-hidden": true as const,
  focusable: false as const,
  preserveAspectRatio: "xMidYMid meet" as const,
};

/** Four rising cellular bars — 18×12 at 35% / 55% / 75% / 100% */
export function CellularSignalIcon({ className }: IconProps) {
  const h = 12;
  const bars = [0.35, 0.55, 0.75, 1] as const;
  const barW = 2.4;
  const gap = 2.3;
  const startX = 0.5;

  return (
    <svg
      className={className}
      width={18}
      height={12}
      viewBox="0 0 18 12"
      {...svgBase}
    >
      {bars.map((pct, i) => {
        const height = h * pct;
        const x = startX + i * (barW + gap);
        const y = h - height;
        return (
          <rect
            key={pct}
            x={x}
            y={y}
            width={barW}
            height={height}
            rx={1.1}
          />
        );
      })}
    </svg>
  );
}

/** Wi-Fi arcs + center dot — 16×12 */
export function WifiIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width={16}
      height={12}
      viewBox="0 0 16 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M1.2 3.8C3.8 1.4 12.2 1.4 14.8 3.8" />
      <path d="M3.6 6.4C5.4 4.8 10.6 4.8 12.4 6.4" />
      <path d="M6.2 8.8C7.2 7.9 8.8 7.9 9.8 8.8" />
      <circle cx="8" cy="10.4" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** iOS-style battery — 27×12 */
export function BatteryIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width={27}
      height={12}
      viewBox="0 0 27 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="10.5"
        rx="2.4"
        ry="2.4"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <rect
        x="2.4"
        y="2.4"
        width="15.5"
        height="7.2"
        rx="1.4"
        fill="currentColor"
      />
      <path
        d="M24.2 3.6C25.5 3.9 26.25 4.6 26.25 6C26.25 7.4 25.5 8.1 24.2 8.4V3.6Z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  );
}
