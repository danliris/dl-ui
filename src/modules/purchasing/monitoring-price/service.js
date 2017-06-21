import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'purchase-orders/price';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing");
    }

    search(dateFrom, dateTo, productName) {
        var endpoint = `${serviceUri}?dateFrom=${dateFrom}&dateTo=${dateTo}&productName=${productName}`;
        return super.get(endpoint);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    generateExcel(dateFrom, dateTo, productName) {
        var endpoint = `${serviceUri}?dateFrom=${dateFrom}&dateTo=${dateTo}&productName=${productName}`;
        return super.getXls(endpoint);
    }

}
