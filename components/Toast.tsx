'use client';
import { useState, useEffect, useCallback } from 'react';

interface ToastItem {
  id: number;
  message: string;
  type: 'info' | 'success';
}

let toastId = 0;
let listeners: ((msg: string, type: 'info' | 'success') => void)[] = [];

export function showToast(message: string, type: 'info' | 'success' = 'info') {
  listeners.forEach(fn => fn(message, type));
}

export default function Toast() {
  const [items, setItems] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: 'info' | 'success') => {
    const id = ++toastId;
    setItems(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setItems(prev => prev.filter(t => t.id !== id));
    }, 2500);
  }, []);

  useEffect(() => {
    listeners.push(addToast);
    return () => { listeners = listeners.filter(l => l !== addToast); };
  }, [addToast]);

  if (items.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-[90] flex flex-col gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className="glass px-4 py-2.5 text-sm flex items-center gap-2"
          style={{ animation: 'fade-in-up 0.2s ease', minWidth: '160px' }}
        >
          <span>{t.type === 'success' ? '✓' : 'ℹ'}</span>
          <span style={{ color: 'var(--text-body)' }}>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
