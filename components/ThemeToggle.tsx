'use client';
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'cyberpunk' | 'aurora' | 'system';

function getEffectiveTheme(mode: Theme): string {
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem('theme') || 'system') as Theme;
    setTheme(saved);
    applyTheme(saved);

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
    setOpen(false);
  }

  const options: { key: Theme; icon: string; label: string }[] = [
    { key: 'light', icon: '☀', label: '白天' },
    { key: 'dark', icon: '☾', label: '银河' },
    { key: 'cyberpunk', icon: '⚡', label: '赛博' },
    { key: 'aurora', icon: '✦', label: '极光' },
    { key: 'system', icon: '◎', label: '系统' },
  ];

  const current = options.find(o => o.key === theme) || options[4];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="glass flex gap-1 p-1.5 rounded-full" style={{ animation: 'fade-in-up 0.2s ease' }}>
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => changeTheme(opt.key)}
              title={opt.label}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
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
      )}
      <button
        onClick={() => setOpen(!open)}
        className="glass w-11 h-11 rounded-full flex items-center justify-center text-lg transition-transform duration-200 hover:scale-110"
        style={{ color: 'var(--text-primary)' }}
        title="切换主题"
      >
        {current.icon}
      </button>
    </div>
  );
}
