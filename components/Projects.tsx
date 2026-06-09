'use client';

const projects = [
  {
    name: 'SmartBoot',
    description: '基于 Spring Boot 3 的快速开发脚手架，内置多租户、权限管理、代码生成、接口文档等企业级能力。',
    tech: ['Java', 'Spring Boot', 'MyBatis Plus'],
    cover: 'from-orange-500 to-red-500',
    github: 'https://github.com',
    demo: '#',
  },
  {
    name: 'AgentForge',
    description: 'Java 版 AI Agent 开发框架，支持 ReAct / Plan-and-Execute 模式，内置工具注册、记忆管理与多 Agent 编排。全程使用 Claude Code + Cursor 辅助开发。',
    tech: ['Java', 'LangChain4j', 'Claude Code', 'Cursor'],
    cover: 'from-purple-500 to-pink-500',
    github: 'https://github.com',
    demo: '#',
  },
  {
    name: 'NovaUI',
    description: '基于 Vue 3 + UniApp 的跨端组件库，提供 80+ 高质量组件，一套代码适配 H5、小程序与 App。',
    tech: ['Vue 3', 'UniApp', 'TypeScript'],
    cover: 'from-green-500 to-emerald-500',
    github: 'https://github.com',
    demo: '#',
  },
  {
    name: 'DevPilot',
    description: 'AI 驱动的开发助手平台，集成扣子 Agent 编排 + Codex 代码生成，实现从需求文档到可运行代码的一键转化。',
    tech: ['扣子', 'Codex', 'Java', 'Vue 3'],
    cover: 'from-sky-500 to-indigo-500',
    github: 'https://github.com',
    demo: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="title-xl text-center mb-12 scroll-reveal">开源项目</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className={`glass card-hover float-${(i % 4) + 1} scroll-reveal overflow-hidden`}
            >
              {/* 项目截图 */}
              <div className={`h-40 bg-gradient-to-br ${project.cover} rounded-t-2xl`} />
              <div className="p-6">
                <h3 className="title-md mb-2">{project.name}</h3>
                <p className="text-body text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: 'var(--purple-tag-bg)',
                        color: 'var(--purple-tag-text)',
                        border: '1px solid var(--purple-tag-border)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors"
                    style={{ color: 'var(--link-github)' }}
                  >
                    GitHub →
                  </a>
                  <a
                    href={project.demo}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--link-demo)' }}
                  >
                    演示 →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
