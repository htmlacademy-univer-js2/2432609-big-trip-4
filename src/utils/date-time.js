import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const humanizeDate = (date) => dayjs(date).format('D MMMM');

export const humanizeTime = (date) => dayjs(date).format('HH:mm');

export const getEventDuration = (dateFrom, dateTo) => {
  const timeParts = dayjs.duration(dayjs(dateTo).diff(dateFrom)).
    format('DD HH mm').
    split(' ');

  const days = timeParts[0];
  const hours = timeParts[1];

  let eventDuration = `${timeParts[2]}M`;

  if (hours !== '00' || (hours === '00' && days !== '00')){
    eventDuration = `${hours}H ${eventDuration}`;
  }

  if (days !== '00' ){
    eventDuration = `${days}D ${eventDuration}`;
  }

  return eventDuration;
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const getWrightForTwoNullDates = (pointA, pointB) => {
  const weightA = getWeightForNullDate(pointA.dateFrom, pointA.dateTo);
  const weightB = getWeightForNullDate(pointB.dateFrom, pointB.dateTo);

  return weightA && weightB;
};

export const sortByDay = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

export const sortByTime = (pointA, pointB) => {
  const timeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timeA - timeB;
};

export const sortByPrice = (pointA, pointB) => pointA.basePrice - pointB.basePrice;

export const humanizeFormDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export const PastPoint = (point) => dayjs(point.dateFrom).isBefore(dayjs());

export const FuturePoint = (point) => dayjs(point.dateFrom).isAfter(dayjs());
