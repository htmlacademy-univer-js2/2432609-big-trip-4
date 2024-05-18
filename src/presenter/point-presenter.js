import PointView from '../view/point-view';
import EditPointView from '../view/edit-point-view';
import {remove, render, replace} from '../framework/render';
import { Mode } from '../const';

export default class PointPresenter{
  #pointListContainer = null;
  #handleFavoriteChange = null;
  #handleModeChange = null;
  #pointComponent = null;
  #editPointComponent = null;
  #point = null;
  #mode = Mode.DEFAULT;
  #pointsModel = null;
  #destinations = null;
  #offers = null;
  constructor({pointListContainer, pointsModel, onFavoriteChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleFavoriteChange = onFavoriteChange;
    this.#handleModeChange = onModeChange;
    this.#pointsModel = pointsModel;
  }

  init = (point) => {
    this.#point = point;
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
      destinations: this.#destinations,
      offers: this.#offers
    });
    this.#editPointComponent = new EditPointView({
      point: this.#point,
      onFormSubmit: this.#handleSubmitForm,
      destinations: this.#destinations,
      offers: this.#offers
    });

    if (prevPointComponent === null || prevEditPointComponent === null){
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT){
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING){
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  };

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditPointToPoint();
    }
  }

  #onEscKeyDown = (event) => {
    if(event.key === 'Escape' || event.key === 'Esc'){
      event.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditPointToPoint();
    }
  };

  #replacePointToEditPoint = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceEditPointToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #handleFavoriteClick = () => {
    this.#handleFavoriteChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#replacePointToEditPoint();
  };

  #handleSubmitForm = (point) => {
    this.#handleFavoriteChange(point);
    this.#editPointComponent.reset(this.#point);
    this.#replaceEditPointToPoint();
  };
}
