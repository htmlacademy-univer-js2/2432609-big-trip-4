import Observable from '../framework/observable.js';
import {FILTERTYPE} from '../utils/filter';

export default class FilterModel extends Observable{
  #filter = FILTERTYPE.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
