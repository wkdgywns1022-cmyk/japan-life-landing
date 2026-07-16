import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>LifePass Japan</p>
        <p className={styles.line}>Making life in Japan easier.</p>
        <p className={styles.line}>Designed &amp; Built by Hyojun Jang</p>
        <p className={styles.copyright}>
          © 2026 LifePass Japan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
