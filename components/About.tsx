'use client';
import { useEffect, useRef } from 'react';

const skills = [
  { name: 'Java / Spring Boot', level: 90 },
  { name: 'Vue 3 / UniApp', level: 88 },
  { name: 'MySQL / Redis', level: 88 },
  { name: 'AI Agent / LLM', level: 75 },
  { name: 'Claude Code / Cursor / Trae', level: 90 },
  { name: 'TypeScript / Element Plus', level: 82 },
  { name: 'Docker / K8s', level: 70 },
];

const tags = ['Java 后端', '前端开发', 'AI Agent', '微服务架构', 'AI 编程提效', '系统设计'];

export default function About() {
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-bar-fill') as NodeListOf<HTMLElement>;
            fills.forEach((fill) => {
              const target = fill.dataset.level || '0';
              fill.style.width = target + '%';
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (barsRef.current) observer.observe(barsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="title-xl text-center mb-12 scroll-reveal">关于我</h2>
        <div className="glass card-hover float-2 p-8 scroll-reveal">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* 左侧：照片 */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-2xl glass-subtle flex items-center justify-center mb-4 overflow-hidden">
                <div className="w-44 h-44 rounded-xl flex items-center justify-center text-6xl font-bold" style={{ background: '#0a0a0a', color: '#d4a843' }}>
                  尘
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
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

            {/* 右侧：介绍 + 技能 */}
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

              <h3 className="title-md mb-4">技能</h3>
              <div ref={barsRef} className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm group-hover:text-white transition-colors" style={{ color: 'var(--text-body)' }}>{skill.name}</span>
                      <span className="text-xs font-mono tabular-nums" style={{ color: 'var(--text-muted)' }}>{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        data-level={skill.level}
                      />
                    </div>
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
