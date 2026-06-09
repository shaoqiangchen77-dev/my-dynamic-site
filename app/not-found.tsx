'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="glass p-12 text-center max-w-md">
        <div
          className="text-8xl font-bold mb-4"
          style={{ color: '#d4a843' }}
        >
          404
        </div>
        <p className="text-body text-lg mb-2">迷路了？</p>
        <p className="text-muted text-sm mb-8">
          你要找的页面似乎不存在，或者已经被移除。
        </p>
        <Link
          href="/"
          className="glass-btn inline-block py-3 px-8 text-center"
        >
          返回首页
        </Link>
      </div>
    </section>
  );
}
