import {getDestinations} from '../mock/destinations';
import Observable from '../framework/observable';

export default class DestinationsModel extends Observable{
  #destinations = getDestinations();
  get destinations(){
    return this.#destinations;
  }
}
