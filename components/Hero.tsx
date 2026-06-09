'use client';

const socialLinks = [
  { name: 'GitHub', icon: 'GH', href: 'https://github.com' },
  { name: 'Twitter', icon: 'TW', href: 'https://twitter.com' },
  { name: 'Email', icon: '@', href: 'mailto:898532963@qq.com' },
  { name: 'Blog', icon: 'BG', href: '#articles' },
];

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* 个人信息 */}
        <div className="glass card-hover float-2 p-8 flex flex-col items-center text-center md:items-start md:text-left">
          {/* 头像 */}
          <div className="w-28 h-28 rounded-full glass-subtle flex items-center justify-center mb-6 overflow-hidden">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-4xl font-bold text-white">
              尘
            </div>
          </div>
          <h1 className="title-xl mb-3">你好，我是 尘堑</h1>
          <p className="text-body text-lg leading-relaxed">
            Java 后端 / 前端开发 / AI Agent 探索者
          </p>
          <p className="text-muted mt-2">
            专注于 Java 生态与 Vue/UniApp 全端开发，深度使用 AI 编程工具提效
          </p>
          <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
            {['Claude Code', 'Cursor', '扣子', 'Codex', 'Trae'].map((tool) => (
              <span key={tool} className="text-[10px] px-2 py-1 rounded-full" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', color: 'var(--text-muted)' }}>{tool}</span>
            ))}
          </div>
        </div>

        {/* 社交链接 */}
        <div className="glass card-hover float-3 p-8">
          <h2 className="title-md mb-6 text-center">联系我</h2>
          <div className="grid grid-cols-2 gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-subtle social-icon p-4 flex flex-col items-center gap-2 rounded-xl"
              >
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ background: 'var(--glass-bg-subtle)', color: 'var(--text-primary)' }}
                >
                  {link.icon}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
