export default function Posts() {
  const posts = [
    { slug: '1', title: 'Next.js 部署教程', desc: 'Vercel + GitHub 一键上线' },
    { slug: '2', title: 'Tailwind 玻璃效果', desc: '毛玻璃 + 霓虹实现' },
    { slug: '3', title: '个人域名绑定', desc: 'Vercel 绑定自定义域名' },
  ];

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[var(--neon)] mb-8 text-center fade-in">文章列表</h1>
      <div className="grid gap-6">
        {posts.map((p) => (
          <div key={p.slug} className="card-glow glass p-6 rounded-xl fade-in">
            <h2 className="text-xl font-bold text-[var(--neon)]">{p.title}</h2>
            <p className="text-gray-600 dark:text-white/70 mt-1">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}