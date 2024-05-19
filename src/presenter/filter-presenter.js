
import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import {filterByType} from '../utils/filter.js';
import {FILTERTYPE} from '../utils/filter.js';
import {UpdateType} from '../const';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor({filterContainer, filterModel, pointsModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FILTERTYPE.EVERYTHING,
        name: 'EVERYTHING',
        count: filterByType[FILTERTYPE.EVERYTHING](points).length,
      },
      {
        type: FILTERTYPE.PAST,
        name: 'PAST',
        count: filterByType[FILTERTYPE.PAST](points).length,
      },
      {
        type: FILTERTYPE.FUTURE,
        name: 'FUTURE',
        count: filterByType[FILTERTYPE.FUTURE](points).length,
      }
    ];
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (filterType === this.#filterModel.filter) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
