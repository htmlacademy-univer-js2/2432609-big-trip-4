import { POINT_COUNT } from '../const.js';
import { generatePoint } from '../mock/point.js';

export default class PointsModel {
  constructor() {
    this.points = this.generatePoints();
  }

  generatePoints() {
    return Array.from({length: POINT_COUNT}, () => generatePoint());
  }

  get() {
    return this.points;
  }
}
