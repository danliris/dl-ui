import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "budget-cashflows/divisions";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(arg) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, arg);
  }

  // search() {
  //   return fetch(
  //     "http://localhost:9000/src/modules/purchasing/reports/division-budget-cashflow/dummy.json"
  //   ).then((response) => response.json());
  // }

  // getDivision(query) {
  //   let endpoint = `${serviceUri}/division`;
  //   return super.list(endpoint, query);
  // }

  // getXls(query) {
  //   let endpoint = `${serviceUri}/division/xls?divisionId=${query.divisionId}&dueDate=${query.dueDate}`;
  //   return super.getXls(endpoint);
  // }

  // getPdf(query) {
  //   let endpoint = `${serviceUri}/division/pdf?divisionId=${query.divisionId}&dueDate=${query.dueDate}`;
  //   return super.getPdf(endpoint);
  // }
}
