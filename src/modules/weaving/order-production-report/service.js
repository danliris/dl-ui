import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "weaving/orders/order-report";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "weaving");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  getPdfByPeriod(_id, month, year) {
    var endpoint = `${serviceUri}/${month}/${year}/${_id}`;
    return super.getPdf(endpoint);
  }

  // getPdfByPeriod(month, year) {
  //   var endpoint = `${serviceUri}/${month}/${year}`;
  //   return super.getPdf(endpoint);
  // }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data._id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data._id}`;
    return super.delete(endpoint, data);
  }

  getByCode(code) {
    var endpoint = `${serviceUri}?keyword=${code}`;
    return super.get(endpoint);
  }
}
