// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen px-4 py-10 md:py-16">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* 主悬浮卡片（干净玻璃、无绿框） */}
        <section className="glass p-6 md:p-10 rounded-xl shadow-lg card-glow fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            欢迎来到主页
          </h1>
          <p className="text-base md:text-lg opacity-80 leading-relaxed">
            这里是和其他页面风格统一的悬浮玻璃卡片，
            没有大绿霓虹边框，只有柔和阴影、圆角和磨砂质感。
          </p>
        </section>

        {/* 内容卡片 1 */}
        <section className="glass p-6 rounded-xl shadow-md card-glow fade-in">
          <h2 className="text-xl font-semibold mb-2">功能介绍</h2>
          <p className="opacity-80">
            白天模式（白橙）、黑夜模式（深色）、跟随系统，
            平滑滚动 + 滚动渐入动画，风格统一。
          </p>
        </section>

        {/* 内容卡片 2 */}
        <section className="glass p-6 rounded-xl shadow-md card-glow fade-in">
          <h2 className="text-xl font-semibold mb-2">关于本站</h2>
          <p className="opacity-80">
            全站统一悬浮玻璃风格，干净、简约、现代，
            所有页面布局一致，不再有突兀的大绿框。
          </p>
        </section>

      </div>
    </main>
  );
}