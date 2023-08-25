export function prettifyDate(date: Date) {
  const months = ['янв', 'февр', 'марта', 'апр', 'мая', 'июня', 'июля', 'авг', 'сент', 'окт', 'нояб', 'дек'];
  // UTC - убирает влияние часового пояса на данные
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  // Возвращаем дату в формате "24 авг 2023"
  return `${day}\xa0${month}\xa0${year}`; // \xa0 - &nbsp;
}
