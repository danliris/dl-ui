import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../rest-service';
import {SecureService} from '../../../utils/secure-service';

const serviceUri = require('../../../host').purchasing+ '/v1/purchase-requests/monitoring';

export class Service extends SecureService {

    constructor(http, aggregator) {
        super(http, aggregator);
    }

    search(unitId, categoryId, budgetId, PRNo, dateFrom, dateTo) { 
        var endpoint = `${serviceUri}?unitId=${unitId}&categoryId=${categoryId}&budgetId=${budgetId}&PRNo=${PRNo}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.get(endpoint);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }
    
    generateExcel(unitId, categoryId, budgetId, PRNo, dateFrom, dateTo) {
        var endpoint = `${serviceUri}?unitId=${unitId}&categoryId=${categoryId}&budgetId=${budgetId}&PRNo=${PRNo}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.getXls(endpoint);
    }
}
