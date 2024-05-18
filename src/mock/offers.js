import {TYPES} from '../const';
import {getRandomInteger} from '../utils/common';

const generateOffer = (id, pointType) => ({
  id,
  title: pointType,
  price: getRandomInteger(10, 200)
});

export const generateOffersByType = (pointType) => ({
  type: pointType,
  offers: Array.from({length: getRandomInteger(2, 4)}).map((value, index) => generateOffer(index + 1, pointType)),
});

export const getOffersByType = () => Array.from({length: TYPES.length}).map((value, index) => generateOffersByType(TYPES[index]));
