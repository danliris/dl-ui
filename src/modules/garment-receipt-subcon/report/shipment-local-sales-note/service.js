import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";

const serviceUri =
  "garment-shipping/receipt-subcon/shipment-local-sales-note-report";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "packing-inventory");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  generateExcel(args) {
    var endpoint = `${serviceUri}/download?dateFrom=${args.dateFrom}&dateTo=${args.dateTo}`;
    return super.getXls(endpoint);
  }
}
