type IconProps = {
  className?: string;
};

/** iOS-style cellular bars — logical canvas coordinates, scales with phone */
export function CellularSignalIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="19"
      height="12"
      viewBox="0 0 19 12"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="7.8" width="2.6" height="4.2" rx="1.2" />
      <rect x="5.2" y="5.4" width="2.6" height="6.6" rx="1.2" />
      <rect x="10.4" y="2.8" width="2.6" height="9.2" rx="1.2" />
      <rect x="15.6" y="0" width="2.6" height="12" rx="1.2" />
    </svg>
  );
}

/** iOS-style Wi-Fi — curved strokes + bottom dot */
export function WifiIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1.5 4.2C4.5 1.4 13.5 1.4 16.5 4.2" />
      <path d="M4.2 6.8C6.2 5 11.8 5 13.8 6.8" />
      <path d="M7 9C8.1 8 9.9 8 11 9" />
      <circle cx="9" cy="10.35" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}
