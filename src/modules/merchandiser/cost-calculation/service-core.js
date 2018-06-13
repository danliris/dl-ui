import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const garmentProductServiceUri = 'master/garment-products';
const uomServiceUri = 'master/uoms';

export class ServiceCore extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "core");
  }

  getByName(name) {
    var endpoint = `${garmentProductServiceUri}?keyword=${name}`;
    return super.get(endpoint)
      .then((result) => {
        if (result && result.length > 0) {
          return result[0];
        } else {
          return null;
        }
      })
  }

  getUomByUnit(unit) {
    var endpoint = `${uomServiceUri}?keyword=${unit}`;
    return super.get(endpoint)
      .then((result) => {
        console.log(result)
        if (result && result.length > 0) {
          return result[0];
        } else {
          return null;
        }
      })
  }

}
