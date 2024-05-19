import AbstractView from '../framework/view/abstract-view.js';

const createMenu = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn" href="#">Table</a>
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Stats</a>
    </nav>`
);

export default class MenuView extends AbstractView {
  get template() {
    return createMenu();
  }
}
