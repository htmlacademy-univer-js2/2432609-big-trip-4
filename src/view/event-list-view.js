import AbstractView from '../framework/view/abstract-view';

const createTripList = () => (
  `<ul class="trip-events__list">
  </ul>`
);

class EventListView extends AbstractView{
  get template(){
    return createTripList();
  }
}

export default EventListView;
