import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


const serviceUri = 'purchase-requests/monitoring';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing");
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
