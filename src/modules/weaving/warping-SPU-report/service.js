import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import {
  debug
} from 'util';
var moment = require('moment');

const serviceUri = 'weaving/daily-operations-spu';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  getReportData(info) {
    var endpoint = `${serviceUri}/get-spu-daily-operation-report`;
    return super.list(endpoint, info);
  }

  generateExcel(info) {
    
    var endpoint = `${serviceUri}/get-spu-daily-operation-report/download?fromDate=${info.fromDate}&toDate=${info.toDate}&shift=${info.shift}`;
           
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
        if (info.machineSizing && info.machineSizing !== "") {
          if (query === '') query = `machineSizing=${info.machineSizing}`;
          else query = `${query}&machineSizing=${info.machineSizing}`;
      }
      if (info.groupui && info.groupui !== "") {
        if (query === '') query = `groupui=${info.groupui}`;
        else query = `${query}&groupui=${info.groupui}`;
      }
     
      
        if (query !== '')
        endpoint = `${serviceUri}/get-warping-daily-operation-report/download?${query}`;
    
    return super.getXls(endpoint);
  }
}
