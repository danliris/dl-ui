import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service'; 

const serviceUri = 'master/garment-products';

export class ServiceCore extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "core");
  }

  getByName(name) {
    var endpoint = `${serviceUri}?keyword=${name}`;
    return super.get(endpoint)
    .then((result) => {
        if (result && result.length > 0) {
            return result[0];
        } else {
            return null;
        }
    })
  }

}
