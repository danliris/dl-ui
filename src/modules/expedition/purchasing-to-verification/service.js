import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const uriPurchasingToVerification = 'expedition/purchasing-to-verification';
const uriPOE = 'purchase-orders-externals';

export class AzureService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }

    create(data) {
        let endpoint = `${uriPurchasingToVerification}`;
        return super.post(endpoint, data);
    }
}
