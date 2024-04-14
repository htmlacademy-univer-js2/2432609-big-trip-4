import { createElement } from '../render.js';
import { humanizeDate, getRandomArrayElement, getRandomInteger } from '../utils.js';

const EMPTY_POINT = {
  id: '',
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: {},
  isFavorite: false,
  offers: [],
  type: 'flight'
};

function createPhotosTemplate(pictures) {
  return pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`).join('');
}

function createOffersTemplate({ offers, type }) {
  return offers.map((offer) => `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" ${getRandomInteger(0, 1) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${type}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('');
}

function createEditingFormTemplate({ point, destinations, offerItem }) {
  const { dateFrom, dateTo, type, basePrice, destination: pointDestination } = point;
  const destination = getRandomArrayElement(destinations);

  return `
    <li class="trip-events__item">
      <!-- form content -->
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <!-- more form content -->

      ${offerItem.offers.length ? `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createOffersTemplate(offerItem)}
        </div>

      </section>` : ''}

      ${pointDestination ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPhotosTemplate(destination.pictures)}
          </div>
        </div>
      </section>` : ''}

    </li>
  `;
}

export default class EditingFormView {
  constructor({ point = EMPTY_POINT, destinations, offerItem }) {
    this.point = point;
    this.destinations = destinations;
    this.offerItem = offerItem;
  }

  getTemplate() {
    return createEditingFormTemplate({
      point: this.point,
      destinations: this.destinations,
      offerItem: this.offerItem
    });
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
