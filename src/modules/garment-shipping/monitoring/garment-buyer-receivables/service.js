import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'garment-shipping/monitoring/garment-buyer-receivables';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

search(info) { 
       var endpoint = `${serviceUri}?buyerAgent=${info.buyerAgent}&invoiceNo=${info.invoiceNo}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
       return super.get(endpoint);
        
    }
    
generateExcel(info) {
       var endpoint = `${serviceUri}/download?buyerAgent=${info.buyerAgent}&invoiceNo=${info.invoiceNo}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
       return super.getXls(endpoint);
    }

}