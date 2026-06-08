export default function PostDetail({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="glass p-8 max-w-3xl w-full rounded-2xl fade-in card-glow">
        <h1 className="text-3xl font-bold text-[var(--neon)] mb-4">文章 #{params.slug}</h1>
        <p className="text-gray-700 dark:text-white/80 leading-relaxed">
          这里是文章内容，支持 Markdown、代码块、图片、霓虹样式。
        </p>
      </div>
    </div>
  );
}