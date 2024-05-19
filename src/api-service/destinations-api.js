import ApiService from '../framework/api-service.js';
import {ApiServiceMethod} from '../const';

export default class DestinationsApiService extends ApiService{
  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  async updateDestinations(destination) {
    const response = await this._load({
      url: `destinations/${destination.id}`,
      method: ApiServiceMethod.PUT,
      body: JSON.stringify(destination),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }
}
