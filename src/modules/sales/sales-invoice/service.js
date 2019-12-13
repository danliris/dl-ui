import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = "sales/sales-invoices";
const doSalesServiceUri = "finishing-printing/do-sales-items";
const buyerServiceUri = "master/buyers";
const currencyServiceUri = "master/currencies";
const uomServiceUri = "master/uoms";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "sales");
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

  getPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }

  getByCode(code) {
    var endpoint = `${serviceUri}?keyword=${code}`;
    return super.get(endpoint);
  }
}

export class ServiceProductionAzure extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "production-azure");
  }

  searchDOSales(info) {
    var endpoint = `${doSalesServiceUri}`;
    return super.list(endpoint, info);
  }

  getDOSalesById(id, select) {
    var endpoint = `${doSalesServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

}

export class ServiceCore extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "core");
  }

  searchBuyer(info) {
    var endpoint = `${buyerServiceUri}`;
    return super.list(endpoint, info);
  }

  getBuyerById(id, select) {
    var endpoint = `${buyerServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

  searchCurrency(info) {
    var endpoint = `${currencyServiceUri}`;
    return super.list(endpoint, info);
  }

  getCurrencyById(id, select) {
    var endpoint = `${currencyServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

  searchUom(info) {
    var endpoint = `${uomServiceUri}`;
    return super.list(endpoint, info);
  }

  getUomById(id, select) {
    var endpoint = `${uomServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

}
