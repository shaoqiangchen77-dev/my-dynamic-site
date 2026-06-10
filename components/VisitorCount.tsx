'use client';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'visitor-count';

export default function VisitorCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      const stored = parseInt(localStorage.getItem(STORAGE_KEY) || '0');
      const newCount = stored + 1;
      localStorage.setItem(STORAGE_KEY, String(newCount));
      setCount(newCount);
    } catch {
      setCount(1);
    }
  }, []);

  if (count === 0) return null;

  return (
    <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
      👁 {count}
    </span>
  );
}
