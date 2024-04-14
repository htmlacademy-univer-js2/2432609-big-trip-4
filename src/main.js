import Filter from './view/filter.js';
import Info from './view/info.js';
import Presenter from './presenter/presenter.js';

import { RenderPosition, render } from './render.js';

import PointsModel from './model/point-model.js';
import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const mainElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel();

const presenter = new Presenter({
  routeContainer: eventsElement,
  pointsModel,
  destinationsModel,
  offersModel
});

render(new Info(), mainElement, RenderPosition.AFTERBEGIN);
render(new Filter(), filtersElement);

presenter.init();
