'use client';
import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        border: '1px solid var(--glass-border)',
        color: 'var(--text-primary)',
        boxShadow: '0 4px 16px var(--glass-shadow)',
        animation: 'fade-in-up 0.3s ease',
      }}
      title="返回顶部"
    >
      ↑
    </button>
  );
}
