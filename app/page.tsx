// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center gap-8">
      {/* 大字 */}
      <h1 className="text-5xl md:text-7xl font-bold text-red-600 text-center">
        李金茜是个大笨蛋
      </h1>

      <div className="glass p-8 max-w-2xl w-full rounded-2xl fade-in text-center">
        <h2 className="text-3xl font-bold mb-4">欢迎来到我的动态网站</h2>
        <p className="text-lg opacity-90">
          这是用 Next.js + TypeScript + Tailwind CSS 搭建的个人网站
        </p>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/about" className="glass px-6 py-3 rounded-xl hover:scale-105 transition">
          关于我
        </Link>
        <Link href="/posts" className="glass px-6 py-3 rounded-xl hover:scale-105 transition">
          文章列表
        </Link>
        <Link href="/contact" className="glass px-6 py-3 rounded-xl hover:scale-105 transition">
          联系我
        </Link>
      </div>
    </main>
  );
}