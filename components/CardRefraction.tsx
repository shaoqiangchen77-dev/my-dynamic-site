'use client';
import { useEffect } from 'react';

/**
 * 全局卡片悬浮折射光效
 * 鼠标在 .glass 卡片上移动时，内部光线跟随折射
 * 使用 rAF 节流避免性能问题
 */
export default function CardRefraction() {
  useEffect(() => {
    let ticking = false;
    let lastX = 0;
    let lastY = 0;

    function update() {
      const el = document.elementFromPoint(lastX, lastY) as HTMLElement | null;
      const card = el?.closest('.glass') as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = ((lastX - rect.left) / rect.width) * 100;
        const y = ((lastY - rect.top) / rect.height) * 100;
        card.style.setProperty('--refract-x', x + '%');
        card.style.setProperty('--refract-y', y + '%');
      }
      ticking = false;
    }

    function onMove(e: MouseEvent) {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    document.addEventListener('mousemove', onMove, { passive: true });
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return null;
}
