import { getRandomElement} from '../utils/common.js';
import { DESCRIPTIONS, CITIES } from '../const.js';
import { generatePictures } from './pictures.js';

export const generateDestination = (id) =>  ({
  'id': id,
  'description': getRandomElement(DESCRIPTIONS),
  'name': CITIES[id],
  'pictures': generatePictures(),
});