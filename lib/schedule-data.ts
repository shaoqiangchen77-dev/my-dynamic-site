// ============================================
// 日程数据配置文件
// 直接修改此文件即可更新默认节假日和排班规则
// ============================================

export type HolidayEntry = { name: string; type: 'off' | 'work' };

// 2026年中国法定节假日（含调休上班）
// type: 'off' = 放假, 'work' = 调休上班
export const defaultHolidays: Record<string, HolidayEntry> = {
  // 元旦
  '2026-01-01': { name: '元旦', type: 'off' },
  '2026-01-02': { name: '元旦', type: 'off' },
  '2026-01-03': { name: '元旦', type: 'off' },

  // 春节
  '2026-02-15': { name: '春节调休', type: 'work' },
  '2026-02-17': { name: '春节', type: 'off' },
  '2026-02-18': { name: '春节', type: 'off' },
  '2026-02-19': { name: '春节', type: 'off' },
  '2026-02-20': { name: '春节', type: 'off' },
  '2026-02-21': { name: '春节', type: 'off' },
  '2026-02-22': { name: '春节', type: 'off' },
  '2026-02-23': { name: '春节', type: 'off' },
  '2026-02-28': { name: '春节调休', type: 'work' },

  // 清明节
  '2026-04-05': { name: '清明节', type: 'off' },
  '2026-04-06': { name: '清明节', type: 'off' },
  '2026-04-07': { name: '清明节', type: 'off' },

  // 劳动节
  '2026-04-26': { name: '劳动节调休', type: 'work' },
  '2026-05-01': { name: '劳动节', type: 'off' },
  '2026-05-02': { name: '劳动节', type: 'off' },
  '2026-05-03': { name: '劳动节', type: 'off' },
  '2026-05-04': { name: '劳动节', type: 'off' },
  '2026-05-05': { name: '劳动节', type: 'off' },

  // 端午节
  '2026-06-19': { name: '端午节', type: 'off' },
  '2026-06-20': { name: '端午节', type: 'off' },
  '2026-06-21': { name: '端午节', type: 'off' },

  // 中秋节
  '2026-09-25': { name: '中秋节', type: 'off' },
  '2026-09-26': { name: '中秋节', type: 'off' },

  // 国庆节
  '2026-09-27': { name: '国庆节调休', type: 'work' },
  '2026-10-01': { name: '国庆节', type: 'off' },
  '2026-10-02': { name: '国庆节', type: 'off' },
  '2026-10-03': { name: '国庆节', type: 'off' },
  '2026-10-04': { name: '国庆节', type: 'off' },
  '2026-10-05': { name: '国庆节', type: 'off' },
  '2026-10-06': { name: '国庆节', type: 'off' },
  '2026-10-07': { name: '国庆节', type: 'off' },
  '2026-10-10': { name: '国庆节调休', type: 'work' },
};

// 单双周排班规则
// baseWeek: 参考周的 ISO 周数
// baseWeekType: 参考周是 'single'(单休/只休周日) 还是 'double'(双休/周六周日都休)
export const defaultWeekPattern = {
  baseWeek: 24,          // 2026-06-08 所在周
  baseWeekType: 'single' as 'single' | 'double',
};
