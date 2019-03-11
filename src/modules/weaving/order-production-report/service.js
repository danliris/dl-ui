import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "weaving/orders/order-by-period";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "weaving");
  }

  search(month, year, unitCode, info) {
    var endpoint = `${serviceUri}/${month}/${year}/unit/${unitCode}`;
    return super.list(endpoint, info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  getPdfByPeriod(month, year, unitCode) {
    var endpoint = `${serviceUri}/${month}/${year}/unit/${unitCode}`;
    return super.getPdf(endpoint);
  }

  // create(data) {
  //   var endpoint = `${serviceUri}`;
  //   return super.post(endpoint, data);
  // }

  // update(data) {
  //   var endpoint = `${serviceUri}/${data.id}`;
  //   return super.put(endpoint, data);
  // }

  // delete(data) {
  //   var endpoint = `${serviceUri}/${data.id}`;
  //   return super.delete(endpoint, data);
  // }

  // getByCode(code) {
  //   var endpoint = `${serviceUri}?keyword=${code}`;
  //   return super.get(endpoint);
  // }
}
