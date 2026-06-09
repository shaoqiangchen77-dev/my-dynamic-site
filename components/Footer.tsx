import SiteUptime from './SiteUptime';

const links = [
  { name: 'GitHub', href: 'https://github.com/shaoqiangchen77-dev' },
  { name: '日程表', href: '/schedule' },
];

export default function Footer() {
  return (
    <footer className="py-8 px-6">
      <div className="glass-subtle max-w-6xl mx-auto py-6 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">
            大人虎变，其文炳也；君子豹变，其文蔚也；小人革面，顺以从君也。
          </p>
          <div className="flex gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-xs transition-colors hover:underline"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-4 pt-4 text-center" style={{ borderTop: '1px solid var(--glass-border-subtle)' }}>
          <p className="text-muted text-xs">
            <SiteUptime />
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
            © 2026 尘堑 · Powered by Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
