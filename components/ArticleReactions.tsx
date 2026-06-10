'use client';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'article-reactions';

function loadReactions(): Record<string, Record<string, number>> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveReactions(data: Record<string, Record<string, number>>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function ArticleReactions({ articleId }: { articleId: string }) {
  const [reactions, setReactions] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<Set<string>>(new Set());

  useEffect(() => {
    const all = loadReactions();
    setReactions(all[articleId] || {});
    // 已投票的记录
    const votedSet = new Set<string>();
    const votedKey = `voted-${articleId}`;
    try {
      const v = JSON.parse(localStorage.getItem(votedKey) || '[]');
      v.forEach((r: string) => votedSet.add(r));
    } catch {}
    setVoted(votedSet);
  }, [articleId]);

  function react(emoji: string) {
    if (voted.has(emoji)) return;
    const newReactions = { ...reactions, [emoji]: (reactions[emoji] || 0) + 1 };
    setReactions(newReactions);
    const newVoted = new Set(voted);
    newVoted.add(emoji);
    setVoted(newVoted);

    const all = loadReactions();
    all[articleId] = newReactions;
    saveReactions(all);
    try {
      localStorage.setItem(`voted-${articleId}`, JSON.stringify([...newVoted]));
    } catch {}
  }

  const emojis = ['👍', '❤️', '🔥', '🎉'];

  return (
    <div className="flex gap-1.5">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => react(emoji)}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-all"
          style={{
            background: voted.has(emoji) ? 'var(--accent-soft)' : 'var(--glass-bg-subtle)',
            border: `1px solid ${voted.has(emoji) ? 'var(--accent-border)' : 'var(--glass-border-subtle)'}`,
            opacity: voted.has(emoji) ? 1 : 0.7,
            cursor: voted.has(emoji) ? 'default' : 'pointer',
          }}
        >
          <span>{emoji}</span>
          {reactions[emoji] > 0 && (
            <span style={{ color: 'var(--text-muted)' }}>{reactions[emoji]}</span>
          )}
        </button>
      ))}
    </div>
  );
}
