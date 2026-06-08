'use client';

const articles = [
  {
    title: '使用 Next.js 构建现代化博客',
    summary: '探索如何使用 Next.js 的最新特性来构建一个高性能、SEO 友好的个人博客系统。',
    date: '2026-06-01',
    tags: ['Next.js', 'React'],
    cover: 'from-purple-500 to-blue-500',
  },
  {
    title: 'CSS Glassmorphism 设计指南',
    summary: '深入了解毛玻璃设计风格的原理、实现方法和最佳实践，打造通透高级的 UI 界面。',
    date: '2026-05-20',
    tags: ['CSS', 'Design'],
    cover: 'from-pink-500 to-purple-500',
  },
  {
    title: 'TypeScript 高级类型技巧',
    summary: '掌握 TypeScript 的高级类型系统，包括条件类型、映射类型和模板字面量类型。',
    date: '2026-05-10',
    tags: ['TypeScript'],
    cover: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Web 性能优化实战',
    summary: '从加载速度、渲染性能、交互响应三个维度，全面提升 Web 应用的用户体验。',
    date: '2026-04-28',
    tags: ['Performance', 'Web'],
    cover: 'from-green-500 to-blue-500',
  },
];

export default function Articles() {
  return (
    <section id="articles" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="title-xl text-center mb-12 scroll-reveal">最新文章</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <article
              key={article.title}
              className={`glass card-hover float-${(i % 4) + 1} scroll-reveal overflow-hidden`}
            >
              {/* 封面 */}
              <div className={`h-40 bg-gradient-to-br ${article.cover} rounded-t-2xl`} />
              <div className="p-6">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-blue-400/20 text-blue-200 border border-blue-300/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="title-md mb-2">{article.title}</h3>
                <p className="text-body text-sm leading-relaxed mb-3">{article.summary}</p>
                <span className="text-muted text-xs">{article.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
