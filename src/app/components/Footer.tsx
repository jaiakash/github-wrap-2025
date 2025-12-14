import styles from "./Footer.module.css";
import Link from "next/link";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link 
        href="https://bento.me/akashjaiswal" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.link}
      >
        Made by Akash Jaiswal
      </Link>
      <span className={styles.separator}>•</span>
      <Link 
        href="https://github.com/jaiakash/github-wrap-2025" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.link}
      >
        <Github size={16} />
        Checkout GitHub
      </Link>
    </footer>
  );
}
