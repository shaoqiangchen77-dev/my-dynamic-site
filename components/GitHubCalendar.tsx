'use client';
import { useEffect, useState } from 'react';

export default function GitHubCalendar({ username }: { username: string }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="scroll-reveal">
      <h3 className="title-md mb-4 text-center">GitHub 贡献</h3>
      <div className="glass p-4 overflow-x-auto">
        <img
          src={`https://ghchart.rshao.org/${username}`}
          alt="GitHub Contribution Chart"
          className="w-full min-w-[600px] opacity-80"
          style={{ filter: isDark ? 'invert(1) hue-rotate(180deg) brightness(1.2)' : 'brightness(0.9)' }}
        />
      </div>
    </div>
  );
}
