import dayjs from 'dayjs';
import { getRandomIntegerFromRange } from './common.js';
import { Duration, DateFormat, MILLISECONDS_IN_DAY, MILLISECONDS_IN_HOUR } from '../const.js';

export const humanizePointDate = (date, form) => dayjs(date).format(form);

const createDuration = (startDate, endDate, param) => dayjs(endDate).diff(startDate, param);

const formattingDate = (diffDate) => diffDate < 10 ? `0${diffDate}` : `${diffDate}`;

export const humanizeTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.LONG) : '';

export const getDate = (add) => {
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

export const formatToShortDate = (time) => time ? dayjs(time).format(DateFormat.SHORT) : '';

export const formatToShortTime = (time) => time ? dayjs(time).format('HH:mm') : '';

export const getDuration = (dateFrom, dateTo) => {
  const timeDifference = dayjs(dateTo).diff(dayjs(dateFrom));

  if (timeDifference >= MILLISECONDS_IN_DAY) {
    return dayjs.duration(timeDifference).format('DD[D] HH[H] mm[M]');
  } else if (timeDifference >= MILLISECONDS_IN_HOUR) {
    return dayjs.duration(timeDifference).format('HH[H] mm[M]');
  } else if (timeDifference < MILLISECONDS_IN_HOUR) {
    return dayjs.duration(timeDifference).format('mm[M]');
  }
};


export const calculateDuration = (startDate, endDate) => {
  const differenceDays = formattingDate(createDuration(startDate, endDate, 'day'));
  const differenceHours = formattingDate(createDuration(startDate, endDate, 'hour') - differenceDays * 24);
  const differenceMinutes = formattingDate(createDuration(startDate, endDate, 'minute') - differenceDays * 24 * 60 - differenceHours * 60 + 1);
  if (startDate === null || endDate === null){
    return null;
  }
  if (differenceDays !== '00') {
    return `${differenceDays}D ${differenceHours}H ${differenceMinutes}M`;
  }

  if (differenceHours !== '00') {
    return `${differenceHours}H ${differenceMinutes}M`;
  }
  return `${differenceMinutes}M`;
};

export const sortPointTime = (pointA, pointB) => dayjs(pointA.endDate).diff(dayjs(pointA.startDate)) - dayjs(pointB.endDate).diff(dayjs(pointB.startDate));

export const sortPointDay = (pointA, pointB) => {
  const dateFromDifference = dayjs(pointA.startDate).diff(dayjs(pointB.startDate));
  return dateFromDifference === 0 ? dayjs(pointB.endDate).diff(dayjs(pointA.endDate)) : dateFromDifference;
};

export const sortPointPrice = (pointA, pointB) => pointA.price - pointB.price;


