import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "cost-calculation-garments";

class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "sales");
  }

  searchCC(info) {
      var endpoint = `${serviceUri}`;
      return super.list(endpoint, info);
    }

  getById(id) {
    const endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }
}

const serviceUriGarment = "cutting-ins";
const serviceUriCloseOrder = "close-orders";

class GarmentService extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "garment-production");
  }

  searchCutting(info) {
      var endpoint = `${serviceUriGarment}`;
      return super.list(endpoint, info);
    }

  search(info) {
      var endpoint = `${serviceUriCloseOrder}`;
      return super.list(endpoint, info);
    }

  getById(id) {
    const endpoint = `${serviceUriCloseOrder}/${id}`;
    return super.get(endpoint);
  }

   create(data) {
    var endpoint = `${serviceUriCloseOrder}`;
    return super.post(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUriCloseOrder}/${data.id}`;
    return super.delete(endpoint, data);
  }
}

export { Service, GarmentService };