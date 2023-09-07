import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = "weaving/beam-stocks";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  search(info) {
    var endpoint =  `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getByMonthYear(info) {
    var endpoint = `${serviceUri}/monthYear`;
    return super.list(endpoint, info);
  }

  generateExcel(info) {
    var endpoint = `${serviceUri}/download?datefinish=${info.datefinish}&datestart=${info.datestart}&monthId=${info.monthId}&shift=${info.shift}&year=${info.year}`;
    return super.getXls(endpoint);
  }

}
