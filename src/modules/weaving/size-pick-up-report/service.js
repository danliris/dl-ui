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

  getDataByDateRange(startDate, endDate, weavingUnitId, shiftId) {
    var periodType = "daterange";
    var endpoint = `${serviceUri}/${periodType}/start-date/${startDate}/end-date/${endDate}/unit-id/${weavingUnitId}/shift/${shiftId}`;
    console.log(endpoint);
    return super.get(endpoint);
  }

  getDataByMonth(month, weavingUnitId, shiftId) {
    var periodType = "month";
    var endpoint = `${serviceUri}/${periodType}/${month}/unit-id/${weavingUnitId}/shift/${shiftId}`;
    console.log(endpoint);
    return super.get(endpoint);
  }

  getPdfByDateRange(StartDate, EndDate, WeavingUnitId, ShiftId) {
    var periodType = "daterange";
    var endpoint = `${serviceUri}/${periodType}/start-date/${StartDate}/end-date/${EndDate}/unit-id/${WeavingUnitId}/shift/${ShiftId}`;
    return super.getPdf(endpoint);
  }

  getPdfByMonth(Month, WeavingUnitId, ShiftId) {
    var periodType = "month";
    var endpoint = `${serviceUri}/${periodType}/${Month}/unit-id/${WeavingUnitId}/shift/${ShiftId}`;
    return super.getPdf(endpoint);
  }
}
