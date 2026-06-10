'use client';

const badges = [
  { icon: '⭐', label: 'GitHub Star 500+', desc: '开源项目累计 Star' },
  { icon: '🏗️', label: '4 个开源项目', desc: '独立维护的开源项目' },
  { icon: '☕', label: 'Java 5 年', desc: 'Java 开发经验' },
  { icon: '🤖', label: 'AI Agent 先锋', desc: '深度使用 LLM 与 Agent' },
  { icon: '🔧', label: '全栈工程师', desc: '前后端 + 运维全覆盖' },
  { icon: '🚀', label: '效能达人', desc: 'AI 工具提效 10 倍' },
  { icon: '🐳', label: '容器化部署', desc: 'Docker / K8s 生产实践' },
  { icon: '📱', label: '跨端开发', desc: 'H5 / 小程序 / App 三端统一' },
];

export default function BadgeWall() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="title-md mb-8 text-center scroll-reveal">里程碑</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, i) => (
            <div
              key={badge.label}
              className={`glass card-hover float-${(i % 4) + 1} scroll-reveal p-5 flex flex-col items-center text-center gap-2`}
            >
              <span className="text-3xl">{badge.icon}</span>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{badge.label}</span>
              <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{badge.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
