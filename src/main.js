import {render, RenderPosition} from './framework/render';
import TripPresenter from './presenter/trip-presenter';
import FilterView from './view/filter-view';
import PointModel from './model/point-model';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const pointsModel = new PointModel();
const tripPresenter = new TripPresenter({container: tripContainer, pointsModel: pointsModel});

render(new FilterView(), filterContainer, RenderPosition.BEFOREEND);
tripPresenter.init();
