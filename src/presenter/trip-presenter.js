
import {remove, render, RenderPosition} from '../framework/render';
import TripList from '../view/event-list-view';
import Sorting from '../view/sort-view';
import NoPointView from '../view/no-point-view';
import PointPresenter from './point-presenter';
import {sortPointsByType, SortType} from '../utils/common';
import {filterByType, FILTERTYPE} from '../utils/filter';
import {UpdateType, UserAction, POINT_COUNT_PER_STEP} from '../const';
import NewPointPresenter from './new-point-presenter';

class TripPresenter{
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersModel = null;
  #component = new TripList();
  #sortComponent = null;
  #noPoint = null;
  #pointPresenter = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FILTERTYPE.EVERYTHING;
  #renderedPointCount = POINT_COUNT_PER_STEP;
  constructor({container, pointsModel, destinationsModel, offersModel, filtersModel, onNewPointDestroy}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#container,
      onFavoriteChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filtersModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterByType[this.#filterType](points);
    sortPointsByType[this.#currentSortType](filteredPoints);
    return filteredPoints;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  init() {
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FILTERTYPE.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if(sortType === this.#currentSortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new Sorting({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noPoint) {
      remove(this.#noPoint);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }


  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#component.element,
      onFavoriteChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      pointsModel: this.#pointsModel,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints() {
    this.#noPoint = new NoPointView({
      filterType: this.#filterType
    });
    render(this.#noPoint, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    const points = this.points;
    const pointsCount = points.length;
    if(pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    render(this.#component, this.#container);
    this.#renderPoints(points);
  }
}

export default TripPresenter;
