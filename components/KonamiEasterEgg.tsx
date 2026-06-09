'use client';
import { useEffect, useRef, useState } from 'react';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false);
  const seq = useRef<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      seq.current.push(e.key);
      if (seq.current.length > KONAMI.length) seq.current.shift();
      if (JSON.stringify(seq.current) === JSON.stringify(KONAMI)) {
        setActive(true);
        seq.current = [];
        // 飘字雨
        const container = document.createElement('div');
        container.style.cssText = 'position:fixed;inset:0;z-index:999;pointer-events:none;overflow:hidden;';
        document.body.appendChild(container);

        for (let i = 0; i < 60; i++) {
          const span = document.createElement('span');
          span.textContent = ['尘', '堑', '代', '码', '永', '不', '眠', '🔥', '⚡', '✨'][Math.floor(Math.random() * 10)];
          span.style.cssText = `position:absolute;left:${Math.random() * 100}%;top:-40px;font-size:${16 + Math.random() * 24}px;color:#d4a843;animation:konami-rain ${2 + Math.random() * 3}s ${Math.random() * 2}s linear forwards;pointer-events:none;`;
          container.appendChild(span);
        }

        setTimeout(() => {
          container.remove();
          setActive(false);
        }, 6000);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return null;
}
