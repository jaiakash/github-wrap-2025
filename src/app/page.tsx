import styles from "./page.module.css";
import UsernameInput from "./components/UsernameInput";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          GitHub <span className={styles.year}>Wrapped 2025</span>
        </h1>
        <p className={styles.subtitle}>Discover your coding story.</p>
      </div>
      <UsernameInput />
    </main>
  );
}
