import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service'; 

const serviceUri = 'purchase-oders/reports/units';
const serviceUriDetail = 'purchase-oders/reports/subUnits';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing");
  }

  getDataUnitnoDate() {
    var endpoint = `${serviceUri}`;
    return super.get(endpoint);
  }

  getDataUnit(sdate, edate) {
    var endpoint = `${serviceUri}?dateFrom=${sdate}&dateTo=${edate}`;
    return super.get(endpoint);
  }

  getDetailUnit(sdate, edate, unit) {
    var endpoint = `${serviceUriDetail}?unit=${unit}&dateFrom=${sdate}&dateTo=${edate}`;
    return super.get(endpoint);
  }

  getDetailUnitnoDate(unit) {
    var endpoint = `${serviceUriDetail}?unit=${unit}`;
    return super.get(endpoint);
  }

  generateExcelnoDate() {
    var endpoint = `${serviceUri}`;
    return super.getXls(endpoint);
  }

  generateExcel(sdate, edate) {
    var endpoint = `${serviceUri}?dateFrom=${sdate}&dateTo=${edate}`;
    return super.getXls(endpoint);
  }

  generateExcelnoDate2() {
    var endpoint = `${serviceUriDetail}`;
    return super.getXls(endpoint);
  }

  generateExcel2(sdate, edate, unit) {
    var endpoint = `${serviceUriDetail}?unit=${unit}&dateFrom=${sdate}&dateTo=${edate}`;
    return super.getXls(endpoint);
  }

}
