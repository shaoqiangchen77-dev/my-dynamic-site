'use client';
import { useState, useEffect } from 'react';

// 网站上线日期，改成你实际的日期
const SITE_LAUNCH = new Date('2026-01-01');

function calcUptime() {
  const now = new Date();
  const diff = now.getTime() - SITE_LAUNCH.getTime();
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function SiteUptime() {
  const [uptime, setUptime] = useState(calcUptime);

  useEffect(() => {
    const timer = setInterval(() => setUptime(calcUptime()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex items-center gap-1 text-xs">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      已运行 {uptime.days}天 {String(uptime.hours).padStart(2, '0')}:
      {String(uptime.minutes).padStart(2, '0')}:
      {String(uptime.seconds).padStart(2, '0')}
    </span>
  );
}
