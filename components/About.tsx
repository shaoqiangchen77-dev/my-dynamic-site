'use client';
import SkillRadar from './SkillRadar';

const tags = ['Java 后端', '前端开发', 'AI Agent', '微服务架构', 'AI 编程提效', '系统设计'];

export default function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="title-xl text-center mb-12 scroll-reveal">关于我</h2>
        <div className="glass card-hover float-2 p-8 scroll-reveal">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* 左侧：雷达图 + 标签 */}
            <div className="flex flex-col items-center">
              <SkillRadar />
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="skill-tag text-xs px-3 py-1.5 rounded-full cursor-default"
                    style={{
                      background: 'var(--glass-bg-subtle)',
                      border: '1px solid var(--glass-border-subtle)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 右侧：介绍 */}
            <div>
              <h3 className="title-md mb-4">个人简介</h3>
              <p className="text-body text-sm leading-relaxed mb-6">
                我是一名 Java 后端开发者，同时深耕前端工程化与 AI Agent 领域。
                后端方面，熟练掌握 Spring Boot、微服务架构、JVM 调优与数据库优化；
                前端方面，擅长 Vue 3、UniApp、TypeScript，实现 H5/小程序/App 跨端开发；
                Agent 方向，积极探索 LLM 应用、RAG、工具调用与多智能体协作。
                日常深度使用 Claude Code、Cursor、Trae、扣子、Codex 等 AI 编程工具，
                将 AI 融入开发全流程，显著提升编码效率与代码质量。
                三大技术栈交叉融合，致力于打造端到端的智能化产品。
              </p>

              <h3 className="title-md mb-4">技术栈</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Java / Spring Boot', level: '90%' },
                  { label: 'Vue 3 / UniApp', level: '88%' },
                  { label: 'MySQL / Redis', level: '88%' },
                  { label: 'AI Agent / LLM', level: '75%' },
                  { label: 'Claude Code / Cursor', level: '90%' },
                  { label: 'Docker / K8s', level: '70%' },
                ].map((s) => (
                  <div key={s.label} className="glass-subtle px-3 py-2 rounded-lg flex justify-between items-center">
                    <span className="text-xs" style={{ color: 'var(--text-body)' }}>{s.label}</span>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{s.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
