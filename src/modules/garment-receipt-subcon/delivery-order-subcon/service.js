import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = "garment-subcon-delivery-orders";
const serviceUriPR = "garment-purchase-requests";

class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

  search(info) {
    var endpoint = `${serviceUri}/by-user`;
    return super.list(endpoint, info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

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

  getPR(info) {
    var endpoint = `${serviceUriPR}/dynamic-subcon`;
    return super.list(endpoint, info);
  }

  // getPurchaseOrderById(id, select) {
  //     var config = Container.instance.get(Config);
  //     var _endpoint = config.getEndpoint("garment-purchasing");
  //     var _serviceUri = `purchase-orders/by-user/${id}`;

  //     return _endpoint.find(_serviceUri, { "select": select })
  //         .then(result => {
  //             return result.data;
  //         });
  // }
}

const serviceCCUri = "cost-calculation-garments";
class SalesService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "sales");
  }

  getMatelialCCbyId(info) {
    var endpoint = `${serviceCCUri}/materials/dynamic`;
    return super.list(endpoint, info);
  }
}

export { Service, SalesService };
