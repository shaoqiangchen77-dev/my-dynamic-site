'use client';
import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[60]" style={{ height: '2px' }}>
      <div
        className="h-full transition-[width] duration-100"
        style={{
          width: `${progress}%`,
          background: 'rgba(212,168,67,0.6)',
        }}
      />
    </div>
  );
}
