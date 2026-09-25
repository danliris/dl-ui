import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const getData = "GetTemporarys";
const beacukaiTemp = "beacukaitemps";

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

export class ServiceSupport extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "customs-report");
  }
  downloadExcelReport(info) {
        var endpoint = `${beacukaiTemp}/downloadExcelReportBC?typeBC=${info.typeBC}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
  }
}