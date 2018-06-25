import { RestService } from '../../../utils/rest-service';

const garmentProductSingleByNameServiceUri = 'master/garment-products/read-single/product-by-name';
const uomServiceUri = 'master/uoms';

export class ServiceCore extends RestService {

  constructor(http, aggregator, config) {
    super(http, aggregator, config, "core");
  }

  getByName(name) {
    var endpoint = `${garmentProductSingleByNameServiceUri}?name=${name}`;
    return super.get(endpoint)
      .then((result) => {
        return result;
      })
  }

  getUomByUnit(unit) {
    var endpoint = `${uomServiceUri}?keyword=${unit}`;
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
