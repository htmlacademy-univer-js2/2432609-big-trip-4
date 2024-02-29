import Info from './view/info.js';
import Filter from './view/filter.js';
import { RenderPosition, render } from './render.js';
import Presenter from './presenter/presenter.js';

const mainElement = document.querySelector('.trip-main');
const eventsElement = document.querySelector('.trip-events');
const filtersElement = mainElement.querySelector('.trip-controls__filters');

const eventsPresenter = new Presenter({eventsContainer: eventsElement});

render(new Info(), mainElement, RenderPosition.AFTERBEGIN);
render(new Filter(), filtersElement);

eventsPresenter.init();