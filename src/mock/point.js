import {getRandomInteger, getRandomItem, getRandomIntegerFromRange} from '../utils/common';
import { humanizeTaskDueDate, getDate } from '../utils/point';
import { Price } from '../const';
import {destinations} from './destinations';
import {getOffersByType} from './offers';

const generateFavorite = () => {
  const g = getRandomInteger(1,2);
  return g === 1;
};

const offersByType = getOffersByType();

export const generatePoint = () => {
  const offersByTypePoint = getRandomItem(offersByType);
  const allOfferIdsByTypePoint = offersByTypePoint.offers.map((offer) => offer.id);
  return {
    id: crypto.randomUUID(),
    destinationId: getRandomItem(destinations).id,
    startDate: humanizeTaskDueDate(getDate(false)),
    endDate: humanizeTaskDueDate(getDate(true)),
    price: getRandomIntegerFromRange(Price.MIN, Price.MAX),
    isFavorite: generateFavorite(),
    arrayOffersIds: Array.from({length: getRandomInteger(0, allOfferIdsByTypePoint.length)}).map(() =>
      allOfferIdsByTypePoint[getRandomInteger(0, allOfferIdsByTypePoint.length - 1)]),
    type: offersByTypePoint.type
  };
};
