'use client';
import { useEffect } from 'react';

/**
 * 滚动视差效果
 * 给带有 data-parallax 属性的元素添加视差滚动
 */
export default function ParallaxSection() {
  useEffect(() => {
    const sections = document.querySelectorAll('[data-parallax]');
    if (sections.length === 0) return;

    function onScroll() {
      const scrollY = window.scrollY;
      sections.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.parallax || '0.1');
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
        (el as HTMLElement).style.transform = `translateY(${offset}px)`;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
