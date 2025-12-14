'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'midnight' | 'aurora' | 'cyber';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('midnight');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Determine initial theme
    const saved = localStorage.getItem('github-wrap-theme') as Theme;
    if (saved && ['midnight', 'aurora', 'cyber'].includes(saved)) {
      setTheme(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Update DOM and storage
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('github-wrap-theme', theme);
  }, [theme, mounted]);

  // We must always render the Provider so useTheme doesn't throw.
  // We can just rely on 'midnight' default for SSR.


  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
