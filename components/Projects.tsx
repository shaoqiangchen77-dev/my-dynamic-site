'use client';

const projects = [
  {
    name: 'Glass UI Kit',
    description: '一套基于 Glassmorphism 设计风格的 UI 组件库，支持主题定制和响应式布局。',
    tech: ['React', 'TypeScript', 'Tailwind'],
    cover: 'from-violet-500 to-fuchsia-500',
    github: 'https://github.com',
    demo: '#',
  },
  {
    name: 'DevFlow CLI',
    description: '开发者工作流自动化工具，集成代码生成、部署、监控等常用功能。',
    tech: ['Node.js', 'CLI', 'Shell'],
    cover: 'from-cyan-500 to-blue-500',
    github: 'https://github.com',
    demo: '#',
  },
  {
    name: 'Markdown Note',
    description: '极简风格的在线 Markdown 笔记应用，支持实时预览、标签管理和云同步。',
    tech: ['Vue', 'Firebase', 'PWA'],
    cover: 'from-amber-500 to-orange-500',
    github: 'https://github.com',
    demo: '#',
  },
  {
    name: 'Pixel Art Editor',
    description: '基于 Canvas 的像素画编辑器，支持图层管理、动画导出和调色板自定义。',
    tech: ['Canvas', 'JavaScript', 'WebAPI'],
    cover: 'from-emerald-500 to-teal-500',
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
