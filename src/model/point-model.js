import { getRandomInteger, getRandomDate, getRandomArrayElement } from '../utils.js';
import { TYPES } from '../const.js';

const generateOfferIds = (count) => Array.from({length: count}, () => crypto.randomUUID());

const PointModel = () => {
  const date = getRandomDate();

  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(500, 2500),
    dateFrom: date,
    dateTo: getRandomDate(date),
    destination: crypto.randomUUID(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOfferIds(getRandomInteger(0, 5)),
    type: getRandomArrayElement(TYPES)
  };
};

export default PointModel;

// Path: src/model/point-model.js
