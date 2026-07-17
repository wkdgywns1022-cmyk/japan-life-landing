"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CONTACT_EMAIL } from "./story/features";
import { useLocale } from "./hero/LocaleProvider";
import styles from "./ContactModal.module.css";

const appleEase = [0.22, 1, 0.36, 1] as const;

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: Props) {
  const { t } = useLocale();
  const copy = t.contactModal;
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = useCallback(() => {
    setToastVisible(true);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastVisible(false);
      toastTimerRef.current = null;
    }, 2000);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      showToast();
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = CONTACT_EMAIL;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        showToast();
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }, [showToast]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className={styles.root} role="presentation">
          <motion.div
            className={styles.backdrop}
            aria-hidden="true"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: appleEase }}
            onClick={onClose}
          />

          <div className={styles.center}>
            <motion.div
              className={styles.dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descId}
              initial={
                reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.94 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0, scale: 1 }
                  : { opacity: 0, scale: 0.96 }
              }
              transition={{ duration: reduceMotion ? 0.12 : 0.28, ease: appleEase }}
            >
              <h2 id={titleId} className={styles.title}>
                {copy.title}
              </h2>
              <p id={descId} className={styles.description}>
                {copy.description}
              </p>

              <p className={styles.emailLabel}>{copy.emailLabel}</p>
              <p className={styles.email}>{CONTACT_EMAIL}</p>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={handleCopy}
                >
                  {copy.copy}
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  className={styles.closeBtn}
                  onClick={onClose}
                >
                  {copy.close}
                </button>
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {toastVisible ? (
              <motion.div
                className={styles.toast}
                role="status"
                aria-live="polite"
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.2, ease: appleEase }}
              >
                {copy.toast}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
