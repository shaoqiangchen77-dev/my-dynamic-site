import './globals.css';
import Nav from '@/components/Nav';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata = {
  title: 'Banana Blog',
  description: '白橙 / 黑绿 双主题玻璃博客',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <Nav />
        <div className="pt-20">{children}</div>
        <ThemeToggle />
      </body>
    </html>
  );
}