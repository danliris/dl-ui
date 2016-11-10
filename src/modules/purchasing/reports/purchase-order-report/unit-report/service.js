import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../../rest-service';
import {SecureService} from '../../../../../utils/secure-service';

const serviceUri = require('../../../../../host').core + '/v1/purchasing/po/reports/units';
const serviceUriDetail = require('../../../../../host').core + '/v1/purchasing/po/reports/subUnits';

export class Service extends SecureService {

  constructor(http, aggregator) {
    super(http, aggregator);
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

  getDetailUnitnoDate(unit)
  {
    var endpoint = `${serviceUriDetail}?unit=${unit}`;
    return super.get(endpoint);
  }

  generateExcel(sdate, edate) {
    var endpoint = `${serviceUri}?dateFrom=${sdate}&dateTo=${edate}`;
    return super.getXls(endpoint);
  }

  generateExcelnoDate2()
  {
    var endpoint = `${serviceUriDetail}`;
    return super.getXls(endpoint);
  }

  generateExcel2(sdate, edate, unit) {
    var endpoint = `${serviceUriDetail}?unit=${unit}&dateFrom=${sdate}&dateTo=${edate}`;
    return super.getXls(endpoint);
  }

}
