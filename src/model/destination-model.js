import { generateDestination } from '../mock/destination';
import { CITIES } from '../const';

export default class DestinationModel{
  #destinations = null;

  constructor (){
    this.#destinations = Array.from({length: CITIES.length},(value, index) => generateDestination(index));
  }

  get destinations () {return this.#destinations;}
}