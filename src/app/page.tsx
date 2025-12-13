import styles from "./page.module.css";
import UsernameInput from "./components/UsernameInput";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.gradientText}>GitHub Wrap</span>
            <span className={styles.yearBadge}>2025</span>
          </h1>
          <p className={styles.subtitle}>
            Your year in code, unwrapped. 🎁<br />
            See your contributions, top languages, and fun facts.
          </p>
        </div>
        
        <div className={styles.inputWrapper}>
          <UsernameInput />
        </div>

        <div className={styles.blobs}>
          <div className={styles.blob1} />
          <div className={styles.blob2} />
          <div className={styles.blob3} />
        </div>
      </div>
    </main>
  );
}
