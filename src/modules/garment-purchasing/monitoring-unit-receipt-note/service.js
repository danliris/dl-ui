import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


const serviceUri = 'unit-receipt-notes/monitoring';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
    }

search(no, unit,supplier, dateFrom, dateTo) { 
     
        var endpoint = `${serviceUri}?no=${no}&unit=${unit}&supplier=${supplier}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.get(endpoint);
    }

generateXls(no, unit,supplier, dateFrom, dateTo) { 
       console.log(supplier);
        var endpoint = `${serviceUri}?no=${no}&unit=${unit}&supplier=${supplier}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.getXls(endpoint);
    }
}
