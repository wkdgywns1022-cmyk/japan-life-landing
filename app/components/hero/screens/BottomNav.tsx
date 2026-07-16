"use client";

import {
  IconChecklist,
  IconHome,
  IconPerson,
  IconTrash,
  IconWallet,
} from "../icons";
import { useLocale } from "../LocaleProvider";
import type { PhoneScreenId } from "../i18n";
import styles from "./BottomNav.module.css";

export default function BottomNav({
  active,
}: {
  active: PhoneScreenId | "garbage" | "profile";
}) {
  const { t } = useLocale();

  const items = [
    { id: "expense" as const, label: t.nav.expense, Icon: IconWallet },
    { id: "garbage" as const, label: t.nav.garbage, Icon: IconTrash },
    { id: "home" as const, label: t.nav.home, Icon: IconHome },
    { id: "checklist" as const, label: t.nav.checklist, Icon: IconChecklist },
    { id: "profile" as const, label: t.nav.profile, Icon: IconPerson },
  ];

  return (
    <nav className={styles.nav}>
      {items.map(({ id, label, Icon }) => {
        const isActive =
          id === active ||
          (active === "wardOfficeJapanese" && id === "home") ||
          (active === "lifeShortcuts" && id === "home");
        return (
          <div
            key={id}
            className={`${styles.item} ${isActive ? styles.active : ""}`}
          >
            <Icon size={22} />
            <span className={styles.label}>{label}</span>
          </div>
        );
      })}
    </nav>
  );
}
