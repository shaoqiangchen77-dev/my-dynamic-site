'use client';
import { useEffect, useRef } from 'react';

const skills = [
  { name: 'React / Next.js', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'CSS / Tailwind', level: 88 },
  { name: 'Python', level: 70 },
];

const tags = ['前端开发', '后端开发', 'UI 设计', '开源贡献', '技术写作', '敏捷开发'];

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
                <div className="w-44 h-44 rounded-xl bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center text-6xl font-bold text-white">
                  G
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="skill-tag text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80 border border-white/20 cursor-default"
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
                我是一名热爱技术的全栈开发者，拥有多年的 Web 开发经验。
                擅长使用 React、Next.js、TypeScript 等现代技术栈构建高性能应用。
                热衷于开源社区，喜欢探索新技术并分享学习心得。
              </p>

              <h3 className="title-md mb-4">技能</h3>
              <div ref={barsRef} className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white/80">{skill.name}</span>
                      <span className="text-xs text-white/60">{skill.level}%</span>
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
