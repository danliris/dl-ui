import {
  inject,
  Lazy
} from "aurelia-framework";
import {
  HttpClient
} from "aurelia-fetch-client";
import {
  RestService
} from "../../../utils/rest-service";
import {
  debug
} from 'util';
var moment = require('moment');

const serviceUri = 'weaving/daily-operations-warping';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  getReportData(info) {
    var endpoint = `${serviceUri}/get-warping-production-report`;
    return super.list(endpoint, info);
  }

  generateExcel(info) {
    
    var endpoint = `${serviceUri}/get-warping-production-report/download?fromDate=${info.fromDate}&toDate=${info.toDate}&shift=${info.shift}`;
           
    var query = '';

        if (info.fromDate && info.fromDate !== "") {
            if (query === '') query = `fromDate=${info.fromDate}`;
            else query = `${query}&fromDate=${info.dateFrom}`;
        }
        if (info.toDate && info.toDate !== "") {
            if (query === '') query = `toDate=${info.toDate}`;
            else query = `${query}&toDate=${info.toDate}`;
        }
        if (info.shift && info.shift !== "") {
            if (query === '') query = `shift=${info.shift}`;
            else query = `${query}&shift=${info.shift}`;
        }
        if (info.mcNo && info.mcNo !== "") {
          if (query === '') query = `mcNo=${info.mcNo}`;
          else query = `${query}&mcNo=${info.mcNo}`;
      }
      if (info.sp && info.sp !== "") {
        if (query === '') query = `sp=${info.sp}`;
        else query = `${query}&sp=${info.sp}`;
      }
      if (info.threadNo && info.threadNo !== "") {
        if (query === '') query = `threadNo=${info.threadNo}`;
        else query = `${query}&threadNo=${info.threadNo}`;
      }
      if (info.code && info.code !== "") {
        if (query === '') query = `code=${info.code}`;
        else query = `${query}&code=${info.code}`;
      }
        if (query !== '')
        endpoint = `${serviceUri}/get-warping-production-report/download?${query}`;
    
    return super.getXls(endpoint);
  }
}
