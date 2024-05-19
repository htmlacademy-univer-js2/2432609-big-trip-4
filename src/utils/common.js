
import {sortPointDay, sortPointTime, sortPointPrice} from './point';
import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIntegerFromRange = (start, end) => Math.ceil(Math.random() * (end - start + 1)) + start - 1;

export const getRandomItem = (items) => items[getRandomInteger(0, items.length - 1)];

export const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);

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

export const getStartPoint = (points) => {
  let startPoint = points[0];
  for(let i = 1; i < points.length; i++) {
    const currPointDate = points[i].startDate;
    const endPointDate = startPoint.startDate;
    if(dayjs(currPointDate).diff(dayjs(endPointDate), 'M') < 0
      || dayjs(currPointDate).diff(dayjs(endPointDate), 'M') === 0
      && dayjs(currPointDate).diff(dayjs(endPointDate), 'D') < 0) {
      startPoint = points[i];
    }
  }
  return startPoint;
};

export const getEndPoint = (points) => {
  let endPoint = points[0];
  for(let i = 1; i < points.length; i++) {
    const currPointDate = points[i].endDate;
    const endPointDate = endPoint.endDate;
    if(dayjs(currPointDate).diff(dayjs(endPointDate), 'M') > 0
      || dayjs(currPointDate).diff(dayjs(endPointDate), 'M') === 0
      && dayjs(currPointDate).diff(dayjs(endPointDate), 'D') > 0) {
      endPoint = points[i];
    }
  }
  return endPoint;
};

