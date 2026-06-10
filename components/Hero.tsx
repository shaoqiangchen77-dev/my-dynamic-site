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
              style={{ filter: 'drop-shadow(0 0 12px rgba(212,168,67,0.25))' }}
            >
              <defs>
                {/* 金色渐变 */}
                <linearGradient id="seal-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#c9952a" />
                  <stop offset="25%" stop-color="#e8c56d" />
                  <stop offset="50%" stop-color="#f5e09a" />
                  <stop offset="75%" stop-color="#d4a843" />
                  <stop offset="100%" stop-color="#a07828" />
                </linearGradient>
                {/* 深金渐变 — 立体感 */}
                <linearGradient id="seal-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#8b6914" />
                  <stop offset="50%" stop-color="#b8922e" />
                  <stop offset="100%" stop-color="#7a5c12" />
                </linearGradient>
                {/* 内发光 */}
                <radialGradient id="seal-glow" cx="50%" cy="45%" r="45%">
                  <stop offset="0%" stop-color="#f5e09a" stop-opacity="0.12" />
                  <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0" />
                </radialGradient>
                {/* 圆形印章裁剪 */}
                <clipPath id="seal-clip">
                  <circle cx="60" cy="60" r="54" />
                </clipPath>
              </defs>

              {/* 底色 */}
              <circle cx="60" cy="60" r="56" fill="#0c0c0c" />

              {/* 外圈 — 回纹边框 */}
              <circle cx="60" cy="60" r="55" fill="none" stroke="url(#seal-gold)" strokeWidth="2" opacity="0.8" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="url(#seal-gold)" strokeWidth="0.8" opacity="0.4" />
              {/* 内圈 */}
              <circle cx="60" cy="60" r="46" fill="none" stroke="url(#seal-gold)" strokeWidth="1.2" opacity="0.5" />
              <circle cx="60" cy="60" r="43" fill="none" stroke="url(#seal-gold)" strokeWidth="0.5" opacity="0.25" />

              {/* 四角装饰点 — 传统印钮 */}
              <circle cx="60" cy="10" r="2" fill="url(#seal-gold)" opacity="0.6" />
              <circle cx="60" cy="110" r="2" fill="url(#seal-gold)" opacity="0.6" />
              <circle cx="10" cy="60" r="2" fill="url(#seal-gold)" opacity="0.6" />
              <circle cx="110" cy="60" r="2" fill="url(#seal-gold)" opacity="0.6" />

              {/* 内部光晕 */}
              <circle cx="60" cy="60" r="46" fill="url(#seal-glow)" />

              {/* 尘字 — 篆书风格 SVG 描边 */}
              <g clipPath="url(#seal-clip)">
                {/* 上部 "小" — 三笔撇捺竖 */}
                {/* 竖钩 */}
                <path
                  d="M60 22 L60 52"
                  stroke="url(#seal-gold)" strokeWidth="3.5" strokeLinecap="round" fill="none"
                />
                {/* 左撇 */}
                <path
                  d="M60 28 Q52 32 42 40"
                  stroke="url(#seal-gold)" strokeWidth="3" strokeLinecap="round" fill="none"
                />
                {/* 右捺 */}
                <path
                  d="M60 28 Q68 32 78 40"
                  stroke="url(#seal-gold)" strokeWidth="3" strokeLinecap="round" fill="none"
                />
                {/* 左点 */}
                <path
                  d="M48 38 Q44 42 42 47"
                  stroke="url(#seal-gold)" strokeWidth="2.5" strokeLinecap="round" fill="none"
                />
                {/* 右点 */}
                <path
                  d="M72 38 Q76 42 78 47"
                  stroke="url(#seal-gold)" strokeWidth="2.5" strokeLinecap="round" fill="none"
                />

                {/* 下部 "土" — 横竖横 */}
                {/* 上横 */}
                <path
                  d="M38 60 L82 60"
                  stroke="url(#seal-gold)" strokeWidth="3.5" strokeLinecap="round" fill="none"
                />
                {/* 竖 */}
                <path
                  d="M60 52 L60 92"
                  stroke="url(#seal-gold)" strokeWidth="3.5" strokeLinecap="round" fill="none"
                />
                {/* 下横 — 篆书风格加长，微微上弧 */}
                <path
                  d="M32 85 Q60 80 88 85"
                  stroke="url(#seal-gold)" strokeWidth="4" strokeLinecap="round" fill="none"
                />
              </g>

              {/* 顶部光泽 — 模拟金属高光 */}
              <ellipse cx="60" cy="30" rx="30" ry="12" fill="url(#seal-glow)" opacity="0.3" />
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
