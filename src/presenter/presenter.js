import { render, replace } from '../framework/render.js';
import EditForm from '../view/edit-form.js';
import EventList from '../view/event-list.js';
import Event from '../view/event.js';
import Sort from '../view/sort.js';


export default class Presenter {
  #routeContainer = null;
  #pointModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #routePoint = [];
  #destinations = [];

  #pointsListComponent = new EventList();
  #sortingComponent = new Sort();

  constructor({ routeContainer, pointsModel, destinationsModel, offersModel }) {
    this.#routeContainer = routeContainer;
    this.#pointModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#routePoint = [...this.#pointModel.points];
    this.#destinations = [...this.#destinationsModel.destinations];

    render(this.#sortingComponent, this.#routeContainer);
    render(this.#pointsListComponent, this.#routeContainer);

    for (let i = 1; i < this.#routePoint.length; i++) {
      this.#renderPoint(this.#routePoint[i]);
    }
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new Event({
      point: point,
      destinations: this.#destinations,
      offers: this.#offersModel.getByType(point.type).offers,
      onEditClick: () => {
        replacePointToEdit();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const formComponent = new EditForm({
      point: point,
      destinations: this.#destinations,
      offerItem: this.#offersModel.getByType(point.type),
      onSubmit: () => {
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onClose: () => {
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToEdit() {
      replace(formComponent, pointComponent);
    }

    function replaceEditToPoint() {
      replace(pointComponent, formComponent);
    }

    render(pointComponent, this.#pointsListComponent.element);
  }
}
