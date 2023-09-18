import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";
import moment from "moment";

const serviceUri = "garment-subcon-unit-delivery-orders";
const UrnUri = "garment-subcon-unit-receipt-notes";
const garmentURNforUnitDO = "garment-unit-receipt-notes/unit-delivery-order";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

  search(info) {
    var endpoint = `${serviceUri}/by-user`;
    return super.list(endpoint, info);
  }

  searchDOItems(info) {
    var endpoint = `${UrnUri}/unit-delivery-order`;
    return super.list(endpoint, info);
  }

  searchMoreDOItems(info) {
    var endpoint = `${UrnUri}/unit-delivery-order/more`;
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

  getPdfById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.getPdf(endpoint);
  }

  searchUnitReceiptNote(info) {
    var endpoint = `${unitReceiptNoteUri}`;
    return super.list(endpoint, info);
  }

  getgarmentURNforUnitDO(info) {
    var endpoint = `${garmentURNforUnitDO}`;
    return super.list(endpoint, info);
  }
}

const UnitServiceUri = "master/units";
export class CoreService extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "core");
  }

  getSampleUnit(info) {
    var endpoint = `${UnitServiceUri}`;
    return super.list(endpoint, info);
  }
}
