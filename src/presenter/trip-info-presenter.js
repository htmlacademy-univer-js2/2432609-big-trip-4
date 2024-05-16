import EventsView from '../view/event-list.js';
import NoEventsView from '../view/empty.js';
import SortingView from '../view/sort.js';
import PointPresenter from './point-presenter.js';
import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortByTime, sortByPrice, sortByDay } from '../utils/date-time.js';

export default class TripInfoPresenter {
  #eventsList = null;
  #tripContainer = null;
  #eventsPresenter = new Map();

  #pointsModel = null;
  #points = null;
  #tripEvents = [];

  #destinations = null;
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];


  #noEventsComponent = new NoEventsView();
  #sortingComponent = new SortingView();

  constructor() {
    this.#eventsList = new EventsView();
  }

  init (tripContainer, pointsModel, destinationsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#destinations = destinationsModel.destinations;

    const pointsSortedByDefault = [...this.#pointsModel.points].sort(sortByDay);

    this.#points = pointsSortedByDefault;
    this.#sourcedPoints = pointsSortedByDefault;

    if(this.#points.length === 0){
      this.#renderNoEvents();
    }

    else{
      this.#renderSort();
      this.#renderPoints();
    }
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter(this.#eventsList.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, this.#destinations);

    this.#eventsPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.#renderEventsList();

    for (let i = 0; i < this.#points.length; i++){
      this.#renderPoint(this.#points[i]);
    }
  };

  #sortEvents = (sortType) => {
    switch (sortType){
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      default:
        this.#points.sort(sortByDay);
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);

    this.#clearEventsList();
    this.#renderPoints();
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedPoint);
    this.#eventsPresenter.get(updatedPoint.id).init(updatedPoint, this.#destinations);
  };

  #handleModeChange = () => {
    this.#eventsPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearEventsList = () => {
    this.#eventsPresenter.forEach((presenter) => presenter.destroy());
    this.#eventsPresenter.clear();
  };

  #renderEventsList = () => {
    render(this.#eventsList, this.#tripContainer);
  };

  #renderSort = () => {
    render(this.#sortingComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    this.#sortingComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoEvents = () => {
    render(this.#noEventsComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };
}
