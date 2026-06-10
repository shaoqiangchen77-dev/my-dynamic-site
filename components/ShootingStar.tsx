'use client';
import { useEffect } from 'react';

/**
 * 暗夜模式下点击背景空白处生成流星
 */
export default function ShootingStar() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      // 只在暗色主题下生效
      const theme = document.documentElement.getAttribute('data-theme');
      if (theme !== 'dark' && theme !== 'cyberpunk' && theme !== 'aurora') return;
      // 点击在按钮/链接/输入框上时不触发
      const tag = (e.target as HTMLElement).tagName;
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;

      const star = document.createElement('div');
      const angle = -30 + Math.random() * 20; // -30 到 -10 度
      const len = 80 + Math.random() * 120;
      const dur = 0.6 + Math.random() * 0.4;

      Object.assign(star.style, {
        position: 'fixed',
        left: e.clientX + 'px',
        top: e.clientY + 'px',
        width: len + 'px',
        height: '2px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.9))',
        borderRadius: '1px',
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'right center',
        pointerEvents: 'none',
        zIndex: '9998',
        opacity: '1',
        transition: `all ${dur}s ease-out`,
      } as CSSStyleDeclaration);

      document.body.appendChild(star);

      requestAnimationFrame(() => {
        star.style.transform = `rotate(${angle}deg) translateX(-200px)`;
        star.style.opacity = '0';
      });

      setTimeout(() => star.remove(), dur * 1000 + 50);
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
