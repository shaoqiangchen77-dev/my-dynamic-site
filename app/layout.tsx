import './globals.css';
import RainEffect from '@/components/RainEffect';
import TwinkleStars from '@/components/TwinkleStars';
import CardRefraction from '@/components/CardRefraction';

export const metadata = {
  title: 'banana博客',
  description: '单页滚动式炫酷毛玻璃透明悬浮个人博客',
  icons: {
    icon: '/favicon.svg',
  },
};

// 防止主题闪烁的内联脚本
const themeScript = `
(function(){
  var t=localStorage.getItem('theme')||'system';
  var d=document.documentElement;
  if(t==='system'){
    d.setAttribute('data-theme',matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
  }else{
    d.setAttribute('data-theme',t);
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
        <div className="galaxy-glow" />
        <RainEffect />
        <TwinkleStars />
        <CardRefraction />
        {children}
      </body>
    </html>
  );
}
