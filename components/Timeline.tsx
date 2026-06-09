'use client';

const experiences = [
  {
    period: '2024 - 至今',
    title: '高级 Java 开发工程师',
    company: '某科技公司',
    desc: '负责核心业务系统架构设计与开发，主导微服务拆分与性能优化，引入 AI Agent 能力赋能业务。',
    tags: ['Java', '微服务', 'Agent'],
  },
  {
    period: '2022 - 2024',
    title: '全栈开发工程师',
    company: '某互联网公司',
    desc: '独立负责多个项目的前后端开发，使用 Vue + UniApp 实现跨端应用，搭建企业级中后台系统。',
    tags: ['Vue', 'UniApp', 'Spring Boot'],
  },
  {
    period: '2021 - 2022',
    title: 'Java 初级开发',
    company: '某软件公司',
    desc: '参与企业级 SaaS 产品开发，学习 Java 生态与前端技术栈，积累工程化开发经验。',
    tags: ['Java', '前端', 'MySQL'],
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="title-xl text-center mb-12 scroll-reveal">工作经历</h2>
        <div className="relative">
          {/* 竖线 */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'var(--glass-border)' }}
          />
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`scroll-reveal relative flex flex-col md:flex-row items-start mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* 时间点 */}
              <div
                className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-6"
                style={{ background: '#d4a843', boxShadow: '0 0 8px rgba(212,168,67,0.4)' }}
              />
              {/* 卡片 */}
              <div className={`ml-12 md:ml-0 md:w-[46%] ${i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                <div className="glass card-hover p-6">
                  <span className="text-xs px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', color: 'var(--text-muted)' }}>
                    {exp.period}
                  </span>
                  <h3 className="title-md mt-2">{exp.title}</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{exp.company}</p>
                  <p className="text-body text-sm leading-relaxed mt-3">{exp.desc}</p>
                  <div className="flex gap-2 flex-wrap mt-3">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--blue-tag-bg)', color: 'var(--blue-tag-text)', border: '1px solid var(--blue-tag-border)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
