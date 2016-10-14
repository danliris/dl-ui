import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../rest-service';
import {SecureService} from '../../../utils/secure-service';
 
const serviceUri = require('../../../host').core + '/v1/purchasing/receipt-note/unit/monitoring';

export class Service extends SecureService {

    constructor(http, aggregator) {
        super(http, aggregator);
    }

    search(no, unitId, supplierId, dateFrom, dateTo) {
        var endpoint = `${serviceUri}?no=${no}&unitId=${unitId}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.get(endpoint);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }  
    
}
