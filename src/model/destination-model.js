import { generateDestination } from '../mock/destination';

export default class DestinationsModel {
  constructor(destinationsCount = 3) {
    this.destinations = Array.from({length: destinationsCount}, generateDestination);
  }

  getAll() {
    return this.destinations;
  }

  findById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
// Path: src/model/point-model.js
