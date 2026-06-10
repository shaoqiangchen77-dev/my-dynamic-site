'use client';
import { useEffect } from 'react';

/**
 * 全局卡片悬浮折射光效
 * 鼠标在 .glass 卡片上移动时，内部光线跟随折射
 */
export default function CardRefraction() {
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const card = target.closest('.glass') as HTMLElement | null;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--refract-x', x + '%');
      card.style.setProperty('--refract-y', y + '%');
    }

    document.addEventListener('mousemove', onMove, { passive: true });
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return null;
}
