import AbstractView from '../framework/view/abstract-view';
import {NoPointsTextType} from '../const';

export const createNoPoint = (filterType) => {
  const noPointTextValue = NoPointsTextType[filterType];
  return(
    `<p class="trip-events__msg">${noPointTextValue}</p>`
  );
};
export default class NoPointView extends AbstractView {
  #filterType = null;
  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template(){
    return createNoPoint(this.#filterType);
  }
}

