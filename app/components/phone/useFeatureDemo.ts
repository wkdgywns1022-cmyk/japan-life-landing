"use client";

import { useEffect, useRef, useState } from "react";

export type DemoStep<T extends string> = {
  state: T;
  holdMs: number;
};

type Options<T extends string> = {
  enabled: boolean;
  paused?: boolean;
  reduceMotion?: boolean | null;
  steps: readonly DemoStep<T>[];
  initial: T;
  startDelayMs?: number;
};

/**
 * One controlled timeout timeline per active feature screen.
 * Clears on disable, unmount, or pause. No intervals / no 60fps state.
 */
export function useFeatureDemo<T extends string>({
  enabled,
  paused = false,
  reduceMotion = false,
  steps,
  initial,
  startDelayMs = 850,
}: Options<T>): T {
  const [liveState, setLiveState] = useState<T>(initial);
  const indexRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);

  const active = Boolean(enabled) && !reduceMotion && steps.length > 0;

  useEffect(() => {
    const clear = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    if (!active) {
      clear();
      indexRef.current = 0;
      hasStartedRef.current = false;
      return clear;
    }

    if (paused) {
      clear();
      return clear;
    }

    let cancelled = false;

    const schedule = (delay: number, fn: () => void) => {
      clear();
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        if (!cancelled) fn();
      }, delay);
    };

    const advance = () => {
      if (cancelled) return;
      const step = steps[indexRef.current];
      setLiveState(step.state);
      hasStartedRef.current = true;
      schedule(step.holdMs, () => {
        indexRef.current = (indexRef.current + 1) % steps.length;
        advance();
      });
    };

    const delay = hasStartedRef.current ? 450 : startDelayMs;
    schedule(delay, advance);

    return () => {
      cancelled = true;
      clear();
    };
  }, [active, paused, initial, startDelayMs, steps]);

  return active ? liveState : initial;
}
