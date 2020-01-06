import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = "finishing-printing/do-sales-items";
const productionOrderServiceUri = "sales/production-orders";
const buyerServiceUri = "master/buyers";
const storageServiceUri = "master/storages";
const materialConstructionServiceUri = "master/material-constructions";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "production-azure");
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

export class ServiceSales extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "sales");
  }

  searchProductionOrder(info) {
    var endpoint = `${productionOrderServiceUri}`;
    return super.list(endpoint, info);
  }

  getProductionOrderById(id, select) {
    var endpoint = `${productionOrderServiceUri}/${id}`;
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

  searchStorage(info) {
    var endpoint = `${storageServiceUri}`;
    return super.list(endpoint, info);
  }

  getStorageById(id, select) {
    var endpoint = `${storageServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

  searchMaterialConstruction(info) {
    var endpoint = `${materialConstructionServiceUri}`;
    return super.list(endpoint, info);
  }

  getMaterialConstructionById(id, select) {
    var endpoint = `${materialConstructionServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }
}
