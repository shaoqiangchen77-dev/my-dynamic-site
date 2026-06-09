'use client';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        animation: 'loading-fade 1.2s ease forwards',
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold"
          style={{
            background: '#0a0a0a',
            color: '#d4a843',
            border: '2px solid rgba(212,168,67,0.4)',
            animation: 'loading-pulse 1s ease-in-out infinite',
          }}
        >
          尘
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: '#d4a843',
                animation: `loading-dot 1s ${i * 0.2}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
