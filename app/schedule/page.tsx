'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { defaultHolidays, defaultWeekPattern, type HolidayEntry } from '@/lib/schedule-data';

const STORAGE_KEY = 'schedule-overrides';
const PATTERN_KEY = 'schedule-week-pattern';
const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];
const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

function dateKey(y: number, m: number, d: number) {
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

// 从 localStorage 加载
function loadOverrides(): Record<string, HolidayEntry> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
}

function loadPattern() {
  if (typeof window === 'undefined') return defaultWeekPattern;
  try {
    const saved = JSON.parse(localStorage.getItem(PATTERN_KEY) || 'null');
    return saved || defaultWeekPattern;
  } catch { return defaultWeekPattern; }
}

export default function SchedulePage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [overrides, setOverrides] = useState<Record<string, HolidayEntry>>({});
  const [pattern, setPattern] = useState(defaultWeekPattern);
  const [editDay, setEditDay] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState<'none' | 'holidays' | 'rules'>('none');
  const [addDate, setAddDate] = useState('');
  const [addName, setAddName] = useState('');
  const [addType, setAddType] = useState<'off' | 'work'>('off');

  // 加载 localStorage
  useEffect(() => {
    setOverrides(loadOverrides());
    setPattern(loadPattern());
  }, []);

  // 保存到 localStorage
  const saveOverrides = useCallback((data: Record<string, HolidayEntry>) => {
    setOverrides(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const savePattern = useCallback((p: typeof defaultWeekPattern) => {
    setPattern(p);
    localStorage.setItem(PATTERN_KEY, JSON.stringify(p));
  }, []);

  // 合并节假日：默认 + 覆盖
  const allHolidays = useMemo(() => ({ ...defaultHolidays, ...overrides }), [overrides]);

  // 判断某天状态
  const getDayStatus = useCallback((date: Date): { rest: boolean; reason: string; source: 'default' | 'override' | 'rule' } => {
    const key = dateKey(date.getFullYear(), date.getMonth(), date.getDate());
    const day = date.getDay();

    // 1. 用户覆盖优先
    if (overrides[key]) {
      return {
        rest: overrides[key].type === 'off',
        reason: overrides[key].name,
        source: 'override',
      };
    }

    // 2. 默认节假日
    if (defaultHolidays[key]) {
      return {
        rest: defaultHolidays[key].type === 'off',
        reason: defaultHolidays[key].name,
        source: 'default',
      };
    }

    // 3. 周日永远休息
    if (day === 0) return { rest: true, reason: '周日', source: 'rule' };

    // 4. 周六按单双周
    if (day === 6) {
      const weekNum = getISOWeek(date);
      const diff = weekNum - pattern.baseWeek;
      const isBaseSingle = pattern.baseWeekType === 'single';
      // 奇偶交替
      const isSingleWeek = isBaseSingle ? (diff % 2 === 0) : (diff % 2 !== 0);
      return {
        rest: !isSingleWeek,
        reason: isSingleWeek ? '单休周' : '双休周',
        source: 'rule',
      };
    }

    return { rest: false, reason: '工作日', source: 'rule' };
  }, [overrides, pattern]);

  // 日历网格
  const weeks = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const rows: (Date | null)[][] = [];
    let row: (Date | null)[] = new Array(startOffset).fill(null);
    for (let day = 1; day <= totalDays; day++) {
      row.push(new Date(year, month, day));
      if (row.length === 7) { rows.push(row); row = []; }
    }
    if (row.length > 0) { while (row.length < 7) row.push(null); rows.push(row); }
    return rows;
  }, [year, month]);

  // 当前编辑的日期信息
  const editDateObj = editDay ? new Date(editDay + 'T00:00:00') : null;
  const editStatus = editDateObj ? getDayStatus(editDateObj) : null;

  // 设置某天覆盖
  function setDayOverride(key: string, entry: HolidayEntry | null) {
    const next = { ...overrides };
    if (entry) next[key] = entry;
    else delete next[key];
    saveOverrides(next);
    setEditDay(null);
  }

  // 添加节假日
  function addHoliday() {
    if (!addDate || !addName) return;
    const next = { ...overrides, [addDate]: { name: addName, type: addType } };
    saveOverrides(next);
    setAddDate('');
    setAddName('');
  }

  // 删除覆盖
  function removeOverride(key: string) {
    const next = { ...overrides };
    delete next[key];
    saveOverrides(next);
  }

  // 重置全部
  function resetAll() {
    saveOverrides({});
    savePattern(defaultWeekPattern);
  }

  const todayStr = dateKey(now.getFullYear(), now.getMonth(), now.getDate());

  // 收集所有覆盖列表（按日期排序）
  const overrideList = Object.entries(overrides).sort(([a], [b]) => a.localeCompare(b));

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 nav-glass" style={{ background: 'var(--nav-top-bg)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl tracking-wide" style={{ color: 'var(--text-primary)' }}>GlassBlog</Link>
          <div className="flex gap-8 items-center">
            <Link href="/" className="text-sm font-medium transition-all duration-300 hover:-translate-y-0.5" style={{ color: 'var(--text-muted)' }}>返回首页</Link>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>日程表</span>
          </div>
        </div>
      </nav>

      <main className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">

          {/* 标题 */}
          <div className="glass p-8 mb-8 text-center">
            <h1 className="title-xl mb-2">工作日程表</h1>
            <p className="text-muted text-sm">单双周交替 · 点击日期可修改 · 数据保存在浏览器本地</p>
          </div>

          {/* 月份切换 */}
          <div className="glass p-4 mb-6 flex items-center justify-between">
            <button onClick={() => month === 0 ? (setYear(year - 1), setMonth(11)) : setMonth(month - 1)} className="glass-btn px-4 py-2 text-sm">← 上月</button>
            <div className="flex items-center gap-4">
              <span className="title-md">{year}年 {MONTH_NAMES[month]}</span>
              <button onClick={() => { setYear(now.getFullYear()); setMonth(now.getMonth()); }} className="glass-btn px-3 py-1 text-xs">今天</button>
            </div>
            <button onClick={() => month === 11 ? (setYear(year + 1), setMonth(0)) : setMonth(month + 1)} className="glass-btn px-4 py-2 text-sm">下月 →</button>
          </div>

          {/* 图例 */}
          <div className="glass p-4 mb-6 flex flex-wrap gap-4 justify-center text-xs">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: 'rgba(52,211,153,0.6)' }} /> 休息</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: 'rgba(251,113,133,0.6)' }} /> 工作</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: 'rgba(251,191,36,0.6)' }} /> 法定假</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: 'rgba(251,146,60,0.6)' }} /> 调班</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full ring-2" style={{ background: 'rgba(96,165,250,0.6)', boxShadow: '0 0 0 2px rgba(96,165,250,0.4)' }} /> 今天</span>
          </div>

          {/* 日历 */}
          <div className="glass p-6">
            <div className="grid grid-cols-7 gap-2 mb-3">
              {WEEK_DAYS.map((day, i) => (
                <div key={day} className="text-center text-sm font-semibold py-2" style={{ color: (i === 0 || i === 6) ? 'var(--accent)' : 'var(--text-muted)' }}>{day}</div>
              ))}
            </div>
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-2 mb-2">
                {week.map((date, di) => {
                  if (!date) return <div key={di} className="h-16 md:h-20" />;
                  const key = dateKey(date.getFullYear(), date.getMonth(), date.getDate());
                  const isToday = key === todayStr;
                  const status = getDayStatus(date);
                  const holiday = allHolidays[key];
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                  const weekNum = getISOWeek(date);

                  let bgColor = status.rest ? 'rgba(52,211,153,0.15)' : 'rgba(251,113,133,0.1)';
                  let borderColor = status.rest ? 'rgba(52,211,153,0.3)' : 'rgba(251,113,133,0.2)';
                  let statusText = status.rest ? '休' : '班';
                  let statusColor = status.rest ? '#34d399' : '#fb7185';

                  if (holiday?.type === 'off') { bgColor = 'rgba(251,191,36,0.15)'; borderColor = 'rgba(251,191,36,0.3)'; statusText = '假'; statusColor = '#fbbf24'; }
                  if (holiday?.type === 'work') { bgColor = 'rgba(251,146,60,0.15)'; borderColor = 'rgba(251,146,60,0.3)'; statusText = '调班'; statusColor = '#fb923c'; }
                  if (status.source === 'override') { borderColor = 'rgba(168,85,247,0.5)'; }
                  if (isToday) { borderColor = 'rgba(96,165,250,0.8)'; }

                  return (
                    <div
                      key={di}
                      onClick={() => setEditDay(key)}
                      className="h-16 md:h-20 rounded-xl p-1.5 md:p-2 flex flex-col justify-between transition-all duration-200 hover:scale-105 cursor-pointer"
                      style={{ background: bgColor, border: `1.5px solid ${borderColor}` }}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-sm md:text-base font-semibold" style={{ color: isToday ? '#60a5fa' : 'var(--text-primary)' }}>{date.getDate()}</span>
                        {isToday && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-400/30 text-blue-300">今</span>}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] md:text-xs font-medium" style={{ color: statusText === '调班' ? statusColor : statusColor }}>{statusText}</span>
                        {holiday ? (
                          <span className="text-[9px] truncate max-w-full" style={{ color: 'var(--text-muted)' }}>{holiday.name}</span>
                        ) : isWeekend ? (
                          <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>W{weekNum}</span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* 本月统计 */}
          <div className="glass p-6 mt-6">
            <h3 className="title-md mb-4">本月统计</h3>
            <MonthStats year={year} month={month} getDayStatus={getDayStatus} allHolidays={allHolidays} />
          </div>

          {/* 管理按钮 */}
          <div className="glass p-4 mt-6 flex flex-wrap gap-3 justify-center">
            <button onClick={() => setShowPanel(showPanel === 'holidays' ? 'none' : 'holidays')} className="glass-btn px-4 py-2 text-sm">
              {showPanel === 'holidays' ? '收起节假日' : '管理节假日'}
            </button>
            <button onClick={() => setShowPanel(showPanel === 'rules' ? 'none' : 'rules')} className="glass-btn px-4 py-2 text-sm">
              {showPanel === 'rules' ? '收起规则' : '排班规则'}
            </button>
            <button onClick={resetAll} className="glass-btn px-4 py-2 text-sm" style={{ borderColor: 'rgba(251,113,133,0.4)' }}>
              重置全部
            </button>
          </div>

          {/* 节假日管理面板 */}
          {showPanel === 'holidays' && (
            <div className="glass p-6 mt-4">
              <h3 className="title-md mb-4">节假日管理</h3>

              {/* 添加 */}
              <div className="flex flex-wrap gap-3 mb-6 items-end">
                <div>
                  <label className="text-xs text-muted block mb-1">日期</label>
                  <input type="date" value={addDate} onChange={e => setAddDate(e.target.value)} className="glass-input px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1">名称</label>
                  <input type="text" value={addName} onChange={e => setAddName(e.target.value)} placeholder="如：元旦" className="glass-input px-3 py-2 text-sm w-32" />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1">类型</label>
                  <select value={addType} onChange={e => setAddType(e.target.value as 'off' | 'work')} className="glass-input px-3 py-2 text-sm">
                    <option value="off">放假</option>
                    <option value="work">调休上班</option>
                  </select>
                </div>
                <button onClick={addHoliday} className="glass-btn px-4 py-2 text-sm">添加</button>
              </div>

              {/* 已有列表 */}
              {overrideList.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {overrideList.map(([key, entry]) => (
                    <div key={key} className="flex items-center justify-between glass-subtle px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>{key}</span>
                        <span className="text-sm">{entry.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{
                          background: entry.type === 'off' ? 'rgba(52,211,153,0.2)' : 'rgba(251,146,60,0.2)',
                          color: entry.type === 'off' ? '#34d399' : '#fb923c',
                        }}>{entry.type === 'off' ? '放假' : '调班'}</span>
                      </div>
                      <button onClick={() => removeOverride(key)} className="text-xs px-2 py-1 rounded hover:bg-white/10" style={{ color: '#fb7185' }}>删除</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted text-center">暂无自定义覆盖，点击日历中的日期可快速修改</p>
              )}
            </div>
          )}

          {/* 排班规则面板 */}
          {showPanel === 'rules' && (
            <div className="glass p-6 mt-4">
              <h3 className="title-md mb-4">排班规则</h3>
              <p className="text-sm text-muted mb-4">设置一个参考周的单双周类型，系统自动推算所有周的排班。偶数/奇数周交替单休和双休。</p>
              <div className="flex flex-wrap gap-6 items-end">
                <div>
                  <label className="text-xs text-muted block mb-1">参考周（ISO周数）</label>
                  <input type="number" value={pattern.baseWeek} min={1} max={53}
                    onChange={e => savePattern({ ...pattern, baseWeek: Number(e.target.value) })}
                    className="glass-input px-3 py-2 text-sm w-24"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1">参考周类型</label>
                  <select value={pattern.baseWeekType}
                    onChange={e => savePattern({ ...pattern, baseWeekType: e.target.value as 'single' | 'double' })}
                    className="glass-input px-3 py-2 text-sm"
                  >
                    <option value="single">单休（周六上班）</option>
                    <option value="double">双休（周六休息）</option>
                  </select>
                </div>
                <div className="text-sm text-muted pb-2">
                  当前：第{pattern.baseWeek}周 = {pattern.baseWeekType === 'single' ? '单休' : '双休'}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 编辑弹窗 */}
      {editDay && editStatus && editDateObj && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={() => setEditDay(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="glass-strong p-6 w-full max-w-sm relative z-10" onClick={e => e.stopPropagation()}>
            <h3 className="title-md mb-4">{editDay} 编辑</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-muted)' }}>默认状态</span>
                <span>{editStatus.reason}（{editStatus.rest ? '休息' : '上班'}）</span>
              </div>
              {overrides[editDay] && (
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-muted)' }}>自定义</span>
                  <span>{overrides[editDay].name}（{overrides[editDay].type === 'off' ? '放假' : '调班'}）</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button onClick={() => setDayOverride(editDay, { name: '自定义放假', type: 'off' })} className="glass-btn py-2 text-sm" style={{ borderColor: 'rgba(52,211,153,0.4)' }}>设为放假</button>
              <button onClick={() => setDayOverride(editDay, { name: '自定义上班', type: 'work' })} className="glass-btn py-2 text-sm" style={{ borderColor: 'rgba(251,146,60,0.4)' }}>设为上班</button>
            </div>
            {overrides[editDay] && (
              <button onClick={() => setDayOverride(editDay, null)} className="w-full glass-btn py-2 text-sm mb-3" style={{ borderColor: 'rgba(251,113,133,0.4)' }}>
                恢复默认
              </button>
            )}
            <button onClick={() => setEditDay(null)} className="w-full text-center text-sm py-2 rounded-lg hover:bg-white/10 transition-colors" style={{ color: 'var(--text-muted)' }}>取消</button>
          </div>
        </div>
      )}

      <ThemeToggle />
    </>
  );
}

function MonthStats({ year, month, getDayStatus, allHolidays }: {
  year: number; month: number;
  getDayStatus: (d: Date) => { rest: boolean };
  allHolidays: Record<string, HolidayEntry>;
}) {
  const lastDay = new Date(year, month + 1, 0).getDate();
  let workDays = 0, restDays = 0, holidaysCount = 0;
  for (let d = 1; d <= lastDay; d++) {
    const date = new Date(year, month, d);
    const key = dateKey(year, month + 1, d);
    if (allHolidays[key]?.type === 'off') holidaysCount++;
    if (getDayStatus(date).rest) restDays++; else workDays++;
  }
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="glass-subtle p-4 rounded-xl">
        <div className="text-2xl font-bold" style={{ color: '#fb7185' }}>{workDays}</div>
        <div className="text-xs text-muted mt-1">工作日</div>
      </div>
      <div className="glass-subtle p-4 rounded-xl">
        <div className="text-2xl font-bold" style={{ color: '#34d399' }}>{restDays}</div>
        <div className="text-xs text-muted mt-1">休息日</div>
      </div>
      <div className="glass-subtle p-4 rounded-xl">
        <div className="text-2xl font-bold" style={{ color: '#fbbf24' }}>{holidaysCount}</div>
        <div className="text-xs text-muted mt-1">法定假日</div>
      </div>
    </div>
  );
}
