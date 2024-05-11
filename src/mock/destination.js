import { DESCRIPTIONS, CITIES } from '../const.js';
import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';

const generatePictures = (city) => Array.from({length: getRandomInteger(2, 4)}, () => ({
  src: `https://loremflickr.com/248/152?random=${getRandomInteger(100, 200)}`,
  description: `${city} view`
}));

const generateDestination = () => {
  const city = getRandomArrayElement(CITIES);

  return {
    id: crypto.randomUUID(),
    description: getRandomArrayElement(DESCRIPTIONS),
    name: city,
    pictures: generatePictures(city)
  };
};

export { generateDestination };
