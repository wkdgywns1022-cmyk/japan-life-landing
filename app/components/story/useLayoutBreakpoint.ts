"use client";

import { useEffect, useState } from "react";
import { COMPACT_MQ, DESKTOP_MQ } from "./features";

/**
 * Layout-width breakpoint via matchMedia.
 * Never use user-agent strings for desktop vs mobile layout.
 */
export function useIsCompactLayout() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_MQ);
    const sync = () => setIsCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isCompact;
}

export function useIsDesktopLayout() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isDesktop;
}
