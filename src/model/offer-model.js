import { generateEditingForm } from '../mock/edit-form';

export default class OfferModel{
  #form = null;

  constructor (){
    this.#form = generateEditingForm();
  }

  get form () { return this.#form;}
}