import Filter from './view/filter.js';
import Info from './view/info.js';
import RoutePresenter from './presenter/-route-presenter.js';

import { RenderPosition, render } from './framework/render.js';

import PointsModel from './model/point-model.js';
import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';
import { generateFilter } from './mock/filter.js';

const siteHeaderElement = document.querySelector('.page-header');
const mainElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel();

const presenter = new RoutePresenter({
  routeContainer: eventsElement,
  pointsModel,
  destinationsModel,
  offersModel
});


const filters = generateFilter(pointsModel.points);

render(new Filter({ filters }), filtersElement);
render(new Info(), mainElement, RenderPosition.AFTERBEGIN);

presenter.init();
