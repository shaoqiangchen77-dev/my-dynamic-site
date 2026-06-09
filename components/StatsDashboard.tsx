'use client';
import AnimatedCounter from './AnimatedCounter';

const stats = [
  { label: '文章', value: 8, icon: '📄', suffix: '篇' },
  { label: '项目', value: 4, icon: '🚀', suffix: '个' },
  { label: '经验', value: 3, icon: '⏳', suffix: '年' },
  { label: '技术栈', value: 6, icon: '⚡', suffix: '项' },
];

export default function StatsDashboard() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass p-5 text-center scroll-reveal">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold" style={{ color: '#d4a843' }}>
              <AnimatedCounter end={s.value} suffix={s.suffix} />
            </div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
