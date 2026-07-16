"use client";

import { useEffect, useState } from "react";
import { COMPACT_MQ, DESKTOP_MQ } from "./features";

export type LayoutMode = "desktop" | "mobile";

/**
 * Layout-width breakpoint via matchMedia (never user-agent).
 * Returns null until mounted to avoid SSR/client layout mismatch.
 */
export function useLayoutMode(): LayoutMode | null {
  const [mode, setMode] = useState<LayoutMode | null>(null);

  useEffect(() => {
    const desktopMq = window.matchMedia(DESKTOP_MQ);
    const sync = () => {
      setMode(desktopMq.matches ? "desktop" : "mobile");
    };
    sync();
    desktopMq.addEventListener("change", sync);
    return () => desktopMq.removeEventListener("change", sync);
  }, []);

  return mode;
}

/** True below 900px. False until mounted (do not treat unknown as desktop). */
export function useIsCompactLayout() {
  const mode = useLayoutMode();
  return mode === "mobile";
}

/** True at 900px+. False until mounted (do not treat unknown as desktop). */
export function useIsDesktopLayout() {
  const mode = useLayoutMode();
  return mode === "desktop";
}

/** Compact media query string for imperative checks */
export { COMPACT_MQ };
