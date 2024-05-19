import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class DestinationModel extends Observable{
  #destinationsApiService = null;
  #destinations = [];
  constructor({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations(){
    return this.#destinations;
  }

  async init(){
    try{
      this.#destinations = await this.#destinationsApiService.destinations;
    } catch (error){
      this.#destinations = null;
    }
    this._notify(UpdateType.INIT);
  }
}
