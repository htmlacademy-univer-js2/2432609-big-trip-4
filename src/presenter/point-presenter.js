import PointView from '../view/point-view.js';
import EditFormView from '../view/edit-form.js';
import { render, replace, remove } from '../framework/render.js';
import { onEscape } from '../utils/common.js';
import { MODE } from '../const.js';

export default class PointPresenter {
  #eventsList = null;
  #point = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #changeData = null;
  #changeMode = null;

  #mode = MODE.DEFAULT;

  constructor (eventsList, changeData, changeMode) {
    this.#eventsList = eventsList;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, destinations) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point, destinations);
    this.#pointEditComponent = new EditFormView(point, destinations);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#pointEditComponent.setFormSubmitHandler(this.#handleEditFormSubmit);
    this.#pointEditComponent.setFormCloseHandler(this.#handleEditFormClose);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#eventsList);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  #replacePointToEditForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);

    this.#changeMode();
    this.#mode = MODE.EDITING;
  };

  #replaceEditFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = MODE.DEFAULT;
  };

  #handleEscKeyDown = (evt) => {
    if (onEscape(evt)) {
      evt.preventDefault();

      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#handleEscKeyDown);
    }
  };

  #handleEditFormClose = () => {
    this.#replaceEditFormToPoint();
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavourite: !this.#point.isFavourite});
  };

  #handleEditFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceEditFormToPoint();
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };
}