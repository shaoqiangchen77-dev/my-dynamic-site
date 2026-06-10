'use client';
import { useState, useEffect, useRef } from 'react';

interface Command {
  label: string;
  desc: string;
  action: () => void;
  icon: string;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    { label: '首页', desc: '回到顶部', icon: '🏠', action: () => { document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); } },
    { label: '文章', desc: '查看最新文章', icon: '📝', action: () => { document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); } },
    { label: '项目', desc: '查看开源项目', icon: '🏗️', action: () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); } },
    { label: '关于我', desc: '个人简介', icon: '👤', action: () => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); } },
    { label: '经历', desc: '工作经历', icon: '💼', action: () => { document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); } },
    { label: '日程表', desc: '查看工作日程', icon: '📅', action: () => { window.location.href = '/schedule'; setOpen(false); } },
    { label: '切换主题', desc: '循环切换 5 个主题', icon: '🎨', action: () => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 't' })); setOpen(false); } },
    { label: 'GitHub', desc: '查看 GitHub 主页', icon: '🔗', action: () => { window.open('https://github.com/shaoqiangchen77-dev', '_blank'); setOpen(false); } },
  ];

  const filtered = query
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()) || c.desc.includes(query))
    : commands;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
      {/* 背景遮罩 */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
      {/* 面板 */}
      <div
        className="glass relative w-full max-w-lg mx-4 overflow-hidden"
        style={{ animation: 'fade-in-up 0.15s ease' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 搜索框 */}
        <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--glass-border-subtle)' }}>
          <span style={{ color: 'var(--text-muted)' }}>⌘</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入命令或搜索..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: 'var(--text-primary)' }}
          />
          <kbd className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: 'var(--glass-bg-subtle)', border: '1px solid var(--glass-border-subtle)', color: 'var(--text-muted)' }}>
            ESC
          </kbd>
        </div>
        {/* 命令列表 */}
        <div className="max-h-64 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="text-center text-sm py-6" style={{ color: 'var(--text-muted)' }}>没有匹配的命令</p>
          ) : (
            filtered.map((cmd) => (
              <button
                key={cmd.label}
                onClick={cmd.action}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/5"
              >
                <span className="text-lg">{cmd.icon}</span>
                <div>
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{cmd.label}</span>
                  <span className="text-xs ml-2" style={{ color: 'var(--text-muted)' }}>{cmd.desc}</span>
                </div>
              </button>
            ))
          )}
        </div>
        {/* 底部提示 */}
        <div className="px-4 py-2 text-center" style={{ borderTop: '1px solid var(--glass-border-subtle)' }}>
          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            <kbd className="px-1 py-0.5 rounded" style={{ background: 'var(--glass-bg-subtle)', border: '1px solid var(--glass-border-subtle)' }}>↑↓</kbd> 导航
            <kbd className="px-1 py-0.5 rounded ml-2" style={{ background: 'var(--glass-bg-subtle)', border: '1px solid var(--glass-border-subtle)' }}>Enter</kbd> 确认
          </span>
        </div>
      </div>
    </div>
  );
}
