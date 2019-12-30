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
  
    getReportXls(month) {
      var endpoint = `${serviceUri}/get-warping-production-report`;
      var query = '';
      
      if (month) {
        if (query === '') query = `month=${(month)}`;
        else query = `${query}&month=${(month)}`;
      }

      if (query !== '')
        endpoint = `${serviceUri}/get-warping-production-report?${query}`;
      return super.getXls(endpoint);
    }
  }
  