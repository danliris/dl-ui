import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../rest-service';
 
const serviceUri = require('../../../host').core + '/v1/po/monitoringsuratjalan';

export class Service extends RestService {

    constructor(http, aggregator) {
        super(http, aggregator);
    }

    search(no, supplierId, dateFrom, dateTo) {
        var endpoint = `${serviceUri}?no=${no}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.get(endpoint);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }  
    
}
