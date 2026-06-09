'use client';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();

    const newErrors: typeof errors = {};
    if (!name) newErrors.name = '请输入姓名';
    if (!email) newErrors.email = '请输入邮箱';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = '邮箱格式不正确';
    if (!message) newErrors.message = '请输入留言内容';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // TODO: 接入实际的表单提交逻辑
    setSubmitted(true);
    form.reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="title-xl text-center mb-12 scroll-reveal">留言板</h2>
        <div className="glass card-hover float-1 p-8 scroll-reveal">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>姓名</label>
              <input
                type="text"
                name="name"
                placeholder="请输入你的姓名"
                className="glass-input w-full px-4 py-3"
              />
              {errors.name && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>邮箱</label>
              <input
                type="email"
                name="email"
                placeholder="请输入你的邮箱"
                className="glass-input w-full px-4 py-3"
              />
              {errors.email && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>留言内容</label>
              <textarea
                name="message"
                placeholder="写下你想说的话..."
                rows={5}
                className="glass-input w-full px-4 py-3 resize-none"
              />
              {errors.message && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.message}</p>}
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
