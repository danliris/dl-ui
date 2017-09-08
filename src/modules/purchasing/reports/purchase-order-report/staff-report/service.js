import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service'; 

const serviceUri = 'purchase-orders/reports/staffs';
const serviceUriDetail = 'purchase-orders/reports/subStaffs';

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


  getDetailUnit(sdate, edate,staff) {
    var endpoint = `${serviceUriDetail}?dateFrom=${sdate}&dateTo=${edate}&staff=${staff}`;
    return super.get(endpoint);
  }

  getDetailUnitnoDate(staff) {
    var endpoint = `${serviceUriDetail}?staff=${staff}`;
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

  generateExcel2(sdate, edate, divisiId) {
    var endpoint = `${serviceUriDetail}?divisiId=${divisiId}&dateFrom=${sdate}&dateTo=${edate}`;
    return super.getXls(endpoint);
  }

}