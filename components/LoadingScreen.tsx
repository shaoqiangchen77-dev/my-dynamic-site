'use client';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 30 + 10, 100));
    }, 200);
    const timer = setTimeout(() => setShow(false), 1200);
    return () => { clearTimeout(timer); clearInterval(interval); };
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
        {/* 进度条 */}
        <div className="w-32 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="h-full rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%`, background: '#d4a843' }}
          />
        </div>
      </div>
    </div>
  );
}
