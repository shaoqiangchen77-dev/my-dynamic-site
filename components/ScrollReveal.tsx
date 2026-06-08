'use client';
import { useEffect } from 'react';

/**
 * 全局滚动入场动画控制器
 * 监听所有 .scroll-reveal 元素，进入可视区域时添加 .visible 类
 */
export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // 错落延迟：每个元素递增 100ms
            const delay = index * 100;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
