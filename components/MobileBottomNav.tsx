'use client';
import { useState, useEffect } from 'react';

const items = [
  { icon: '🏠', label: '首页', href: '#hero' },
  { icon: '📝', label: '文章', href: '#articles' },
  { icon: '🏗️', label: '项目', href: '#projects' },
  { icon: '👤', label: '关于', href: '#about' },
  { icon: '📅', label: '日程', href: '/schedule' },
];

export default function MobileBottomNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 w-full z-40 md:hidden"
      style={{
        background: 'var(--nav-scrolled-bg)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderTop: '1px solid var(--glass-border-subtle)',
        animation: 'fade-in-up 0.2s ease',
      }}
    >
      <div className="flex justify-around items-center py-2">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-0.5 px-2 py-1"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[9px]">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
