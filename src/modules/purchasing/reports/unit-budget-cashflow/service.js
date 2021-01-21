import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "budget-cashflows";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(arg) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, arg);
  }

  getItems(args) {
    let endpoint = `${serviceUri}/items`;
    return super.list(endpoint, args);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  update(data) {
    var endpoint = `${serviceUri}`;
    return super.put(endpoint, data);
  }

  createInitialCashBalance(data) {
    var endpoint = `${serviceUri}/initial-cash-balance`;
    return super.post(endpoint, data);
  }

  updateInitialCashBalance(data) {
    var endpoint = `${serviceUri}/initial-cash-balance`;
    return super.put(endpoint, data);
  }

  // search(unitId, date) {
  //   return fetch(
  //     "http://localhost:9000/src/modules/purchasing/reports/unit-budget-cashflow/dummy.json"
  //   ).then((response) => response.json());
  // }

  // getXls(query) {
  //   let endpoint = `${serviceUri}/unit/xls?unitId=${query.unitId}&date=${query.date}`;
  //   return super.getXls(endpoint);
  // }

  getPdf(query) {
    let endpoint = `${serviceUri}/download/pdf?unitId=${query.unitId}&date=${query.date}`;
    return super.getPdf(endpoint);
  }
}
