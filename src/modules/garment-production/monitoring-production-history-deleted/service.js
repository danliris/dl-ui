
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'preparings/deleted';
// const unitDeliveryOrderUri = 'garment-unit-delivery-orders'
// const unitExpenditureNoteUri = 'garment-unit-expenditure-notes'
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {

      console.log(info);
      let endpoint = `${serviceUri}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&monType=${info.monType}`;
      return super.get(endpoint);
    }
    //--Abis ini terus di taruk ke back end jadi sesuaikan kebutuhan//
  
  
    generateExcel(info) {
      var endpoint = `${serviceUri}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&monType=${info.monType}`;
      // console.log(endpoint);
      return super.getXls(endpoint);
    }
  
    //------Unite2-----//
  
    //--Memanggil pertama kali data yang akan di tampilkan melalui list.js dan html tidak urut tidak papa//
    search2(info) {
      let endpoint = `${serviceUri2}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&monType=${info.monType}`;
      return super.get(endpoint);
    }
    //--Abis ini terus di taruk ke back end jadi sesuaikan kebutuhan//
  
  
    generateExcel2(info) {
      var endpoint = `${serviceUri2}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&monType=${info.monType}`;
      return super.getXls(endpoint);
    }
}
