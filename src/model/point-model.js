import { generatePoint } from '../mock/point.js';
import { POINTS_COUNT } from '../const.js';

export default class PointModel{
  #points = null;

  constructor (){
    this.#points = Array.from({length: POINTS_COUNT}, generatePoint);
  }

  get points () { return this.#points;}
}