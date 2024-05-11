const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Alubarna', 'Tokio', 'Kioto', 'Osaka', 'Konohagakure', 'Magnolia', 'Reole'];
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];
const OFFERS = ['Upgrade to a business class', 'Add luggage', 'Add meal', 'Choose seats', 'Travel by train'];

const Duration = {
  MIN: 60,
  HOUR: 10,
  DAY: 3
};

const DateFormat = {
  LONG: 'YYYY-MM-DDTHH:mm',
  SHORT: 'MMM DD'
};

const POINT_COUNT = 5;

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export {TYPES, CITIES, DESCRIPTIONS, POINT_COUNT, OFFERS, MODE, Duration, DateFormat};


