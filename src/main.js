import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/point-model';
import HeaderPresenter from './presenter/header-presenter';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewPointButtonView from './view/new-point-button-view';
import {render} from './framework/render';
import PointsApiService from './api-service/points-api';
import DestinationsApiService from './api-service/destinations-api';
import OffersApiService from './api-service/offers-api';

const AUTHORIZATION = 'Basic gq0Af3hqaR';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const tripContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const pointsModel = new PointModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
const filtersModel = new FilterModel();
const tripPresenter = new TripPresenter({
  container: tripContainer,
  pointsModel: pointsModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
  filtersModel: filtersModel,
  onNewPointDestroy: handleNewPointClose
});
const filterPresenter = new FilterPresenter({
  filterContainer: headerContainer.querySelector('.trip-controls__filters'),
  filterModel: filtersModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

const headerPresenter = new HeaderPresenter(headerContainer, pointsModel.points, destinationsModel.destinations);
headerPresenter.init();
filterPresenter.init();
tripPresenter.init();
offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().finally(() => {
      render(newPointButtonComponent, headerContainer);
    });
  });
});
