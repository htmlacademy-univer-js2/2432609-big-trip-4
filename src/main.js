import {render} from './framework/render.js';
import {generateFilter} from './mock/filter.js';
import Filter from './view/filter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const tripPresenter = new TripInfoPresenter();

const pointsModel = new PointModel();
const destinationsModel = new DestinationModel();

const filters = generateFilter(pointsModel.points);

render(new Filter(filters), siteHeaderElement.querySelector('.trip-controls__filters'));

tripPresenter.init(siteMainElement.querySelector('.trip-events'), pointsModel, destinationsModel);
