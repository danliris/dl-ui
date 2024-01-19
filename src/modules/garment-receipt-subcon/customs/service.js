import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = "garment-subcon-custom-outs";
const serviceUriBUK = "garment-subcon-unit-expenditure-notes";

export class Service extends RestService {
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

  getBUK(info) {
    var endpoint = `${serviceUriBUK}`;
    return super.list(endpoint, info);
  }
}

const serviceLocalSalesNote =
  "garment-shipping/receipt-subcon-local-sales-notes";
export class PackingInventoryService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "packing-inventory");
  }

  getLocalSalesNote(info) {
    var endpoint = `${serviceLocalSalesNote}`;
    return super.list(endpoint, info);
  }
}
