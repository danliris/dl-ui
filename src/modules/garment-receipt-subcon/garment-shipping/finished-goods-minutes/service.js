import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "garment-shipping/receipt-subcon-finished-goods-minutes";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "packing-inventory");
  }

  search(info) {
    let endpoint = `${serviceUri}`;

    return super.list(endpoint, info);
  }

  generateExcel(args) {
    var endpoint = `${serviceUri}/download?invoiceNo=${args.invoiceNo}`;
    return super.getXls(endpoint);
  }
}
