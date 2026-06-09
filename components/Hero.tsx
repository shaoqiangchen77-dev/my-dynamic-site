'use client';
import { useState, useEffect } from 'react';
import AvatarExplosion from './AvatarExplosion';

const socialLinks = [
  { name: 'GitHub', icon: 'GH', href: 'https://github.com' },
  { name: 'Twitter', icon: 'TW', href: 'https://twitter.com' },
  { name: 'Email', icon: '@', href: 'mailto:898532963@qq.com' },
  { name: 'Blog', icon: 'BG', href: '#articles' },
];

const fullText = '专注于 Java 生态与 Vue/UniApp 全端开发，深度使用 AI 编程工具提效';

function useTypewriter(text: string, speed = 50, delay = 800) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      const type = () => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
          timeout = setTimeout(type, speed);
        } else {
          setDone(true);
        }
      };
      type();
    }, delay);
    return () => { clearTimeout(start); clearTimeout(timeout); };
  }, [text, speed, delay]);

  return { displayed, done };
}

export default function Hero() {
  const { displayed, done } = useTypewriter(fullText, 40, 600);
  const { explode } = AvatarExplosion();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* 个人信息 */}
        <div className="glass card-hover float-2 p-8 flex flex-col items-center text-center md:items-start md:text-left">
          <div className="w-28 h-28 rounded-full glass-subtle flex items-center justify-center mb-6 overflow-hidden cursor-pointer" onClick={explode}>
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold" style={{ background: '#0a0a0a', color: '#d4a843' }}>
              尘
            </div>
          </div>
          <h1 className="title-xl mb-3">你好，我是 尘堑</h1>
          <p className="text-body text-lg leading-relaxed">
            Java 后端 / 前端开发 / AI Agent 探索者
          </p>
          <p className="text-muted mt-2 min-h-[1.75rem]">
            {displayed}
            <span className="inline-block w-0.5 h-4 ml-0.5 align-middle" style={{ background: 'var(--text-muted)', opacity: done ? 0 : 1, animation: 'blink 0.8s step-end infinite' }} />
          </p>
          <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
            {['Claude Code', 'Cursor', '扣子', 'Codex', 'Trae'].map((tool) => (
              <span key={tool} className="text-[10px] px-2 py-1 rounded-full" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', color: 'var(--text-muted)' }}>{tool}</span>
            ))}
          </div>
          {/* 向下滚动提示 */}
          <div className="mt-8 flex flex-col items-center animate-bounce">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>↓ 向下探索</span>
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
