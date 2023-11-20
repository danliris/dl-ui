import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "log-history";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "inventory-azure");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  generateExcel(info) {
    var endpoint = `${serviceUri}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
    return super.getXls(endpoint);
  }
}
