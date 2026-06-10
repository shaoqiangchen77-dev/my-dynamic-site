'use client';
import { useEffect, useRef } from 'react';

const skills = [
  { name: 'Java', value: 90 },
  { name: 'Vue/UniApp', value: 88 },
  { name: '数据库', value: 88 },
  { name: 'AI Agent', value: 75 },
  { name: 'AI 工具', value: 90 },
  { name: 'DevOps', value: 70 },
];

export default function SkillRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 280;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const maxR = 100;
    const n = skills.length;
    const angleStep = (Math.PI * 2) / n;
    const startAngle = -Math.PI / 2;

    let frame = 0;
    let rafId: number;
    let running = false;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);

      // 背景网格
      for (let r = 1; r <= 4; r++) {
        ctx.beginPath();
        const radius = (maxR / 4) * r;
        for (let i = 0; i <= n; i++) {
          const angle = startAngle + i * angleStep;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 轴线
      for (let i = 0; i < n; i++) {
        const angle = startAngle + i * angleStep;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.stroke();
      }

      // 数据区域 — 带入场动画
      const progress = Math.min(frame / 60, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const idx = i % n;
        const angle = startAngle + idx * angleStep;
        const r = (skills[idx].value / 100) * maxR * ease;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.fillStyle = 'rgba(212,168,67,0.15)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(212,168,67,0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 节点圆点
      for (let i = 0; i < n; i++) {
        const angle = startAngle + i * angleStep;
        const r = (skills[i].value / 100) * maxR * ease;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#d4a843';
        ctx.fill();
      }

      // 标签
      ctx.font = '11px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.textAlign = 'center';
      for (let i = 0; i < n; i++) {
        const angle = startAngle + i * angleStep;
        const labelR = maxR + 18;
        const x = cx + Math.cos(angle) * labelR;
        const y = cy + Math.sin(angle) * labelR + 4;
        ctx.fillText(skills[i].name, x, y);
      }

      frame++;
      if (running && progress < 1) rafId = requestAnimationFrame(draw);
    }

    // 可见时才播放动画
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = 0;
        rafId = requestAnimationFrame(draw);
      }
    }, { threshold: 0.3 });
    observer.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} />
    </div>
  );
}
