import dayjs from 'dayjs';
import {FilterType} from '../const';

const filterByPast = (date, param) => dayjs().isAfter(dayjs(date), param);

const filterByFuture = (date, param) => dayjs().isBefore(dayjs(date), param) || dayjs().isSame(dayjs(date), param);

export const filterByType = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => filterByFuture(point.startDate, 'D') || filterByFuture(point.endDate, 'D')),
  [FilterType.PAST]: (points) => points.filter((point) => filterByPast(point.endDate, 'D') || filterByPast(point.startDate, 'D'))
};
