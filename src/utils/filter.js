import dayjs from 'dayjs';

export const FILTERTYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const filterByPast = (date, param) => dayjs().isAfter(dayjs(date), param);

const filterByFuture = (date, param) => dayjs().isBefore(dayjs(date), param) || dayjs().isSame(dayjs(date), param);

export const filterByType = {
  [FILTERTYPE.EVERYTHING]: (points) => points,
  [FILTERTYPE.FUTURE]: (points) => points.filter((point) => filterByFuture(point.startDate, 'D') || filterByFuture(point.endDate, 'D')),
  [FILTERTYPE.PAST]: (points) => points.filter((point) => filterByPast(point.endDate, 'D') || filterByPast(point.startDate, 'D'))
};
