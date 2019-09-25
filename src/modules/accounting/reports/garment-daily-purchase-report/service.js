import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service'; 

const serviceUri = 'daily-garment-purchase-order-report';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

search(info) { 
        var endpoint = `${serviceUri}?unitName=${info.unitName}&supplierType=${info.supplierType}&supplierName=${info.supplierName}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.get(endpoint);
        
    }
    
generateExcel(info) { 
        var endpoint = `${serviceUri}/download?unitName=${info.unitName}&supplierType=${info.supplierType}&supplierName=${info.supplierName}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}