'use client';
import { useState, useEffect } from 'react';

const navItems = [
  { name: '首页', href: '#hero' },
  { name: '文章', href: '#articles' },
  { name: '项目', href: '#projects' },
  { name: '关于我', href: '#about' },
  { name: '留言板', href: '#contact' },
  { name: '日程', href: '/schedule' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          GlassBlog
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {item.name}
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
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="transition-colors text-lg"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
