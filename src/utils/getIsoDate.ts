export function getIsoDate(date: Date): string {
  const timezoneOffsetMs = date.getTimezoneOffset() * 60 * 1000 * -1; // смещение зоны в миллесекундах
  const newDate = new Date(date.getTime() + timezoneOffsetMs);
  return newDate.toISOString().split('T')[0]; // дата в формате YYYY-MM-DD
}
