'use client';
import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: '首页' },
  { id: 'articles', label: '文章' },
  { id: 'projects', label: '项目' },
  { id: 'timeline', label: '经历' },
  { id: 'about', label: '关于' },
  { id: 'messages', label: '留言' },
];

export default function SideNav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 items-end">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span
            className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
            style={{ color: 'var(--text-muted)' }}
          >
            {s.label}
          </span>
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: active === s.id ? '8px' : '5px',
              height: active === s.id ? '8px' : '5px',
              background: active === s.id ? 'var(--accent)' : 'var(--glass-border)',
              boxShadow: active === s.id ? '0 0 8px var(--accent-soft)' : 'none',
            }}
          />
        </a>
      ))}
    </nav>
  );
}
