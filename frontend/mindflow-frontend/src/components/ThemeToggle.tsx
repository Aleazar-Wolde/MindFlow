// src/components/ThemeToggle.tsx
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

const getInitial = () => {
  // Trust the <html> class set in main.tsx to avoid mismatch/flash
  return document.documentElement.classList.contains('dark');
};

const ThemeToggle: React.FC = () => {
  const [dark, setDark] = useState<boolean>(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  // If OS theme changes *and* user hasn’t chosen manually, sync it
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setDark(e.matches);
      }
    };
    mq?.addEventListener?.('change', handler);
    return () => mq?.removeEventListener?.('change', handler);
  }, []);

  return (
    <Button variant="ghost" size="sm" onClick={() => setDark(v => !v)} aria-label="Toggle theme">
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
};

export default ThemeToggle;
