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
              style={{ filter: 'drop-shadow(0 0 8px rgba(200,50,50,0.3))' }}
            >
              <defs>
                {/* 朱砂红渐变 */}
                <linearGradient id="seal-red" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#c23616" />
                  <stop offset="50%" stop-color="#e84118" />
                  <stop offset="100%" stop-color="#b33015" />
                </linearGradient>
                {/* 印章纹理噪点 */}
                <filter id="seal-texture">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
                  <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
                  <feComponentTransfer in="gray" result="mask">
                    <feFuncA type="discrete" tableValues="0 0 0 0 0.15 0.3 0.5 0.7 0.85 1" />
                  </feComponentTransfer>
                  <feComposite in="SourceGraphic" in2="mask" operator="out" />
                </filter>
                {/* 裁剪圆形 */}
                <clipPath id="seal-clip">
                  <circle cx="60" cy="60" r="54" />
                </clipPath>
              </defs>

              {/* 底色 — 深色底 */}
              <circle cx="60" cy="60" r="56" fill="#0c0c0c" />

              {/* 外圈 — 朱砂红 */}
              <circle cx="60" cy="60" r="55" fill="none" stroke="url(#seal-red)" strokeWidth="3" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="url(#seal-red)" strokeWidth="1" opacity="0.6" />

              {/* 内圈 */}
              <circle cx="60" cy="60" r="46" fill="none" stroke="url(#seal-red)" strokeWidth="1.5" opacity="0.7" />

              {/* 十字格线 — 传统印章分格 */}
              <line x1="60" y1="16" x2="60" y2="104" stroke="url(#seal-red)" strokeWidth="1" opacity="0.35" />
              <line x1="16" y1="60" x2="104" y2="60" stroke="url(#seal-red)" strokeWidth="1" opacity="0.35" />

              {/* 四格篆书符号 — 抽象云纹 */}
              <g clipPath="url(#seal-clip)" fill="none" stroke="url(#seal-red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#seal-texture)">
                {/* 左上 — 回纹 */}
                <path d="M30 38 L30 28 L42 28 L42 38 L36 38" />
                <path d="M33 35 L33 31 L39 31 L39 35" />

                {/* 右上 — 云纹 */}
                <path d="M72 30 Q78 24 84 30 Q90 36 84 38 L78 38 Q72 38 72 32 Z" />
                <path d="M76 34 Q80 30 84 34" />

                {/* 左下 — 水纹 */}
                <path d="M26 76 Q32 70 38 76 Q44 82 50 76" />
                <path d="M28 82 Q34 76 40 82 Q46 88 52 82" />

                {/* 右下 — 山纹 */}
                <path d="M68 90 L76 72 L84 90" />
                <path d="M74 86 L80 74 L86 86" />
              </g>

              {/* 四角装饰点 */}
              <circle cx="60" cy="12" r="1.5" fill="url(#seal-red)" opacity="0.5" />
              <circle cx="60" cy="108" r="1.5" fill="url(#seal-red)" opacity="0.5" />
              <circle cx="12" cy="60" r="1.5" fill="url(#seal-red)" opacity="0.5" />
              <circle cx="108" cy="60" r="1.5" fill="url(#seal-red)" opacity="0.5" />
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
