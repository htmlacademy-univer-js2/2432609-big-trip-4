import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { OFFERS } from '../const.js';

const generateOffer = () => ({
  id: crypto.randomUUID(),
  title: getRandomArrayElement(OFFERS),
  price: getRandomInteger(100, 5000)
});

export { generateOffer };