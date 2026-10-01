export const todayISO = (referenceDate = new Date()) => {
  const date = new Date(referenceDate);
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
};

export const formatMonthKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const getCurrentMonthKey = (referenceDate = new Date()) => {
  return formatMonthKey(referenceDate);
};

export const getPreviousMonthKey = (referenceDate = new Date()) => {
  const date = new Date(referenceDate.getFullYear(), referenceDate.getMonth() - 1, 1);
  return formatMonthKey(date);
};

export const isDateInMonth = (dateString, monthKey) => {
  if (!dateString) return false;
  return dateString.startsWith(monthKey);
};

export const isDateInCurrentMonth = (dateString, referenceDate = new Date()) => {
  return isDateInMonth(dateString, getCurrentMonthKey(referenceDate));
};

export const getWeekStart = (referenceDate = new Date()) => {
  const date = new Date(referenceDate);
  const dayIndex = (date.getDay() + 6) % 7;
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  start.setDate(date.getDate() - dayIndex);
  return start;
};

export const isDateInCurrentWeek = (dateString, referenceDate = new Date()) => {
  if (!dateString) return false;

  const target = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(target.getTime())) return false;

  const start = getWeekStart(referenceDate);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return target >= start && target <= end;
};

export const buildRecentMonthSeries = (referenceDate = new Date(), count = 6) => {
  const firstOfMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);

  return Array.from({ length: count }, (_, index) => {
    const monthDate = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth() - (count - 1 - index), 1);
    const key = formatMonthKey(monthDate);

    return {
      key,
      month: new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(monthDate),
      shortMonth: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(monthDate),
    };
  });
};
