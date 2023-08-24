import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "sewing-outs";
export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "garment-production");
  }

  search(info) {
    var endpoint = `${serviceUri}/monitoring-withUTC`;
    return super.list(endpoint, info);
  }

  generateExcel(info) {
    var endpoint = `${serviceUri}/download-withUTC?unit=${info.unit}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
    return super.getXls(endpoint);
  }
}
