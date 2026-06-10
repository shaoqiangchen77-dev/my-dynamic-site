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
                  <feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="4" result="n" />
                  <feColorMatrix type="saturate" values="0" in="n" result="g" />
                  <feComponentTransfer in="g" result="m">
                    <feFuncA type="discrete" tableValues="0 0 0 0.1 0.25 0.45 0.65 0.85 1 1" />
                  </feComponentTransfer>
                  <feComposite in="SourceGraphic" in2="m" operator="out" />
                </filter>
                <clipPath id="seal-clip">
                  <rect x="12" y="12" width="96" height="96" rx="1" />
                </clipPath>
              </defs>

              {/* 深色底 */}
              <rect x="2" y="2" width="116" height="116" rx="4" fill="#0c0c0c" />

              {/* 外框 — 双层方框 */}
              <rect x="6" y="6" width="108" height="108" rx="2" fill="none" stroke="url(#seal-red)" strokeWidth="3.5" />
              <rect x="11" y="11" width="98" height="98" rx="1" fill="none" stroke="url(#seal-red)" strokeWidth="1.2" opacity="0.5" />

              {/* 受命于天 既寿永昌 — 篆书风格 */}
              <g clipPath="url(#seal-clip)" fill="none" stroke="url(#seal-red)" strokeLinecap="round" strokeLinejoin="round" filter="url(#seal-worn)">

                {/* 受 — 左上 */}
                <g strokeWidth="2.5">
                  <path d="M20 18 L48 18" />
                  <path d="M24 22 L44 22" />
                  <path d="M34 18 L34 42" />
                  <path d="M20 28 Q28 34 34 30 Q40 26 48 28" />
                  <path d="M24 36 L44 36" />
                  <path d="M22 42 L46 42" />
                  <path d="M28 42 L28 52" />
                  <path d="M40 42 L40 52" />
                </g>

                {/* 命 — 右上 */}
                <g strokeWidth="2.5">
                  <path d="M64 16 L64 46" />
                  <path d="M56 20 L72 20" />
                  <path d="M56 20 L56 30 L72 30 L72 20" />
                  <path d="M60 34 L68 34" />
                  <path d="M56 40 L64 46 L72 40" />
                  <path d="M56 50 L72 50" />
                </g>

                {/* 于 — 左中 */}
                <g strokeWidth="2.5">
                  <path d="M22 60 L46 60" />
                  <path d="M34 56 L34 80" />
                  <path d="M22 70 L46 70" />
                  <path d="M24 76 L34 80 L44 76" />
                </g>

                {/* 天 — 右中 */}
                <g strokeWidth="2.5">
                  <path d="M56 58 L72 58" />
                  <path d="M54 66 L74 66" />
                  <path d="M64 58 L64 82" />
                  <path d="M52 74 L64 82 L76 74" />
                </g>

                {/* 既 — 左下 */}
                <g strokeWidth="2.5">
                  <path d="M18 90 L48 90" />
                  <path d="M22 94 L44 94" />
                  <path d="M20 90 L20 104" />
                  <path d="M34 90 L34 104" />
                  <path d="M20 98 L34 98" />
                  <path d="M40 90 L48 96" />
                  <path d="M40 96 L48 102" />
                </g>

                {/* 寿 — 右下 */}
                <g strokeWidth="2.5">
                  <path d="M56 88 L72 88" />
                  <path d="M58 92 L70 92" />
                  <path d="M56 96 L72 96" />
                  <path d="M64 88 L64 106" />
                  <path d="M56 100 L72 100" />
                  <path d="M58 104 L70 104" />
                  <path d="M60 100 L60 106" />
                  <path d="M68 100 L68 106" />
                </g>
              </g>

              {/* 中心分格线 */}
              <line x1="60" y1="14" x2="60" y2="106" stroke="url(#seal-red)" strokeWidth="1" opacity="0.3" />
              <line x1="14" y1="58" x2="106" y2="58" stroke="url(#seal-red)" strokeWidth="1" opacity="0.3" />
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
