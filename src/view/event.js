import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate, getRandomArrayElement, getDateDifference, getRandomInteger } from '../utils.js';

function createSelectedOffersTemplate(offers) {
  return offers.map((offer) => `
  ${getRandomInteger(0, 1) ? `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>
  ` : ''}`).join('');
}

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm';

function createRoutePointTemplate({ point, destinations, offers }) {
  const timeFrom = humanizeDate(point.dateFrom, TIME_FORMAT);
  const timeTo = humanizeDate(point.dateTo, TIME_FORMAT);
  const duration = getDateDifference(point.dateFrom, point.dateTo);
  const date = humanizeDate(point.dateFrom, DATE_FORMAT);
  const isActiveClassName = point.isFavorite ? 'event__favorite-btn--active' : '';

  const destination = getRandomArrayElement(destinations);

  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${date}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${point.type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T12:25">${timeFrom}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T13:35">${timeTo}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createSelectedOffersTemplate(offers)}
      </ul>
      <button class="event__favorite-btn ${isActiveClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path
            d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
  `;
}

export default class RoutePointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;

  constructor({ point, destinations, offers, onEditClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createRoutePointTemplate({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers
    });
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
