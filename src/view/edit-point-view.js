import {humanizePointDate} from '../utils/point';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {TYPES} from '../const';
import {upperFirst} from '../utils/common';

const BLANK_POINT = {
  type: '',
  destination: 0,
  startDate: null,
  endDate: null,
  price: 0,
  isFavorite: false,
  offers: []
};

const generateDestinations = (destinations) => {
  let destinationsTemplate = '';
  destinations.forEach((destination) => {
    destinationsTemplate += `<option value="${destination.city}"></option>`;
  });
  return destinationsTemplate;
};

const createOffersTemplates = (allOffers, checkedOffers) => {
  if (allOffers.length === 0) {
    return '';
  } else {
    let offersTemplates = '';
    allOffers.forEach((offer) => {
      const checked = checkedOffers.includes(offer.id) ? 'checked' : '';
      offersTemplates += `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-luggage" ${checked}>
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
    });
    return offersTemplates;
  }
};

const createTypesTemplates = (currentType) => {
  let typesTemplates = '';
  TYPES.map((type) => {
    const checked = currentType === type ? 'checked' : '';
    typesTemplates += `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checked}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${upperFirst(type)}</label>
    </div>`;
  }).join('');
  return typesTemplates;
};

const createPhotosTemplates = (destPhotos) => {
  let photosTemplates = '';
  if (destPhotos !== ''){
    photosTemplates = destPhotos.map((photo) => (`<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)).join('');
  }
  return photosTemplates;
};

export const editingPoint = (point, destinations, offers) => {
  const {type, destinationId, startDate, endDate, price, arrayOffersIds} = point;
  const dateFrom = startDate !== null ? humanizePointDate(startDate, 'DD/MM/YY HH:mm') : '';
  const dateTo = endDate !== null ? humanizePointDate(endDate, 'DD/MM/YY HH:mm') : '';
  const allTypeOffers = offers.find((offer) => offer.type === type);
  return(`<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createTypesTemplates(type)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${destinationId}">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${destinationId}" type="text" name="event-destination" value="${destinations[destinationId].city}" list="destination-list-1">
                    <datalist id="destination-list-1">
                     ${generateDestinations(destinations)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                       ${createOffersTemplates(allTypeOffers.offers, arrayOffersIds)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinations[destinationId].description}</p>
                     <div class="event__photos-container">
                     <div class="event__photos-tape">
                     ${createPhotosTemplates(destinations[destinationId].photos)}
                    </div>
                    </div>
                  </section>
                </section>
              </form>
  </li>`
  );
};
export default class EditingPointView extends AbstractStatefulView{
  #point = null;
  #handleFormSubmit = null;
  #handleEditClick = null;
  #destinations = null;
  #offers = null;
  constructor({point = BLANK_POINT, onFormSubmit, destinations, offers}){
    super();
    this.#point = point;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditClick = onFormSubmit;
    this.#destinations = destinations;
    this.#offers = offers;
    this._state = EditingPointView.parsePointToState(point);
    this._restoreHandlers();
  }

  get template(){
    return editingPoint(this._state, this.#destinations, this.#offers);
  }

  #formSubmitHandler = (event) => {
    event.preventDefault();
    this.#handleFormSubmit(EditingPointView.parseStateToPoint(this._state));
  };

  #editClickHandler = (event) => {
    event.preventDefault();
    this.#handleEditClick(this.#point);
  };

  #changeTypeHandler = (event) => {
    event.preventDefault();
    this.updateElement({
      type: event.target.value,
      arrayOffersIds: []
    });
  };

  #changeDestinationHandler = (event) => {
    event.preventDefault();
    const destination = this.#destinations.filter((dest) => dest.city === event.target.value);
    this.updateElement({
      destinationId: destination[0].id,
    });
  };

  #changeOfferHandler = (event) => {
    event.preventDefault();
    if (this._state.offerIds.includes(Number(event.target.id.slice(-1)))) {
      this._state.offerIds = this._state.offerIds.filter((n) => n !== Number(event.target.id.slice(-1)));
    } else {
      this._state.offerIds.push(Number(event.target.id.slice(-1)));
    }
    this.updateElement({
      offerIds: this._state.offerIds,
    });
  };

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => ({...state});

  reset(point) {
    this.updateElement(
      EditingPointView.parsePointToState(point)
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#changeOfferHandler);
    this.element.querySelector('.event__input').addEventListener('change', this.#changeDestinationHandler);
  }
}
