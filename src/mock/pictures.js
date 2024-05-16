import { getRandomElement, getRandomNumber } from '../utils/common.js';
import { PICTURE_DISCRIPTIONS, PicturesInfo } from '../const.js';

const generatePicture = () => ({
  'src': `https://picsum.photos/248/152?r=${getRandomNumber(0, PicturesInfo.SRC)}`,
  'description': getRandomElement(PICTURE_DISCRIPTIONS),
});

export const generatePictures = () => Array.from({length: PicturesInfo.COUNT}, generatePicture);
