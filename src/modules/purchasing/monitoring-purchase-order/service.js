import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../rest-service';
 
const serviceUri = require('../../../host').core + '/v1/purchasing/po/monitoring';

export class Service extends RestService {

    constructor(http, aggregator) {
        super(http, aggregator);
    }

    search(unitId, categoryId, PODLNo, PRNo, supplierId, dateFrom, dateTo) { 
        var endpoint = `${serviceUri}?unitId=${unitId}&categoryId=${categoryId}&PODLNo=${PODLNo}&PRNo=${PRNo}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.get(endpoint);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }  
    
}
