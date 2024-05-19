import AbstractView from '../framework/view/abstract-view.js';
import {getEndPoint, getStartPoint} from '../utils/common';
import {humanizePointDate} from '../utils/point';

const getTotalAmount = (points) => {
  let sum = 0;
  points.forEach((point) => {
    sum += point.price;
  });
  return sum;
};

const getTripTitle = (points, destinations, startPoint, endPoint) => {
  switch(points.length) {
    case 1:
      return destinations[startPoint.destination].name;

    case 2:
      return `${destinations[startPoint.destination].name} &mdash; ${destinations[endPoint.destination].name}`;

    case 3:
      return `${destinations[startPoint.destination].name} &mdash;
      ${destinations[points.find(
    (point) => point.id !== startPoint.id && point.id !== endPoint.id).destination].name} &mdash;
    ${destinations[endPoint.destination].name}`;

    default:
      return `${destinations[startPoint.destination].name} &mdash; . . . &mdash; ${destinations[endPoint.destination].name}`;
  }
};

const createTripInfoTemplate = (points, destinations) => {
  const startPoint = getStartPoint(points);
  const endPoint = getEndPoint(points);

  return(
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getTripTitle(points, destinations, startPoint, endPoint)}</h1>
        <p class="trip-info__dates">${humanizePointDate(startPoint.startDate, 'MMM D')}&nbsp;&mdash;&nbsp;${humanizePointDate(endPoint.endDate, 'MMM D')}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalAmount(points)}</span>
      </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinations = null;

  constructor (points, destinations) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations);
  }
}
