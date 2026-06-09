'use client';
import { useEffect } from 'react';

export default function MouseGlow() {
  useEffect(() => {
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    Object.assign(glow.style, {
      position: 'fixed',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: '0',
      background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
      transform: 'translate(-50%, -50%)',
      transition: 'left 0.15s ease, top 0.15s ease',
    });
    document.body.appendChild(glow);

    const onMove = (e: MouseEvent) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      glow.remove();
    };
  }, []);

  return null;
}
