import dayjs from 'dayjs';

import { getRandomInteger } from './common';
import { Duration, DateFormat } from '../const';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const humanizeDate = (date, dateFormat = "DD/MM/YY HH:mm") => date ? dayjs(date).format(dateFormat) : '';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const humanizeTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.LONG) : '';

const getRandomIntegerFromRange = (start, end) => Math.ceil(Math.random() * (end - start + 1)) + start - 1;

const formatToDateTime = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.LONG) : '';

const formatToShortDate = (time) => time ? dayjs(time).format(DateFormat.SHORT) : '';

const formatToShortTime = (time) => time ? dayjs(time).format('HH:mm') : '';

const getDate = (add) => {
  let date = dayjs().subtract(getRandomIntegerFromRange(0, Duration.DAY), 'day').toDate();
  
  const mins = getRandomIntegerFromRange(0, Duration.MIN);
  const hours = getRandomIntegerFromRange(0, Duration.HOUR);
  const days = getRandomIntegerFromRange(0, Duration.DAY);
  
  if (add) {
    date = dayjs(date)
      .add(mins, 'minute')
      .add(hours, 'hour')
      .add(days, 'days')
      .toDate();
  }
  
    return date;
  };

  const getDuration = (dateFrom, dateTo) => {
    const timeDifference = dayjs(dateTo).diff(dayjs(dateFrom));
  
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    if (days > 0) {
      return `${days}D ${hours}H ${minutes}M`;
    } else if (hours > 0) {
      return `${hours}H ${minutes}M`;
    } else {
      return `${minutes}M`;
    }
  };

const getRandomDate = (date = new Date(0)) => dayjs(date).add(getRandomInteger(30, 1500), 'minute');

export { getRandomInteger, getDate, humanizeDate, getRandomArrayElement, humanizeTaskDueDate, getRandomIntegerFromRange, formatToDateTime, formatToShortDate, formatToShortTime, getDuration, getRandomDate };

