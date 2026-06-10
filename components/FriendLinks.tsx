'use client';

const friends = [
  { name: 'Vue.js', desc: '渐进式 JavaScript 框架', url: 'https://vuejs.org', icon: '💚' },
  { name: 'Spring', desc: 'Java 企业级开发框架', url: 'https://spring.io', icon: '🍃' },
  { name: 'LangChain', desc: 'LLM 应用开发框架', url: 'https://langchain.com', icon: '🦜' },
  { name: 'UniApp', desc: '跨端应用开发框架', url: 'https://uniapp.dcloud.net.cn', icon: '📱' },
  { name: 'Claude', desc: 'Anthropic AI 助手', url: 'https://claude.ai', icon: '🤖' },
  { name: 'Cursor', desc: 'AI 驱动的代码编辑器', url: 'https://cursor.sh', icon: '⚡' },
];

export default function FriendLinks() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="title-md mb-6 text-center scroll-reveal">推荐资源</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {friends.map((f, i) => (
            <a
              key={f.name}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass card-hover float-${(i % 4) + 1} scroll-reveal p-4 flex items-start gap-3`}
            >
              <span className="text-2xl">{f.icon}</span>
              <div>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{f.name}</span>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
