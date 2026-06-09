'use client';
import { useState, useEffect } from 'react';

const navItems = [
  { name: '首页', href: '#hero' },
  { name: '文章', href: '#articles' },
  { name: '项目', href: '#projects' },
  { name: '关于我', href: '#about' },
  { name: '经历', href: '#timeline' },
  { name: '留言板', href: '#contact' },
  { name: '日程', href: '/schedule' },
];

function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const now = useNow();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);

      // 高亮当前区域
      const sections = navItems.filter((i) => i.href.startsWith('#')).map((i) => i.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection('#' + sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 移动端菜单打开时禁止背景滚动
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 nav-glass"
      style={{
        background: scrolled ? 'var(--nav-scrolled-bg)' : 'var(--nav-top-bg)',
        boxShadow: scrolled ? '0 4px 24px var(--glass-shadow)' : 'none',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#hero"
          className="font-bold text-xl tracking-wide"
          style={{ color: 'var(--text-primary)' }}
        >
          banana博客
        </a>

        {/* 实时时钟 — 仅桌面端 */}
        <span className="hidden md:inline-block text-xs font-mono tabular-nums" style={{ color: 'var(--text-muted)' }}>
          {timeStr}
        </span>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium relative"
              style={{
                color: activeSection === item.href ? 'var(--text-primary)' : 'var(--text-muted)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => {
                if (activeSection !== item.href) e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              {item.name}
              {activeSection === item.href && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: 'var(--accent)' }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass mx-4 mb-4 p-6 flex flex-col gap-4">
          <span className="text-xs font-mono tabular-nums text-center mb-2" style={{ color: 'var(--text-muted)' }}>
            {timeStr}
          </span>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="transition-colors text-lg"
              style={{
                color: activeSection === item.href ? 'var(--text-primary)' : 'var(--text-muted)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => {
                if (activeSection !== item.href) e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
