'use client';
import { useEffect } from 'react';

/**
 * 全局滚动入场动画控制器
 * 监听所有 .scroll-reveal 元素，进入可视区域时添加 .visible 类
 */
export default function ScrollReveal() {
  useEffect(() => {
    let revealIndex = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = revealIndex * 50;
            revealIndex++;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // 延迟一帧确保 DOM 已渲染
    requestAnimationFrame(() => {
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
