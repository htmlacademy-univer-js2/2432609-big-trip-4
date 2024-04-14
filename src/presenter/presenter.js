import { render } from '../render.js';
import EditForm from '../view/edit-form.js';
import EventList from '../view/event-list.js';
import Event from '../view/event.js';
import Sort from '../view/sort.js';


export default class RoutePresenter {
  pointsListComponent = new EventList();
  sortingComponent = new Sort();

  constructor({ routeContainer, pointsModel, destinationsModel, offersModel }) {
    this.routeContainer = routeContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.routePoints = [...this.pointsModel.get()];
    this.destinations = [...this.destinationsModel.get()];
    this.offers = [...this.offersModel.get()];

    render(this.sortingComponent, this.routeContainer);
    render(this.pointsListComponent, this.routeContainer);

    render(new EditForm({
      point: this.routePoints[0],
      destinations: this.destinations,
      offerItem: this.offersModel.getByType(this.routePoints[0].type)
    }),
    this.pointsListComponent.getElement());

    for (let i = 1; i < this.routePoints.length; i++) {
      render(new Event({
        point: this.routePoints[i],
        destinations: this.destinations,
        offers: this.offersModel.getByType(this.routePoints[i].type).offers
      }),
      this.pointsListComponent.getElement());
    }
  }
}
