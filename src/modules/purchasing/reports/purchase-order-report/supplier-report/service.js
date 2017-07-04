import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service'; 

const serviceUri = 'purchase-orders/reports/suppliers';
const serviceUriDetail = 'purchase-orders/reports/suppliers-po-external';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing");
  }

  getDataSplnoDate() {
    var endpoint = `${serviceUri}`;
    return super.get(endpoint);
  }

  getDataSpl(sdate, edate) {
    var endpoint = `${serviceUri}?dateFrom=${sdate}&dateTo=${edate}`;
    return super.get(endpoint);
  }

   getDetailSpl(sdate, edate, supplierId) {
     var endpoint = `${serviceUriDetail}?supplierId=${supplierId}&dateFrom=${sdate}&dateTo=${edate}`;
     return super.get(endpoint);
   }

    // getDetailSplnoDate(supplierId) {
    //   var endpoint = `${serviceUriDetail}?supplierId=${supplierId}`;
    //   return super.get(endpoint);
    // }

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

  generateExcel2(sdate, edate, supplierId) {
    var endpoint = `${serviceUriDetail}?supplierId=${supplierId}&dateFrom=${sdate}&dateTo=${edate}`;
    return super.getXls(endpoint);
  }

}