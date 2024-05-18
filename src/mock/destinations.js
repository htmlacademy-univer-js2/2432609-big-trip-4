import {getRandomInteger} from '../utils/common';
import {CITIES, DESCRIPTIONS} from '../const';

const generateDescription = () => {
  let description = '';
  description = DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
  return description;
};

const generateMockPhotos = (count, city) => Array.from({length: count}, () => (
  {
    src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
    description: `${city} description`
  }
));

const getPhotos = (city) => {
  const count = getRandomInteger(2, 4);
  return generateMockPhotos(count, city);
};

const generateDestination = (id) => ({
  id,
  description: generateDescription(),
  city: CITIES[id],
  photos: getPhotos()
});

export const getDestinations = () => Array.from({length: CITIES.length}).map((city, id) => generateDestination(id));

export const destinations = getDestinations();
