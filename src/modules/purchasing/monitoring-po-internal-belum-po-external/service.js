import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'purchase-orders-internal/monitoring-not-posted';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing");
    }

    search(unitId, categoryId, dateFrom, dateTo) {
        var endpoint = `${serviceUri}?unitId=${unitId}&categoryId=${categoryId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.get(endpoint);
    }

    generateExcel(unitId, categoryId, dateFrom, dateTo) {
        var endpoint = `${serviceUri}?unitId=${unitId}&categoryId=${categoryId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.getXls(endpoint);
    }

}
