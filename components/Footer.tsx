export default function Footer() {
  return (
    <footer className="py-8 px-6">
      <div className="glass-subtle max-w-6xl mx-auto py-6 px-8 text-center">
        <p className="text-muted text-sm">
          © {new Date().getFullYear()} GlassBlog. All rights reserved.
        </p>
        <p className="text-muted text-xs mt-2">
          基于 Next.js 构建 · Glassmorphism 设计风格
        </p>
      </div>
    </footer>
  );
}
