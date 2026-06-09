'use client';

export default function AvatarExplosion() {
  function explode(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      const angle = (Math.PI * 2 * i) / 20;
      const dist = 40 + Math.random() * 60;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      const size = 4 + Math.random() * 6;
      const color = ['#d4a843', '#a855f7', '#38bdf8', '#f093fb', '#4facfe'][Math.floor(Math.random() * 5)];

      particle.style.cssText = `
        position:fixed;left:${cx}px;top:${cy}px;
        width:${size}px;height:${size}px;
        border-radius:50%;background:${color};
        z-index:999;pointer-events:none;
        animation:particle-burst 0.8s ease-out forwards;
        --tx:${tx}px;--ty:${ty}px;
      `;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 900);
    }
  }

  return { explode };
}
