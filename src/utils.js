import dayjs from 'dayjs';

const getRandomInteger = (start, end) => Math.floor(Math.random() * (end - start + 1) + start);

const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

const humanizeDate = (date, dateFormat) => date ? dayjs(date).format(dateFormat) : '';

const getDateDifference = (dateFrom, dateTo) => {
  const differenceInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  const days = Math.floor(differenceInMinutes / (60 * 24));
  const hours = Math.floor((differenceInMinutes - days * 60 * 24) / 60);
  const minutes = differenceInMinutes - days * 60 * 24 - hours * 60;

  if (days > 0) {
    return `${days}[D] ${hours}[H] ${minutes}[M]`;
  } else if (hours > 0) {
    return `${hours}[H] ${minutes}[M]`;
  } else {
    return `${minutes}[M]`;
  }
};

const getRandomDate = (date = new Date()) => dayjs(date).add(getRandomInteger(30, 1500), 'minute');

export { getRandomInteger, getRandomArrayElement, humanizeDate, getDateDifference, getRandomDate };

// Path: src/utils.js
