import EventList from '../view/event-list.js';
import Sort from '../view/sort.js';
import { render} from '../framework/render.js';
import EmptyList from '../view/empty.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';

export default class RoutePresenter {
  #routeContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #routePoints = [];
  #destinations = [];

  #pointsListComponent = new EventList();
  #sortingComponent = new Sort();
  #emptyListComponent = new EmptyList();

  #pointsPresenters = new Map();

  constructor({ routeContainer, pointsModel, destinationsModel, offersModel }) {
    this.#routeContainer = routeContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#routePoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#destinationsModel.destinations];

    this.#renderRoute();
  }

  #renderEmpty() {
    render(this.#emptyListComponent, this.#routeContainer);
  }

  #renderSort() {
    render(this.#sortingComponent, this.#routeContainer);
  }

  #handlePointChange = (updatePoint) => {
    this.#routePoints = updateItem(this.#routePoints, updatePoint);
    this.#pointsPresenters.get(updatePoint.id).init(updatePoint, this.#destinations, this.#offersModel);
  };

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    this.#pointsPresenters.set(point.id, pointPresenter);
    pointPresenter.init(point, this.#destinations, this.#offersModel);
  }

  #renderPointsListContainer() {
    render(this.#pointsListComponent, this.#routeContainer);
  }

  #renderPoints() {
    for (let i = 0; i < this.#routePoints.length; i++) {
      this.#renderPoint(this.#routePoints[i]);
    }
  }

  #clearPointsList() {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  }

  #renderRoute() {
    if (this.#routePoints.length === 0) {
      this.#renderEmpty();
      return;
    }

    this.#renderSort();
    this.#renderPointsListContainer();
    this.#renderPoints();
  }
}
