'use client';
import { useEffect } from 'react';

/**
 * 暗夜模式下闪烁的星星
 * 创建少量大颗亮星，带闪烁动画
 */
export default function TwinkleStars() {
  useEffect(() => {
    const container = document.querySelector('.bg-gradient-layer');
    if (!container) return;

    let stars: HTMLDivElement[] = [];

    function createStars(el: Element) {
      const count = 8;
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 2 + Math.random() * 2;
        const dur = 3 + Math.random() * 4;
        const delay = Math.random() * 3;
        const colors = ['#fff', '#dde4ff', '#ffe8d0'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        Object.assign(star.style, {
          position: 'absolute',
          left: x + '%',
          top: y + '%',
          width: size + 'px',
          height: size + 'px',
          borderRadius: '50%',
          background: color,
          opacity: '0.6',
          animation: `twinkle ${dur}s ${delay}s ease-in-out infinite`,
          pointerEvents: 'none',
          zIndex: '2',
          willChange: 'opacity',
        } as CSSStyleDeclaration);

        el.appendChild(star);
        stars.push(star);
      }
    }

    function removeStars() {
      stars.forEach(s => s.remove());
      stars = [];
    }

    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') createStars(container);

    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme');
      if (current === 'dark') {
        if (stars.length === 0) createStars(container);
      } else {
        removeStars();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      observer.disconnect();
      removeStars();
    };
  }, []);

  return null;
}
