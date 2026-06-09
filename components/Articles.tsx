'use client';

const articles = [
  {
    title: 'Spring Boot 3 微服务实战：从单体到分布式',
    summary: '记录将单体 Java 应用拆分为 Spring Cloud 微服务架构的完整过程，涵盖服务注册、配置中心、网关与链路追踪。',
    date: '2026-06-01',
    tags: ['Java', 'Spring Boot', '微服务'],
    cover: 'from-orange-500 to-red-500',
  },
  {
    title: 'Vue 3 + UniApp 跨端开发实战：一套代码多端运行',
    summary: '使用 Vue 3 + UniApp 实现 H5、微信小程序、App 三端统一开发，封装跨端组件库与条件编译最佳实践。',
    date: '2026-05-18',
    tags: ['Vue', 'UniApp', '小程序'],
    cover: 'from-green-500 to-emerald-500',
  },
  {
    title: '用 LangChain4j 构建 Java Agent 应用',
    summary: '基于 LangChain4j 框架，在 Java 生态中实现 RAG 检索增强生成、工具调用与多轮对话 Agent。',
    date: '2026-05-05',
    tags: ['Java', 'Agent', 'LLM'],
    cover: 'from-purple-500 to-pink-500',
  },
  {
    title: 'AI Agent 架构设计：从 ReAct 到 Multi-Agent',
    summary: '探索 Agent 的核心架构模式——ReAct、Plan-and-Execute、Multi-Agent 协作，以及在实际业务中的落地经验。',
    date: '2026-04-20',
    tags: ['Agent', 'AI', '架构'],
    cover: 'from-violet-500 to-indigo-500',
  },
  {
    title: 'JVM 性能调优：G1 到 ZGC 的演进之路',
    summary: '从 G1 到 ZGC，深入剖析各代垃圾回收器的原理与调优策略，解决线上 Full GC 频繁的痛点。',
    date: '2026-04-08',
    tags: ['Java', 'JVM', '性能'],
    cover: 'from-amber-500 to-orange-500',
  },
  {
    title: 'AI 编程工具深度横评：Cursor vs Claude Code vs Trae',
    summary: '实测对比三大 AI 编程工具在 Java 后端、Vue 前端、Agent 开发中的表现，分享提效 10 倍的工作流。',
    date: '2026-03-28',
    tags: ['AI 工具', 'Cursor', 'Claude Code'],
    cover: 'from-sky-500 to-blue-500',
  },
  {
    title: '用扣子 + Codex 打造自动化开发流水线',
    summary: '将扣子平台的 Agent 编排能力与 Codex 代码生成结合，实现需求分析、代码生成、测试用例的全自动流水线。',
    date: '2026-03-12',
    tags: ['扣子', 'Codex', '自动化'],
    cover: 'from-rose-500 to-pink-500',
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
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: 'var(--blue-tag-bg)',
                        color: 'var(--blue-tag-text)',
                        border: '1px solid var(--blue-tag-border)',
                      }}
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
