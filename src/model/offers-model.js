import {UpdateType} from '../const';
import Observable from '../framework/observable';

export default class OffersModel extends Observable{
  #offersApiService = null;
  #offers = [];
  constructor({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;
  }

  get offers(){
    return this.#offers;
  }

  async init(){
    try{
      this.#offers = await this.#offersApiService.offers;
    } catch (error){
      this.#offers = null;
    }
    this._notify(UpdateType.INIT);
  }
}
