import { getRandomNumber, getRandomElement } from '../utils/common.js';
import { generateDate } from './dates.js';
import { generateOffersByType} from './offers.js';
import { generateDestination } from './destination.js';
import { TYPES, DESTINATIONS, Price, OffersCount } from '../const.js';

export const generateEditForm = () => {
  const dateFrom = generateDate();
  const type = getRandomElement(TYPES);
  const destinations = Array.from({length: DESTINATIONS.length}, (value, index) => generateDestination(index));

  return ({
    'basePrice': getRandomNumber(Price.MIN,Price.MAX),
    dateFrom,
    'dateTo': generateDate(dateFrom),
    'destination': getRandomElement(destinations).id,
    'isFavorite': Boolean(getRandomNumber(0,1)),
    'offers': generateOffersByType(type, OffersCount.MIN, OffersCount.MAX),
    type,
  });
};