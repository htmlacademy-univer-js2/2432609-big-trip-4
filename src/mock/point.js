import { getRandomNumber, getRandomElement } from '../utils/common.js';
import { generateOffersByType } from './offer.js';
import { TYPES, Price, CITIES} from '../const.js';
import { generateDate } from './date.js';
import {nanoid} from 'nanoid';
import { generateDestination } from './destination';

export const generatePoint = () => {
  const type = getRandomElement(TYPES);
  const dateFrom = generateDate();
  const destinations = Array.from({length: CITIES.length}, (value, index) => generateDestination(index));

  return ({
    'basePrice': getRandomNumber(Price.MIN, Price.MAX),
    dateFrom,
    'dateTo': generateDate(dateFrom),
    'destination': getRandomElement(destinations).id,
    'id': nanoid(),
    'isFavourite': Boolean(getRandomNumber(0,1)),
    'offers': generateOffersByType(type),
    type,
  });
};