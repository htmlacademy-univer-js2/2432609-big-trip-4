import {getOffersByType} from '../mock/offers';
import Observable from '../framework/observable';

export default class OffersModel extends Observable{
  #offers = getOffersByType();

  get offers(){
    return this.#offers;
  }
}
