import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

//const serviceUriEstimated = "weaving/estimation-productions/WeavingEstimated";
const serviceUriEstimated = "weaving/daily-operation-sizing-machine/WeavingDailyOperationMachineSizing";

//const serviceUriOrder = "weaving/orders/get-by-unit-period";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  searchOpenOrders(info) {
    var endpoint =  `${serviceUriOrder}`;
    return super.list(endpoint, info);
  }

  searchEstimatedProductions(info) {
    var endpoint = `${serviceUriEstimated}`;
    return super.list(endpoint, info);
  }

  getById(Id) {
    var endpoint = `${serviceUriEstimated}/${Id}`;
    return super.get(endpoint);
  }


  getFilter(info) {
    var endpoint = `${serviceUriEstimated}/monthYear`;
    return super.list(endpoint,info);
    
  }
  
  getByIdEdit(Id) {
    var endpoint = `${serviceUriEstimated}/edit/${Id}`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUriEstimated}`;
    return super.post(endpoint, data);
  }

  update(data) {
    var endpoint = `${serviceUriEstimated}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUriEstimated}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getByCode(code) {
    var endpoint = `${serviceUriEstimated}?keyword=${code}`;
    return super.get(endpoint);
  }
 
  getReportXls(month, yearPeriode) {
    var endpoint = `${serviceUriEstimated}/download`;
    var query = '';

    if (month) {
      if (query === '') query = `month=${month}`;
      else query = `${query}&month=${wmonth}`;
    }
    if (yearPeriode) {
      if (query === '') query = `yearPeriode=${(yearPeriode)}`;
      else query = `${query}&yearPeriode=${(yearPeriode)}`;
    }
    
    if (query !== '') {
      endpoint = `${serviceUriEstimated}/download?${query}`;
    }

    return super.getXls(endpoint);
  }

}
