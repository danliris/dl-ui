
// import { inject, Lazy } from 'aurelia-framework';
// import { HttpClient } from 'aurelia-fetch-client';
// import { Config } from "aurelia-api";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "weaving/movements/beam";
// const qCserviceUri = 'finishing-printing/quality-control/fabrics';

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  // getById(Id, number) {
  //   var endpoint = `${serviceUri}/${Id}/beam-number/${number}`;
  //   return super.get(endpoint);
  // }

  // searchQC(info) {
  //     var endpoint = `${qCserviceUri}`;
  //     return super.list(endpoint, info);
  // }
}
