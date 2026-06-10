'use client';
import { useEffect } from 'react';

/**
 * 鼠标拖尾粒子效果
 * 鼠标移动时留下渐消散的光点
 */
export default function MouseTrail() {
  useEffect(() => {
    const particles: HTMLDivElement[] = [];
    let lastX = 0;
    let lastY = 0;
    let rafId: number;

    function spawn(x: number, y: number) {
      const p = document.createElement('div');
      const size = 3 + Math.random() * 4;
      const hue = 40 + Math.random() * 20; // 金色范围
      Object.assign(p.style, {
        position: 'fixed',
        left: x - size / 2 + 'px',
        top: y - size / 2 + 'px',
        width: size + 'px',
        height: size + 'px',
        borderRadius: '50%',
        background: `hsl(${hue}, 80%, 70%)`,
        pointerEvents: 'none',
        zIndex: '9999',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        opacity: '0.8',
        transform: 'scale(1)',
      } as CSSStyleDeclaration);
      document.body.appendChild(p);
      particles.push(p);

      requestAnimationFrame(() => {
        p.style.opacity = '0';
        p.style.transform = 'scale(0)';
      });

      setTimeout(() => {
        p.remove();
        const idx = particles.indexOf(p);
        if (idx > -1) particles.splice(idx, 1);
      }, 650);
    }

    function onMove(e: MouseEvent) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 8) return; // 移动距离太小不生成
      lastX = e.clientX;
      lastY = e.clientY;
      spawn(e.clientX, e.clientY);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      particles.forEach(p => p.remove());
    };
  }, []);

  return null;
}
