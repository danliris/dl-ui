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
    Container
  } from "aurelia-dependency-injection";
  import {
    Config
  } from "aurelia-api";
  import {
    debug
  } from 'util';
  
  const serviceUri = 'weaving/daily-operations-loom-machine-report';
  
  export class Service extends RestService {
  
    constructor(http, aggregator, config, endpoint) {
      super(http, aggregator, config, "weaving");
    }
  
   
  
    getReportData(info) {
      var endpoint = `${serviceUri}/get-loom-daily-operation-report`;
  
      return super.list(endpoint, info);
    }
  
    generateExcel(info) {
      var endpoint = `${serviceUri}/get-loom-daily-operation-report/download?shift=${info.shift}&jenisMesin=${info.jenisMesin}&namaBlok=${info.namaBlok}&namaMtc=${info.namaMtc}&operatornya=${info.operatornya}&sp=${info.sp}&fromDate=${info.fromDate}&toDate=${info.toDate}`;
      return super.getXls(endpoint);
    }
  }
  