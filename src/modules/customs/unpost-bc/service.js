import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "beacukaitemps";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "customs-report");
  }

  search(info) {
    var endpoint = `${serviceUri}/to-delete`;
    return super.list(endpoint, info);
  }

  delete(info) {
    var endpoint = `${serviceUri}/delete`;
    return super.put(endpoint, info);
  }
}
