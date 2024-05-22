// export const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

// export const OFFERS = [
//   'Add luggage',
//   'Switch to comfort class',
//   'Add meal',
//   'Choose seats',
//   'Add a child safety seat'
// ];

// export const CITIES = ['Magnolia', 'Greed Island', 'Soul Society', 'Amestris', 'Death City', 'Karakura', 'Z-City', 'Alubarna', 'Aincrad'];

// export const DESCRIPTIONS = [
//   'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   'Maecenas dapibus sed enim in ultrices.',
//   'Praesent non ex turpis.',
//   'Nunc mollis sed tortor a faucibus.',
//   'Morbi ac convallis erat, vel volutpat nisl.',
//   'Phasellus a interdum lacus. Aenean consectetur magna vel diam fringilla, at commodo sem placerat.',
//   'Etiam a pellentesque massa.',
//   'Sed sed nisi sed augue convallis suscipit in sed felis.',
//   'Aliquam erat volutpat.'
// ];

// export const Duration = {
//   MIN: 60,
//   HOUR: 10,
//   DAY: 3
// };

// export const DateFormat = {
//   LONG: 'YYYY-MM-DDTHH:mm',
//   SHORT: 'MMM DD'
// };

// export const Price = {
//   MIN: 0,
//   MAX: 1000
// };

// export const MILLISECONDS_IN_DAY = 86400000;

// export const MILLISECONDS_IN_HOUR = 3600000;

// export const Mode = {
//   DEFAULT: 'DEFAULT',
//   EDITING: 'EDITING'
// };

// export const UserAction = {
//   UPDATE_POINT: 'UPDATE_POINT',
//   ADD_POINT: 'ADD_POINT',
//   DELETE_POINT: 'DELETE_POINT'
// };

// export const UpdateType = {
//   PATCH: 'PATCH',
//   MAJOR: 'MAJOR',
//   INIT: 'INIT'
// };

// export const POINT_COUNT_PER_STEP = 7;

// export const ApiServiceMethod = {
//   GET: 'GET',
//   PUT: 'PUT',
//   POST: 'POST',
//   DELETE: 'DELETE'
// };

// export const TimeLimit = {
//   LOWER_LIMIT: 350,
//   UPPER_LIMIT: 1000,
// };
export const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const SortType = {
  DEFAULT: 'day',
  TIME: 'time',
  PRICE: 'price'
};

export const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'click new event to create your first point',
  [FilterType.PAST]: 'there are no past events now',
  [FilterType.PRESENT]: 'there are no present events now',
  [FilterType.FUTURE]: 'there are no future events now'
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export const ApiServiceMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
