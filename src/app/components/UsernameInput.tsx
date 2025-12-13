'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './UsernameInput.module.css';

export default function UsernameInput() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setLoading(true);
    // Extract username if full URL is pasted
    let cleanUsername = username.trim();
    if (cleanUsername.includes('github.com/')) {
      cleanUsername = cleanUsername.split('github.com/')[1].split('/')[0];
    }

    router.push(`/wrap/${cleanUsername}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your GitHub username, eg jaiakash"
          className={styles.input}
          aria-label="GitHub Username"
          disabled={loading}
        />
        <div className={styles.glow} />
      </div>
      <button type="submit" className={styles.button} disabled={loading || !username}>
        {loading ? 'Wrapping...' : 'Generate 2025 Wrap'}
      </button>
    </form>
  );
}
