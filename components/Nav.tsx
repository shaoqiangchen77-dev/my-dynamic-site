'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  const items = [
    { name: '首页', href: '/' },
    { name: '关于', href: '/about' },
    { name: '文章', href: '/posts' },
    { name: '联系', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-[var(--neon)]">
          Banana Blog
        </Link>
        <div className="flex gap-5">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-1 ${
                pathname === item.href
                  ? 'text-[var(--neon)]'
                  : 'text-gray-600 dark:text-white/70 hover:text-[var(--neon)]'
              }`}
            >
              {item.name}
              {pathname === item.href && (
                <div className="absolute -bottom-1 w-full h-[2px] bg-[var(--neon)]" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}