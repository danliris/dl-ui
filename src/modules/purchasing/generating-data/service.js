import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUriPurchaseRequest = 'generating-data/purchase-request';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing");
    }

    generatePurchaseRequest(dateFrom, dateTo) {
        var endpoint;
        if (dateFrom && dateTo) {
            endpoint = `${serviceUriPurchaseRequest}?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        } else {
            endpoint = `${serviceUriPurchaseRequest}`;
        }
        return super.getXls(endpoint);
    }

}
