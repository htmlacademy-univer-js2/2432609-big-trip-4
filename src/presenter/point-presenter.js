import PointView from '../view/point-view';
import EditingPointView from '../view/edit-point-view';
import {remove, render, replace} from '../framework/render';
import {UpdateType, UserAction, Mode} from '../const';

export default class PointPresenter{
  #pointListContainer = null;
  #handleFavoriteChange = null;
  #handleModeChange = null;
  #pointComponent = null;
  #editPointComponent = null;
  #point = null;
  #mode = Mode.DEFAULT;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #destinations = null;
  #offers = null;
  constructor({pointListContainer, pointsModel, destinationsModel, offersModel, onFavoriteChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleFavoriteChange = onFavoriteChange;
    this.#handleModeChange = onModeChange;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init = (point) => {
    this.#point = point;
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
      destinations: this.#destinations,
      offers: this.#offers
    });
    this.#editPointComponent = new EditingPointView({
      point: this.#point,
      onFormSubmit: this.#handleSubmitForm,
      onDeleteClick: this.#handleDeleteClick,
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
      replace(this.#pointComponent, prevEditPointComponent);
      this.#mode = Mode.DEFAULT;
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

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }
    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#editPointComponent.shake(resetFormState);
  }

  #onEscKeyDown = (event) => {
    if(event.key === 'Escape' || event.key === 'Esc'){
      event.preventDefault();
      this.#editPointComponent.reset(this.#point);
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
    this.#handleFavoriteChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#replacePointToEditPoint();
  };

  #handleSubmitForm = (update) => {
    this.#handleFavoriteChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update);
    this.#editPointComponent.reset(this.#point);
    this.#replaceEditPointToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#handleFavoriteChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
