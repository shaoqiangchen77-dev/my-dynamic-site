'use client';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: 接入实际的表单提交逻辑
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="title-xl text-center mb-12 scroll-reveal">留言板</h2>
        <div className="glass card-hover float-1 p-8 scroll-reveal">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>姓名</label>
              <input
                type="text"
                placeholder="请输入你的姓名"
                className="glass-input w-full px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>邮箱</label>
              <input
                type="email"
                placeholder="请输入你的邮箱"
                className="glass-input w-full px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>留言内容</label>
              <textarea
                placeholder="写下你想说的话..."
                rows={5}
                className="glass-input w-full px-4 py-3 resize-none"
              />
            </div>
            <button
              type="submit"
              className="glass-btn w-full py-3 px-6 text-center"
            >
              {submitted ? '✓ 已提交，感谢留言！' : '提交留言'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
