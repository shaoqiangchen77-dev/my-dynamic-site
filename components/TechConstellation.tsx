'use client';
import { useEffect, useRef } from 'react';

interface Node {
  name: string;
  x: number;
  y: number;
  r: number;
  group: string;
}

const nodes: Node[] = [
  // Java 生态
  { name: 'Java', x: 25, y: 30, r: 18, group: 'java' },
  { name: 'Spring Boot', x: 15, y: 50, r: 14, group: 'java' },
  { name: 'MyBatis', x: 35, y: 55, r: 10, group: 'java' },
  { name: 'Redis', x: 10, y: 70, r: 11, group: 'java' },
  { name: 'MySQL', x: 30, y: 75, r: 12, group: 'java' },
  // 前端
  { name: 'Vue 3', x: 60, y: 25, r: 16, group: 'frontend' },
  { name: 'UniApp', x: 75, y: 40, r: 13, group: 'frontend' },
  { name: 'TypeScript', x: 50, y: 45, r: 12, group: 'frontend' },
  { name: 'Pinia', x: 70, y: 60, r: 9, group: 'frontend' },
  // Agent
  { name: 'LLM', x: 50, y: 70, r: 14, group: 'agent' },
  { name: 'RAG', x: 65, y: 80, r: 11, group: 'agent' },
  { name: 'Agent', x: 45, y: 85, r: 13, group: 'agent' },
  // 工具
  { name: 'Claude Code', x: 85, y: 20, r: 11, group: 'tool' },
  { name: 'Cursor', x: 90, y: 45, r: 10, group: 'tool' },
  { name: 'Docker', x: 80, y: 70, r: 10, group: 'tool' },
];

const links: [number, number][] = [
  [0, 1], [0, 2], [1, 2], [1, 4], [0, 3], [3, 4],
  [5, 6], [5, 7], [6, 8], [7, 8],
  [9, 10], [9, 11], [10, 11],
  [5, 7], [7, 9], [9, 14],
  [12, 13], [12, 5], [13, 7],
  [14, 3], [6, 14],
];

const colors: Record<string, string> = {
  java: '#f59e0b',
  frontend: '#10b981',
  agent: '#a855f7',
  tool: '#38bdf8',
};

export default function TechConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 600;
    const h = 400;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = '100%';
    canvas.style.maxWidth = w + 'px';
    canvas.style.height = 'auto';
    ctx.scale(dpr, dpr);

    let frame = 0;
    let running = false;
    let rafId: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      // 连线
      links.forEach(([a, b]) => {
        const na = nodes[a];
        const nb = nodes[b];
        ctx.beginPath();
        ctx.moveTo(na.x * w / 100, na.y * h / 100);
        ctx.lineTo(nb.x * w / 100, nb.y * h / 100);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // 节点
      nodes.forEach((node, i) => {
        const x = node.x * w / 100;
        const y = node.y * h / 100;
        const pulse = Math.sin(frame * 0.02 + i * 0.5) * 0.3 + 0.7;
        const color = colors[node.group];

        // 光晕
        const gradient = ctx!.createRadialGradient(x, y, 0, x, y, node.r + 6);
        gradient.addColorStop(0, color + '33');
        gradient.addColorStop(1, 'transparent');
        ctx!.beginPath();
        ctx!.arc(x, y, node.r + 6, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        // 节点
        ctx!.beginPath();
        ctx!.arc(x, y, node.r * 0.5, 0, Math.PI * 2);
        ctx!.fillStyle = color + (pulse > 0.85 ? 'ff' : 'aa');
        ctx!.fill();

        // 文字
        ctx!.font = `${Math.max(9, node.r * 0.7)}px Inter, sans-serif`;
        ctx!.fillStyle = `rgba(255,255,255,${0.5 + pulse * 0.3})`;
        ctx!.textAlign = 'center';
        ctx!.fillText(node.name, x, y + node.r + 12);
      });

      frame++;
      if (running) rafId = requestAnimationFrame(draw);
    }

    // 可见时才运行动画
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          rafId = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="title-md mb-6 text-center scroll-reveal">技术栈星图</h3>
        <div className="glass p-6 flex justify-center scroll-reveal">
          <canvas ref={canvasRef} style={{ maxWidth: '600px', width: '100%', height: 'auto' }} />
        </div>
      </div>
    </section>
  );
}
