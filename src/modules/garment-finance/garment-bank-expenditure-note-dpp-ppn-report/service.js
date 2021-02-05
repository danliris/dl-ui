import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "dpp-vat-bank-expenditure-notes";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    let endpoint = `${serviceUri}/report`;
    return super.list(endpoint, info);
  }

  generateXls(info) {
    let endpoint = `${serviceUri}/report/download/xls`;
    return super.list(endpoint, info);
  }
}
