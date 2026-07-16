import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 18, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconSettings(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </Icon>
  );
}

export function IconPerson(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19.5c1.5-3.2 4-4.5 6.5-4.5s5 1.3 6.5 4.5" />
    </Icon>
  );
}

export function IconLocation(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </Icon>
  );
}

export function IconSunny(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </Icon>
  );
}

export function IconToday(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
      <path d="M8 2.5v4M16 2.5v4M3.5 9.5h17" />
    </Icon>
  );
}

export function IconTrash(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M8 7l1 13h6l1-13" />
    </Icon>
  );
}

export function IconChecklist(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 6h11M9 12h11M9 18h11M4.5 6l1 1 2-2M4.5 12l1 1 2-2M4.5 18l1 1 2-2" />
    </Icon>
  );
}

export function IconPayments(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M2.5 10h19M7 14h3" />
    </Icon>
  );
}

export function IconChevron(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 6l6 6-6 6" />
    </Icon>
  );
}

export function IconEmergency(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3v10M12 17v.01" />
      <circle cx="12" cy="12" r="9" />
    </Icon>
  );
}

export function IconWard(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
    </Icon>
  );
}

export function IconHospital(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 21h18M6 21V8h12v13M10 12h4M12 10v4" />
    </Icon>
  );
}

export function IconDelivery(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7V10zM6 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    </Icon>
  );
}

export function IconWifi(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12.5a9 9 0 0 1 14 0M8.5 15.5a4.5 4.5 0 0 1 7 0M12 19h.01" />
    </Icon>
  );
}

export function IconGas(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3c2 3 5 5 5 9a5 5 0 1 1-10 0c0-4 3-6 5-9z" />
    </Icon>
  );
}

export function IconBolt(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </Icon>
  );
}

export function IconWater(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3c3.5 4.5 6 7.5 6 10.5a6 6 0 1 1-12 0C6 10.5 8.5 7.5 12 3z" />
    </Icon>
  );
}

export function IconWallet(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 1 3 16.5v-8z" />
      <path d="M16 13.5h4" />
    </Icon>
  );
}

export function IconHome(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" />
    </Icon>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  );
}
