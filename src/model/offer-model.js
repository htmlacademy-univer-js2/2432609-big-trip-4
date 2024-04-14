import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { OFFERS } from '../const.js';

const OfferModel = () => ({
  id: crypto.randomUUID(),
  title: getRandomArrayElement(OFFERS),
  price: getRandomInteger(100, 500)
});

export default OfferModel;

// Path: src/model/point-model.js
