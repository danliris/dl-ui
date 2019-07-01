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

const serviceUri = 'weaving/daily-operations-sizing/size-pickup';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }
  
  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  //Export to Excel
  getDataByDate(date, weavingUnitId, shiftId) {
    var periodType = "date";
    var endpoint = `${serviceUri}/${periodType}/${date}/unit-id/${weavingUnitId}/shift/${shiftId}`;
    return super.get(endpoint);
  }

  getDataByDateRange(startDate, endDate, weavingUnitId, shiftId) {
    var periodType = "daterange";
    var endpoint = `${serviceUri}/${periodType}/start-date/${startDate}/end-date/${endDate}/unit-id/${weavingUnitId}/shift/${shiftId}`;
    return super.get(endpoint);
  }

  getDataByMonth(month, weavingUnitId, shiftId) {
    var periodType = "month";
    var endpoint = `${serviceUri}/${periodType}/${month}/unit-id/${weavingUnitId}/shift/${shiftId}`;
    return super.get(endpoint);
  }

  //Export to Excel
  getXlsByDate(date, weavingUnitId, shiftId) {
    var periodType = "date";
    var endpoint = `${serviceUri}/${periodType}/date/${date}/unit-id/${weavingUnitId}/shift/${shiftId}`;
    return super.getXls(endpoint);
  }

  getXlsByDateRange(startDate, endDate, weavingUnitId, shiftId) {
    var periodType = "daterange";
    var endpoint = `${serviceUri}/${periodType}/start-date/${startDate}/end-date/${endDate}/unit-id/${weavingUnitId}/shift/${shiftId}`;
    return super.getXls(endpoint);
  }

  getXlsByMonth(month, weavingUnitId, shiftId) {
    var periodType = "month";
    var endpoint = `${serviceUri}/${periodType}/${month}/unit-id/${weavingUnitId}/shift/${shiftId}`;
    return super.getXls(endpoint);
  }
}
