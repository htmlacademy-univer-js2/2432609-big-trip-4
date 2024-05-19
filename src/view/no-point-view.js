import AbstractView from '../framework/view/abstract-view';
import {FILTERTYPE} from '../utils/filter';

const NoPointsTextType = {
  [FILTERTYPE.EVERYTHING]: 'Click New Event to create your first point',
  [FILTERTYPE.PAST]: 'There are no past events now',
  [FILTERTYPE.FUTURE]: 'There are no future events now',
};

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
