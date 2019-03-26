import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUriEstimatedProduction = "weaving/estimation-productions";
const serviceUriOrderDocument = "weaving/orders/order-by-period";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  searchSOP(month, year, unitId, status) {
    status = "OPEN-ORDER";
    var endpoint = `${serviceUriOrderDocument}/${month}/${year}/unit/${unitId}/status/${status}`;
    return super.get(endpoint);
  }

  searchEP(info) {
    var endpoint = `${serviceUriEstimatedProduction}`;
    return super.list(endpoint);
  }

  getById(Id) {
    var endpoint = `${serviceUriEstimatedProduction}/${Id}`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUriEstimatedProduction}`;
    return super.post(endpoint, data);
  }

  update(data) {
    var endpoint = `${serviceUriEstimatedProduction}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUriEstimatedProduction}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getByCode(code) {
    var endpoint = `${serviceUriEstimatedProduction}?keyword=${code}`;
    return super.get(endpoint);
  }

  getUnitById(Id) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("core");
    var _serviceUri = `master/units/${Id}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }
}
