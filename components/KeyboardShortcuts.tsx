'use client';
import { useEffect } from 'react';
import { showToast } from './Toast';

const themeNames: Record<string, string> = {
  light: '☀ 白天',
  dark: '☾ 银河',
  cyberpunk: '⚡ 赛博',
  aurora: '✦ 极光',
  system: '◎ 系统',
};

export default function KeyboardShortcuts() {
  useEffect(() => {
    const themes = ['light', 'dark', 'cyberpunk', 'aurora', 'system'];

    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;

      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        const current = localStorage.getItem('theme') || 'system';
        const idx = themes.indexOf(current);
        const next = themes[(idx + 1) % themes.length];
        localStorage.setItem('theme', next);

        let effective = next;
        if (next === 'system') {
          effective = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', effective);
        window.dispatchEvent(new CustomEvent('theme-change', { detail: next }));
        showToast(`主题: ${themeNames[next] || next}`);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return null;
}
