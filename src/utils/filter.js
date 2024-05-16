import { FilterType } from '../const';
import { FuturePoint, PastPoint } from './date-time';

const filterPoints = {
  [FilterType.EVERYTHING]: (points) => Array.from(points),
  [FilterType.FUTURE]: (points) => Array.from(points).filter((point) => FuturePoint(point)),
  [FilterType.PAST]: (points) => Array.from(points).filter((point) => PastPoint(point))
};

export { filterPoints };
