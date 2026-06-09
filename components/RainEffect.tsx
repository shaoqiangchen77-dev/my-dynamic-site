'use client';
import { useEffect } from 'react';

/**
 * 白天模式下雨滴滑落效果
 * 动态创建雨滴元素，附着在 .bg-gradient-layer 上
 * 仅在 light 主题下生效
 */
export default function RainEffect() {
  useEffect(() => {
    function createDrops() {
      const container = document.querySelector('.bg-gradient-layer');
      if (!container) return [];

      const drops: HTMLDivElement[] = [];
      const count = 20;

      for (let i = 0; i < count; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        const x = Math.random() * 100;
        const h = 20 + Math.random() * 60;
        const w = 1.2 + Math.random() * 1.5;
        const dur = 1.5 + Math.random() * 2.5;
        const delay = Math.random() * 4;
        const opacity = 0.12 + Math.random() * 0.2;

        Object.assign(drop.style, {
          position: 'absolute',
          left: x + '%',
          top: '-10%',
          width: w + 'px',
          height: h + 'px',
          background: `linear-gradient(to bottom, transparent, rgba(180,210,255,${opacity}), rgba(200,230,255,${opacity * 0.6}))`,
          borderRadius: '0 0 4px 4px',
          animation: `rain-fall ${dur}s ${delay}s linear infinite`,
          pointerEvents: 'none',
          zIndex: '1',
        } as CSSStyleDeclaration);

        container.appendChild(drop);
        drops.push(drop);
      }
      return drops;
    }

    let drops: HTMLDivElement[] = [];
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme !== 'dark') {
      drops = createDrops();
    }

    // 监听主题切换
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme');
      if (current === 'dark') {
        drops.forEach(d => d.remove());
        drops = [];
      } else if (drops.length === 0) {
        drops = createDrops();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      observer.disconnect();
      drops.forEach(d => d.remove());
    };
  }, []);

  return null;
}
