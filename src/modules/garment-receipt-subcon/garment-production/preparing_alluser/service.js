import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";
// import { Container } from 'aurelia-dependency-injection';
// import { Config } from "aurelia-api";

const serviceUri = "subcon-preparings";
const unitDeliveryOrderUri = "garment-subcon-unit-delivery-orders";
const unitExpenditureNoteUri = "garment-subcon-unit-expenditure-notes";
const unitReceiptNoteUri = "garment-subcon-unit-receipt-notes";
export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "garment-production");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
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
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }
}

export class PurchasingService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "purchasing-azure");
  }

  getUnitDeliveryOrderById(id) {
    var endpoint = `${unitDeliveryOrderUri}/${id}`;
    return super.get(endpoint);
  }

  getUnitExpenditureNoteById(id) {
    var endpoint = `${unitExpenditureNoteUri}/${id}`;
    return super.get(endpoint);
  }
  getUnitReceiptNote(info) {
    var endpoint = `${unitReceiptNoteUri}`;
    return super.list(endpoint, info);
  }
}

const costCalculationServiceUri = "cost-calculation-garments";
export class SalesService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "sales");
  }

  getCostCalculationByRONo(info) {
    var endpoint = `${costCalculationServiceUri}`;
    return super.list(endpoint, info);
  }
}
