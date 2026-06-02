export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass p-8 max-w-2xl w-full rounded-2xl fade-in card-glow">
        <h1 className="text-3xl font-bold text-[var(--neon)] mb-4">关于我</h1>
        <p className="text-gray-700 dark:text-white/80 leading-relaxed mb-4">
          一名热爱编程、设计、创作的开发者，专注于现代 Web 开发、玻璃态设计、霓虹风格。
        </p>
        <div className="text-gray-600 dark:text-white/60 space-y-1">
          <p>• 前端开发：Next.js / React / Tailwind</p>
          <p>• 设计风格：Glassmorphism / Neon</p>
          <p>• 域名：banana007.xyz</p>
          <p>• Github：github.com/shaoqiangchen77-dev</p>
        </div>
      </div>
    </div>
  );
}