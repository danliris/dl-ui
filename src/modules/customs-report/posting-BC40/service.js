import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const getData = "GetTemporarys";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "ItInven");
  }

  search(info) {
    var endpoint = `${getData}`;
    console.log(info)
    return super.list(endpoint, info);
  }

}
