import AbstractView from '../framework/view/abstract-view.js';

function createInfoTemplate() {

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Tokio &mdash; Kioto &mdash; Osaka</h1>
        <p class="trip-info__dates">Jun 18&nbsp;&mdash;&nbsp;20</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  get template() {
    return createInfoTemplate();
  }
}
