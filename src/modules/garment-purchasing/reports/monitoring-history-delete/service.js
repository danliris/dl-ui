import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'unit-receipt-note-monitoring-all/Deleted';
const serviceUri2 = 'garment-unit-expenditure-notes/deleted';



export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }
  //--Memanggil pertama kali data yang akan di tampilkan melalui list.js dan html tidak urut tidak papa//
  search(info) {
    let endpoint = `${serviceUri}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&bonType=${info.bonType}`;
    return super.get(endpoint);
  }
  //--Abis ini terus di taruk ke back end jadi sesuaikan kebutuhan//


  generateExcel(info) {
    var endpoint = `${serviceUri}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&bonType=${info.bonType}`;
    return super.getXls(endpoint);
  }

  //------Unite2-----//

  //--Memanggil pertama kali data yang akan di tampilkan melalui list.js dan html tidak urut tidak papa//
  search2(info) {
    let endpoint = `${serviceUri2}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&bonType=${info.bonType}`;
    return super.get(endpoint);
  }
  //--Abis ini terus di taruk ke back end jadi sesuaikan kebutuhan//


  generateExcel2(info) {
    var endpoint = `${serviceUri2}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&bonType=${info.bonType}`;
    return super.getXls(endpoint);
  }

}
