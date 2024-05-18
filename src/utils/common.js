import {sortPointDay, sortPointTime, sortPointPrice} from './point';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIntegerFromRange = (start, end) => Math.ceil(Math.random() * (end - start + 1)) + start - 1;

export const getRandomItem = (items) => items[getRandomInteger(0, items.length - 1)];

export const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);

export const updatePoint = (points, update) => points.map((point) => point.id === update.id ? update : point);

export const SortType = {
  DEFAULT: 'day',
  TIME: 'time',
  PRICE: 'price'
};

export const sortPointsByType = {
  [SortType.DEFAULT]: (points) => points.sort(sortPointDay),
  [SortType.TIME]: (points) => points.sort(sortPointTime),
  [SortType.PRICE]: (points) => points.sort(sortPointPrice)
};
