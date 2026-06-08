'use client';
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

function getEffectiveTheme(mode: Theme): 'light' | 'dark' {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return mode;
}

function applyTheme(mode: Theme) {
  const effective = getEffectiveTheme(mode);
  document.documentElement.setAttribute('data-theme', effective);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const saved = (localStorage.getItem('theme') || 'system') as Theme;
    setTheme(saved);
    applyTheme(saved);

    // 监听系统主题变化
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if ((localStorage.getItem('theme') || 'system') === 'system') {
        applyTheme('system');
      }
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  function changeTheme(t: Theme) {
    setTheme(t);
    localStorage.setItem('theme', t);
    applyTheme(t);
  }

  const options: { key: Theme; icon: string; label: string }[] = [
    { key: 'light', icon: '☀', label: '白天' },
    { key: 'dark', icon: '☾', label: '黑夜' },
    { key: 'system', icon: '◎', label: '系统' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 glass flex gap-1 p-1.5 rounded-full">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => changeTheme(opt.key)}
          title={opt.label}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
            theme === opt.key
              ? 'bg-white/25 shadow-md scale-110'
              : 'hover:bg-white/10'
          }`}
          style={{ color: 'var(--text-primary)' }}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
}
