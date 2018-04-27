import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


const serviceUri = 'purchase-orders/kedatangan';
const serviceUriDetail = 'purchase-orders/kedatangansub';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
    }

      search(dateFrom, dateTo , kategori) { 
        var endpoint = `${serviceUri}?dateFrom=${dateFrom}&dateTo=${dateTo}&kategori=${kategori}`;
        return super.get(endpoint);
    }
 

     getDetail(supplier,dateFrom,dateTo,kategori) {
   var endpoint = `${serviceUriDetail}?supplier=${supplier}&dateFrom=${dateFrom}&dateTo=${dateTo}&kategori=${kategori}`;
   return super.get(endpoint);
  }


    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }
    
    generateExcel( dateFrom, dateTo, kategori) {
        var endpoint = `${serviceUri}?dateFrom=${dateFrom}&dateTo=${dateTo}&kategori=${kategori}`;
        return super.getXls(endpoint);
    }

    generateExcel2( supplier,dateFrom, dateTo, kategori) {
        var endpoint = `${serviceUriDetail}?supplier=${supplier}&dateFrom=${dateFrom}&dateTo=${dateTo}&kategori=${kategori}`;
        return super.getXls(endpoint);
    }
}
