'use client';

import { useTheme, Theme } from './ThemeProvider';
import { motion } from 'framer-motion';
import { Moon, Sun, Monitor, Zap, Sparkles } from 'lucide-react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes: { id: Theme; label: string; icon: React.ReactNode }[] = [
    { id: 'midnight', label: 'Midnight', icon: <Moon size={16} /> },
    { id: 'aurora', label: 'Aurora', icon: <Sparkles size={16} /> },
    { id: 'cyber', label: 'Cyber', icon: <Zap size={16} /> },
  ];

  return (
    <div className="glass-panel" style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      display: 'flex',
      gap: '4px',
      padding: '4px',
      zIndex: 50
    }}>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          style={{
            position: 'relative',
            background: 'transparent',
            border: 'none',
            color: theme === t.id ? 'var(--text-primary)' : 'var(--text-secondary)',
            padding: '8px 12px',
            borderRadius: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'color 0.2s'
          }}
        >
          {theme === t.id && (
            <motion.div
              layoutId="activeTheme"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                zIndex: -1
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {t.icon}
          {t.label}
        </button>
      ))}
    </div>
  );
}
