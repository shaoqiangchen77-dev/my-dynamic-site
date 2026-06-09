'use client';
import { useEffect, useState, useRef } from 'react';

// 生成 52 周 × 7 天的贡献数据（基于 GitHub 公开事件 API）
function generateWeeks(): number[][] {
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(0);
    }
    weeks.push(week);
  }
  return weeks;
}

// 从 GitHub API 获取公开事件并填充日历
async function fetchContributions(username: string): Promise<number[][]> {
  const weeks = generateWeeks();
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
    if (!res.ok) return weeks;
    const events = await res.json();

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);

    events.forEach((event: { type: string; created_at: string }) => {
      if (['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent', 'IssueCommentEvent'].includes(event.type)) {
        const date = new Date(event.created_at);
        const diffDays = Math.floor((date.getTime() - startDate.getTime()) / 86400000);
        if (diffDays >= 0 && diffDays < 364) {
          const week = Math.floor(diffDays / 7);
          const day = diffDays % 7;
          if (week < 52) weeks[week][day] = Math.min(weeks[week][day] + 1, 4);
        }
      }
    });
  } catch {
    // 静默失败，使用空数据
  }
  return weeks;
}

const LEVELS = [
  'rgba(255,255,255,0.05)',
  'rgba(212,168,67,0.3)',
  'rgba(212,168,67,0.55)',
  'rgba(212,168,67,0.8)',
  'rgba(212,168,67,1)',
];

const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
const DAYS = ['一', '三', '五'];

export default function GitHubCalendar({ username }: { username: string }) {
  const [weeks, setWeeks] = useState<number[][]>(generateWeeks());
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchContributions(username).then((data) => {
      setWeeks(data);
      const sum = data.flat().reduce((a, b) => a + (b > 0 ? 1 : 0), 0);
      setTotal(sum);
      setLoading(false);
    });
  }, [username]);

  const cellSize = 11;
  const gap = 3;
  const labelWidth = 24;

  return (
    <div className="scroll-reveal">
      <h3 className="title-md mb-4 text-center">GitHub 贡献</h3>
      <div className="glass p-5 overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>加载中...</span>
          </div>
        ) : (
          <>
            <div ref={containerRef} className="inline-flex flex-col gap-0" style={{ minWidth: 'fit-content' }}>
              {/* 月份标签 */}
              <div className="flex" style={{ marginLeft: labelWidth + 'px', marginBottom: '4px' }}>
                {MONTHS.map((m, i) => (
                  <span
                    key={m}
                    className="text-[9px]"
                    style={{
                      color: 'var(--text-muted)',
                      width: `${(cellSize + gap) * 4.3}px`,
                      textAlign: 'left',
                    }}
                  >
                    {i % 2 === 0 ? m : ''}
                  </span>
                ))}
              </div>

              {/* 日历主体 */}
              <div className="flex gap-0">
                {/* 星期标签 */}
                <div className="flex flex-col justify-between" style={{ width: labelWidth + 'px', height: `${(cellSize + gap) * 7 - gap}px`, paddingTop: '1px' }}>
                  {DAYS.map((d) => (
                    <span key={d} className="text-[9px]" style={{ color: 'var(--text-muted)', height: cellSize + 'px', display: 'flex', alignItems: 'center' }}>
                      {d}
                    </span>
                  ))}
                </div>

                {/* 格子 */}
                <div className="flex" style={{ gap: gap + 'px' }}>
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col" style={{ gap: gap + 'px' }}>
                      {week.map((level, di) => (
                        <div
                          key={di}
                          className="rounded-sm"
                          style={{
                            width: cellSize + 'px',
                            height: cellSize + 'px',
                            background: LEVELS[level],
                          }}
                          title={`${level > 0 ? level + ' 次贡献' : '无贡献'}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 底部信息 */}
            <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid var(--glass-border-subtle)' }}>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                近一年活跃 {total} 天
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>少</span>
                {LEVELS.map((c, i) => (
                  <div key={i} className="rounded-sm" style={{ width: '10px', height: '10px', background: c }} />
                ))}
                <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>多</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
