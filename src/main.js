import Filter from './view/filter.js';
import Info from './view/info.js';
import Presenter from './presenter/presenter.js';

import { RenderPosition, render } from './render.js';

import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offer-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const mainElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const destinationModel = new DestinationModel();
const offerModel = new OfferModel();
const pointModel = new PointModel();

const presenter = new Presenter({
  routeContainer: eventsElement,
  pointModel,
  destinationModel,
  offerModel
});

render(new Info(), mainElement, RenderPosition.AFTERBEGIN);
render(new Filter(), filtersElement);

presenter.init();
