import './globals.css';

export const metadata = {
  title: 'Glassmorphism Blog',
  description: '单页滚动式炫酷毛玻璃透明悬浮个人博客',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="bg-gradient-layer" />
        {children}
      </body>
    </html>
  );
}
