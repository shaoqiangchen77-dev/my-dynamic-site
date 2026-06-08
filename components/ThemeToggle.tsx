'use client';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const saved = (localStorage.getItem('theme') || 'system') as Theme;
    setTheme(saved);
    apply(saved);
  }, []);

  function apply(t: Theme) {
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (t === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  function set(t: Theme) {
    setTheme(t);
    localStorage.setItem('theme', t);
    apply(t);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-2 glass p-2 rounded-full">
      <button onClick={() => set('light')} className={`p-2 rounded-full ${theme === 'light' ? 'bg-orange-500 text-white' : ''}`}>☀️</button>
      <button onClick={() => set('dark')} className={`p-2 rounded-full ${theme === 'dark' ? 'bg-green-500 text-white' : ''}`}>🌙</button>
      <button onClick={() => set('system')} className={`p-2 rounded-full ${theme === 'system' ? 'bg-gray-500 text-white' : ''}`}>⚙️</button>
    </div>
  );
}