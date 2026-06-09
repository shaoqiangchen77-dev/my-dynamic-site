'use client';
import { useState, useEffect } from 'react';

const quotes = [
  'Talk is cheap. Show me the code. — Linus Torvalds',
  '任何足够先进的技术，都与魔法无异。 — Arthur C. Clarke',
  '先让它能用，再让它好用，最后让它快。 — Kent Beck',
  '简单是可靠的前提。 — Edsger W. Dijkstra',
  '过早优化是万恶之源。 — Donald Knuth',
  '代码是写给人看的，顺便让机器执行。 — Harold Abelson',
  '没有银弹。 — Fred Brooks',
  '好的设计是尽可能少的设计。 — Dieter Rams',
];

export default function QuoteRotator() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const quote = quotes[index];
    let i = 0;
    setDisplayed('');
    setTyping(true);

    const typeTimer = setInterval(() => {
      if (i < quote.length) {
        setDisplayed(quote.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeTimer);
        setTyping(false);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % quotes.length);
        }, 4000);
      }
    }, 45);

    return () => clearInterval(typeTimer);
  }, [index]);

  return (
    <div className="py-8 px-6">
      <div className="max-w-3xl mx-auto text-center glass-subtle py-5 px-8 rounded-full">
        <p className="text-sm italic" style={{ color: 'var(--text-muted)', minHeight: '1.25rem' }}>
          {displayed}
          <span
            className="inline-block w-0.5 h-3.5 ml-0.5 align-middle"
            style={{ background: 'var(--text-muted)', opacity: typing ? 1 : 0, animation: 'blink 0.8s step-end infinite' }}
          />
        </p>
      </div>
    </div>
  );
}
