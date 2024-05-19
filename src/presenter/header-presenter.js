import {render, RenderPosition} from '../framework/render';
import MenuView from '../view/menu-view';
import TripInfoView from '../view/trip-info-view';

export default class Header{
  #headerContainer = null;
  #menuComponent = null;
  #points = null;
  #destinations = null;


  constructor(headerContainer, points, destinations){
    this.#headerContainer = headerContainer;
    this.#points = points;
    this.#destinations = destinations;
    this.#menuComponent = new MenuView();
  }

  init(){
    if (this.#points.length !== 0) {
      render(new TripInfoView(this.#points, this.#destinations), this.#headerContainer, RenderPosition.AFTERBEGIN);
    }
    render(this.#menuComponent, this.#headerContainer.querySelector('.trip-controls__navigation'));
  }
}

