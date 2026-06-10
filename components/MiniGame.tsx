'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

type GameState = 'idle' | 'playing' | 'over';

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

const COLORS = [
  'rgba(168,85,247,0.6)',
  'rgba(56,189,248,0.6)',
  'rgba(212,168,67,0.6)',
  'rgba(74,222,128,0.6)',
  'rgba(255,100,150,0.6)',
];

export default function MiniGame() {
  const [state, setState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [combo, setCombo] = useState(0);
  const nextId = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    try {
      setHighScore(parseInt(localStorage.getItem('game-high-score') || '0'));
    } catch {}
  }, []);

  const startGame = useCallback(() => {
    setState('playing');
    setScore(0);
    setCombo(0);
    setTimeLeft(20);
    setOrbs([]);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setState('over');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  // 生成光球
  useEffect(() => {
    if (state !== 'playing') return;
    const interval = setInterval(() => {
      setOrbs((prev) => {
        // 移除过期的
        const alive = prev.filter((o) => o.life > 0);
        // 最多同时 5 个
        if (alive.length >= 5) return alive;
        const newOrb: Orb = {
          id: nextId.current++,
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 70,
          size: 30 + Math.random() * 25,
          life: 2.5,
          maxLife: 2.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
        return [...alive, newOrb];
      });
    }, 600);
    return () => clearInterval(interval);
  }, [state]);

  // 光球生命值递减
  useEffect(() => {
    if (state !== 'playing') return;
    const interval = setInterval(() => {
      setOrbs((prev) =>
        prev
          .map((o) => ({ ...o, life: o.life - 0.1 }))
          .filter((o) => o.life > 0)
      );
    }, 100);
    return () => clearInterval(interval);
  }, [state]);

  // 游戏结束
  useEffect(() => {
    if (state === 'over') {
      setOrbs([]);
      if (score > highScore) {
        setHighScore(score);
        try { localStorage.setItem('game-high-score', String(score)); } catch {}
      }
    }
  }, [state, score, highScore]);

  function hitOrb(id: number) {
    setOrbs((prev) => prev.filter((o) => o.id !== id));
    setCombo((c) => c + 1);
    const bonus = Math.min(combo + 1, 5);
    setScore((s) => s + bonus);
  }

  function miss() {
    setCombo(0);
  }

  return (
    <section className="py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h3 className="title-md mb-4 text-center scroll-reveal">小游戏</h3>
        <div className="glass p-4 scroll-reveal">
          {state === 'idle' && (
            <div className="text-center py-8">
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                在限定时间内点击出现的光球得分，连击加分！
              </p>
              <button onClick={startGame} className="glass-btn py-2 px-8 text-sm">
                开始游戏
              </button>
              {highScore > 0 && (
                <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                  最高分: {highScore}
                </p>
              )}
            </div>
          )}

          {state === 'playing' && (
            <>
              {/* 信息栏 */}
              <div className="flex justify-between items-center mb-3 px-2">
                <span className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>
                  得分: {score}
                </span>
                <span className="text-xs" style={{ color: combo > 1 ? '#d4a843' : 'var(--text-muted)' }}>
                  {combo > 1 ? `${combo}x 连击!` : ''}
                </span>
                <span className="text-sm font-mono" style={{ color: timeLeft <= 5 ? '#f87171' : 'var(--text-muted)' }}>
                  {timeLeft}s
                </span>
              </div>
              {/* 游戏区域 */}
              <div
                className="relative rounded-xl overflow-hidden cursor-crosshair"
                style={{
                  height: '280px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--glass-border-subtle)',
                }}
                onClick={miss}
              >
                {orbs.map((orb) => {
                  const opacity = orb.life / orb.maxLife;
                  return (
                    <div
                      key={orb.id}
                      onClick={(e) => { e.stopPropagation(); hitOrb(orb.id); }}
                      className="absolute rounded-full cursor-pointer"
                      style={{
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                        transform: 'translate(-50%, -50%)',
                        background: `radial-gradient(circle, ${orb.color.replace('0.6', String(opacity * 0.8))}, transparent)`,
                        boxShadow: `0 0 ${orb.size}px ${orb.size / 3}px ${orb.color.replace('0.6', String(opacity * 0.3))}`,
                        transition: 'transform 0.1s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.15)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)')}
                    />
                  );
                })}
              </div>
            </>
          )}

          {state === 'over' && (
            <div className="text-center py-8">
              <p className="text-3xl font-bold mb-2" style={{ color: '#d4a843' }}>{score}</p>
              <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>分</p>
              {score >= highScore && score > 0 && (
                <p className="text-xs mb-4" style={{ color: '#4ade80' }}>新纪录!</p>
              )}
              <button onClick={startGame} className="glass-btn py-2 px-8 text-sm">
                再来一局
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
