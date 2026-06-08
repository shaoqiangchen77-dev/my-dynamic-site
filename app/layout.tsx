import './globals.css';

export const metadata = {
  title: 'banana博客',
  description: '单页滚动式炫酷毛玻璃透明悬浮个人博客',
};

// 防止主题闪烁的内联脚本
const themeScript = `
(function(){
  var t=localStorage.getItem('theme')||'system';
  var d=document.documentElement;
  if(t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme:dark)').matches)){
    d.setAttribute('data-theme','dark');
  }else{
    d.setAttribute('data-theme','light');
  }
})()
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="bg-gradient-layer" />
        {children}
      </body>
    </html>
  );
}
