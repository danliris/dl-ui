import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'garment-shipping/monitoring/garment-payment-disposition';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) { 
        //var endpoint = `${serviceUri}?paymenttype=${info.paymenttype}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        var endpoint = `${serviceUri}?paymentType=${info.paymentType}&unit=${info.unit}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.get(endpoint);
        
    }
    
    xls(info) {
        //var endpoint = `${serviceUri}/download?paymenttype=${info.paymenttype}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        var endpoint = `${serviceUri}/download?paymentType=${info.paymentType}&unit=${info.unit}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}