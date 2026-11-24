import { MISSION_STATUSES } from '../data/seedData';

const STATUS_MAP = Object.fromEntries(
  MISSION_STATUSES.map((status) => [status.value, status.label])
);

export function getStatusLabel(statusValue) {
  return STATUS_MAP[statusValue] || statusValue;
}

export function formatBudget(millions) {
  const num = Number(millions);
  if (Number.isNaN(num)) return '—';
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(2).replace(/\.00$/, '')} млрд`;
  }
  return `$${num.toLocaleString('uk-UA')} млн`;
}

export function formatDuration(days) {
  const num = Number(days);
  if (Number.isNaN(num)) return '—';
  if (num >= 365) {
    const years = (num / 365.25).toFixed(1).replace(/\.0$/, '');
    return `${num.toLocaleString('uk-UA')} дн. (~${years} р.)`;
  }
  return `${num.toLocaleString('uk-UA')} дн.`;
}

export function formatDateUk(isoDate) {
  if (!isoDate) return '—';
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
