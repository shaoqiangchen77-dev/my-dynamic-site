'use client';
import { useState, useEffect } from 'react';
import AvatarExplosion from './AvatarExplosion';

const socialLinks = [
  { name: 'GitHub', icon: 'GH', href: 'https://github.com' },
  { name: 'Twitter', icon: 'TW', href: 'https://twitter.com' },
  { name: 'Email', icon: '@', href: 'mailto:898532963@qq.com' },
  { name: 'Blog', icon: 'BG', href: '#articles' },
];

const titleText = '你好，我是 尘堑';

const texts = [
  '专注于 Java 生态与 Vue/UniApp 全端开发，深度使用 AI 编程工具提效',
  '用 Spring Boot 构建企业级微服务，用 Vue 3 打造跨端应用',
  '探索 AI Agent 架构，让 LLM 融入开发全流程',
  'Claude Code / Cursor / 扣子 / Codex / Trae 全链路提效',
];

/** 标题打字机：10s 一轮询（打字→停留→擦除→停留→循环） */
function useTitleTypewriter(text: string, cycleMs = 10000) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const len = text.length;

  useEffect(() => {
    // 时间分配：打字30% | 停留30% | 擦除20% | 停留20%
    const typeDur = cycleMs * 0.3;
    const holdDur = cycleMs * 0.3;
    const eraseDur = cycleMs * 0.2;
    const gapDur = cycleMs * 0.2;
    const typeDelay = typeDur / len;
    const eraseDelay = eraseDur / len;

    let step = 0; // 0=打字 1=停留 2=擦除 3=停留
    let charIdx = 0;
    let raf: ReturnType<typeof setTimeout>;

    const tick = () => {
      switch (step) {
        case 0: // 打字
          charIdx++;
          setDisplayed(text.slice(0, charIdx));
          if (charIdx >= len) {
            step = 1;
            raf = setTimeout(tick, holdDur);
          } else {
            raf = setTimeout(tick, typeDelay);
          }
          break;
        case 1: // 停留（打完）
          step = 2;
          setShowCursor(false);
          raf = setTimeout(tick, 200);
          break;
        case 2: // 擦除
          setShowCursor(true);
          charIdx--;
          setDisplayed(text.slice(0, charIdx));
          if (charIdx <= 0) {
            step = 3;
            raf = setTimeout(tick, gapDur);
          } else {
            raf = setTimeout(tick, eraseDelay);
          }
          break;
        case 3: // 停留（擦完）
          step = 0;
          raf = setTimeout(tick, 200);
          break;
      }
    };

    raf = setTimeout(tick, 500);
    return () => clearTimeout(raf);
  }, [text, cycleMs, len]);

  return { displayed, showCursor };
}

function useTypewriter(texts: string[], typeSpeed = 40, deleteSpeed = 20, pause = 2000) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let textIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = texts[textIdx];

      if (!deleting) {
        charIdx++;
        setDisplayed(current.slice(0, charIdx));
        if (charIdx === current.length) {
          timeout = setTimeout(() => { deleting = true; tick(); }, pause);
          return;
        }
        timeout = setTimeout(tick, typeSpeed);
      } else {
        charIdx--;
        setDisplayed(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          textIdx = (textIdx + 1) % texts.length;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, deleteSpeed);
      }
    };

    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, [texts, typeSpeed, deleteSpeed, pause]);

  return { displayed };
}

export default function Hero() {
  const { displayed: titleDisplayed, showCursor: titleCursor } = useTitleTypewriter(titleText, 10000);
  const { displayed } = useTypewriter(texts);
  const { explode } = AvatarExplosion();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20" data-parallax="0.05">
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* 个人信息 */}
        <div className="glass card-hover float-2 p-8 flex flex-col items-center text-center md:items-start md:text-left">
          <div
            className="mb-6 cursor-pointer"
            onClick={explode}
          >
            <svg
              viewBox="0 0 120 120"
              className="w-28 h-28 md:w-32 md:h-32"
              style={{ filter: 'drop-shadow(0 0 6px rgba(200,50,50,0.3))' }}
            >
              <defs>
                <linearGradient id="seal-red" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#b71c1c" />
                  <stop offset="50%" stop-color="#d32f2f" />
                  <stop offset="100%" stop-color="#9a1a1a" />
                </linearGradient>
                <filter id="seal-worn">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="n" />
                  <feColorMatrix type="saturate" values="0" in="n" result="g" />
                  <feComponentTransfer in="g" result="m">
                    <feFuncA type="discrete" tableValues="0 0 0.1 0.3 0.5 0.7 0.85 1 1 1" />
                  </feComponentTransfer>
                  <feComposite in="SourceGraphic" in2="m" operator="out" />
                </filter>
              </defs>

              {/* 深色底 */}
              <rect x="2" y="2" width="116" height="116" rx="4" fill="#0c0c0c" />

              {/* 外框 — 双层方框 */}
              <rect x="6" y="6" width="108" height="108" rx="2" fill="none" stroke="url(#seal-red)" strokeWidth="3.5" />
              <rect x="11" y="11" width="98" height="98" rx="1" fill="none" stroke="url(#seal-red)" strokeWidth="1.2" opacity="0.5" />

              {/* 中心分格线 */}
              <line x1="60" y1="14" x2="60" y2="106" stroke="url(#seal-red)" strokeWidth="1" opacity="0.3" />
              <line x1="14" y1="58" x2="106" y2="58" stroke="url(#seal-red)" strokeWidth="1" opacity="0.3" />

              {/* 受命于天 既寿永昌 — 玉玺铭文 */}
              <g filter="url(#seal-worn)">
                <text x="37" y="40" textAnchor="middle" fill="url(#seal-red)" fontFamily="SimSun, serif" fontWeight="bold" fontSize="28">受命</text>
                <text x="83" y="40" textAnchor="middle" fill="url(#seal-red)" fontFamily="SimSun, serif" fontWeight="bold" fontSize="28">于天</text>
                <text x="37" y="86" textAnchor="middle" fill="url(#seal-red)" fontFamily="SimSun, serif" fontWeight="bold" fontSize="28">既寿</text>
                <text x="83" y="86" textAnchor="middle" fill="url(#seal-red)" fontFamily="SimSun, serif" fontWeight="bold" fontSize="28">永昌</text>
              </g>
            </svg>
          </div>
          <h1 className="title-xl mb-3 gradient-text">
            {titleDisplayed}
            {titleCursor && <span className="inline-block w-0.5 h-7 ml-0.5 align-middle" style={{ background: 'var(--accent)', animation: 'blink 0.8s step-end infinite' }} />}
          </h1>
          <p className="text-body text-lg leading-relaxed">
            Java 后端 / 前端开发 / AI Agent 探索者
          </p>
          <p className="text-muted mt-2 min-h-[1.75rem]">
            {displayed}
            <span className="inline-block w-0.5 h-4 ml-0.5 align-middle" style={{ background: 'var(--text-muted)', animation: 'blink 0.8s step-end infinite' }} />
          </p>
          <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
            {['Claude Code', 'Cursor', '扣子', 'Codex', 'Trae'].map((tool) => (
              <span key={tool} className="text-[10px] px-2 py-1 rounded-full" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', color: 'var(--text-muted)' }}>{tool}</span>
            ))}
          </div>
          {/* 向下滚动提示 */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="scroll-mouse" />
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>向下探索</span>
          </div>
        </div>

        {/* 社交链接 */}
        <div className="glass card-hover float-3 p-8">
          <h2 className="title-md mb-6 text-center">联系我</h2>
          <div className="grid grid-cols-2 gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-subtle social-icon p-4 flex flex-col items-center gap-2 rounded-xl"
              >
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ background: 'var(--glass-bg-subtle)', color: 'var(--text-primary)' }}
                >
                  {link.icon}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
