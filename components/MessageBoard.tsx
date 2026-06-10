'use client';
import { useState, useEffect } from 'react';

interface Message {
  name: string;
  content: string;
  time: string;
}

const STORAGE_KEY = 'guest-messages';

function loadMessages(): Message[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveMessages(msgs: Message[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
}

export default function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setMessages(loadMessages());
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    const newMsg: Message = {
      name: name.trim(),
      content: content.trim(),
      time: new Date().toLocaleString('zh-CN'),
    };
    const updated = [newMsg, ...messages].slice(0, 20); // 最多保留20条
    setMessages(updated);
    saveMessages(updated);
    setName('');
    setContent('');
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  }

  return (
    <section id="messages" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h3 className="title-md mb-6 text-center scroll-reveal">访客留言</h3>
        <div className="glass p-6 scroll-reveal">
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="你的名字"
              className="glass-input px-3 py-2 text-sm"
              style={{ width: '100px' }}
              maxLength={20}
            />
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="说点什么..."
              className="glass-input flex-1 px-3 py-2 text-sm"
              maxLength={100}
            />
            <button type="submit" className="glass-btn px-4 py-2 text-sm whitespace-nowrap">
              {sent ? '✓' : '发送'}
            </button>
          </form>

          {messages.length === 0 ? (
            <p className="text-center text-sm py-4" style={{ color: 'var(--text-muted)' }}>
              还没有留言，来写第一条吧 ~
            </p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="glass-subtle p-3 rounded-xl"
                  style={{ animation: i === 0 && sent ? 'fade-in-up 0.3s ease' : undefined }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{msg.name}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{msg.time}</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-body)' }}>{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
